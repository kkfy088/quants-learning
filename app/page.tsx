"use client";

import { useState, useEffect, useCallback } from "react";
import { crashDays } from "@/content/crash-course";
import { deepDays } from "@/content/deep-track";
import { LevelBadge, GlossarySection, MindMapSection } from "@/components/LearningEnhancements";
import { power90Days } from "@/content/track-power90";
import { books } from "@/content/books";
import type { DayContent, TrackKind, ChatMessage, BookChapter, QuestionNote, QuestionStatus } from "@/lib/types";
import { loadProgress, saveProgress, getCompletedDays, toggleDayComplete, updateStreak, type EncryptedBlob, getEncryptedKey } from "@/lib/storage";
import { encryptApiKey, decryptApiKey, sendMessage } from "@/lib/deepseek";
import { resources, cheatsheets, quizzes } from "@/content/static";

export default function Home() {
  const [track, setTrack] = useState<TrackKind>("crash");
  const [dayIdx, setDayIdx] = useState(0);
  // Book track state
  const [bookIdx, setBookIdx] = useState(0);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [userCues, setUserCues] = useState<Record<string, string[]>>({});
  const [userSummaries, setUserSummaries] = useState<Record<string, string>>({});
  const [apiKey, setApiKey] = useState("");
  const [streak, setStreak] = useState(1);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showCheatsheets, setShowCheatsheets] = useState(false);
  const [csIdx, setCsIdx] = useState(0);
  const [encPassword, setEncPassword] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [lockErrors, setLockErrors] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  // ── 问题笔记本 state ──
  const [questionNotes, setQuestionNotes] = useState<QuestionNote[]>([]);
  const [showNotebook, setShowNotebook] = useState(false);
  const [notebookFilter, setNotebookFilter] = useState<"all" | QuestionStatus | string>("all");
  const [notebookSearch, setNotebookSearch] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const days = track === "crash" ? crashDays : track === "power90" ? power90Days : deepDays;
  const day = days[dayIdx];
  const dayKey = `${track}:${day?.id}`;
  const currentBook = track === "book" ? books[bookIdx] : null;
  const currentChapter: BookChapter | null = currentBook ? currentBook.chapters[chapterIdx] : null;
  const chapterKey = currentChapter ? `${currentBook!.id}:${currentChapter.id}` : "";

  // Load state
  useEffect(() => {
    const p = loadProgress();
    setCompleted(new Set(p.completedDays ?? []));
    setUserCues(p.userCues ?? {});
    setUserSummaries(p.userSummaries ?? {});
    setChatHistory(p.chatHistory ?? []);
    setQuestionNotes(p.questionNotes ?? []);
    setStreak(updateStreak());
  }, []);

  // Auto-unlock if encrypted key exists
  useEffect(() => {
    if (apiKey || !getEncryptedKey()) return;
    setShowSetup(true);
  }, [apiKey]);

  // Save periodically
  useEffect(() => {
    saveProgress({
      completedDays: Array.from(completed),
      userCues,
      userSummaries,
      chatHistory: chatHistory.slice(-50),
      questionNotes: questionNotes.slice(-500),
    });
  }, [completed, userCues, userSummaries, chatHistory, questionNotes]);

  const handleToggleComplete = useCallback(() => {
    const next = toggleDayComplete(dayKey);
    setCompleted(new Set(next));
  }, [dayKey]);

  // ── Crypto ──
  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) return;
    if (encPassword.length < 6) return;
    try {
      const blob = await encryptApiKey(apiKeyInput.trim(), encPassword);
      localStorage.setItem("ql_enc_key", JSON.stringify(blob));
      setApiKey(apiKeyInput.trim());
      setApiKeyInput("");
      setEncPassword("");
      setShowSetup(false);
    } catch {
      alert("加密失败，请重试");
    }
  };

  const handleUnlock = async () => {
    if (lockUntil > Date.now()) return;
    const blob = getEncryptedKey();
    if (!blob || !encPassword) return;
    try {
      const key = await decryptApiKey(blob, encPassword);
      setApiKey(key);
      setEncPassword("");
      setLockErrors(0);
      setShowSetup(false);
    } catch {
      const errs = lockErrors + 1;
      setLockErrors(errs);
      if (errs >= 5) setLockUntil(Date.now() + 15 * 60000);
      alert(`密码错误 (${errs}/5)${errs >= 5 ? "，已锁定15分钟" : ""}`);
    }
  };

  const handleLock = () => {
    setApiKey("");
  };

  // ── Chat ──
  const handleSendChat = async () => {
    if (!chatInput.trim() || !apiKey) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatLoading(true);
    const userMsg: ChatMessage = { role: "user", content: msg, timestamp: Date.now() };
    setChatHistory((h) => [...h, userMsg]);
    // 记录当前章节引用——用于问题归档
    const currentSourceRef =
      track === "book" && currentBook && currentChapter
        ? `book:${currentBook.id}:${currentChapter.id}`
        : `${track}:${day?.id ?? ""}`;
    const currentSourceTitle =
      track === "book" && currentBook && currentChapter
        ? `${currentBook.title} · 第${currentChapter.number}章 ${currentChapter.title}`
        : day ? `${track === "crash" ? "速成" : track === "deep" ? "修炼" : "电力"} Day ${day.day} · ${day.title}` : "未知章节";
    try {
      const reply = await sendMessage({
        apiKey,
        message: msg,
        context: track === "book" && currentBook && currentChapter
          ? `当前正在精读《${currentBook.title}》第${currentChapter.number}章「${currentChapter.title}」（p${currentChapter.pageStart}-${currentChapter.pageEnd}）。本章核心知识点：${currentChapter.keyPoints.slice(0, 3).join("；")}。请基于该教材内容回答学生的问题，并尽可能给出供应链场景的迁移建议。`
          : `当前课程：${day.title}。学习线索：${day.cues.slice(0, 3).join("；")}`,
        history: chatHistory,
      });
      const asst: ChatMessage = { role: "assistant", content: reply, timestamp: Date.now() };
      setChatHistory((h) => [...h, asst]);
      // ★ 自动归档到问题笔记本
      const noteId = `qn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newNote: QuestionNote = {
        id: noteId,
        question: msg,
        answer: reply,
        track,
        sourceRef: currentSourceRef,
        sourceTitle: currentSourceTitle,
        category: "general",  // 后续可基于关键词分类
        timestamp: Date.now(),
        status: "open",
        tags: [],
        reviewCount: 0,
      };
      setQuestionNotes((n) => [newNote, ...n]);
    } catch (e) {
      const err: ChatMessage = { role: "assistant", content: `❌ ${(e as Error).message}`, timestamp: Date.now() };
      setChatHistory((h) => [...h, err]);
    }
    setChatLoading(false);
  };

  const handleCueClick = (cue: string) => {
    setChatInput(cue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSendChat();
  };

  // ── Question Notebook operations ──
  const updateNoteStatus = (id: string, status: QuestionStatus) => {
    setQuestionNotes((notes) =>
      notes.map((n) => (n.id === id ? { ...n, status, lastReviewed: Date.now() } : n))
    );
  };
  const deleteNote = (id: string) => {
    setQuestionNotes((notes) => notes.filter((n) => n.id !== id));
  };
  const expandNote = (id: string) => {
    setExpandedNoteId((cur) => (cur === id ? null : id));
    // 翻看次数 +1
    setQuestionNotes((notes) =>
      notes.map((n) => (n.id === id ? { ...n, reviewCount: n.reviewCount + 1, lastReviewed: Date.now() } : n))
    );
  };
  const jumpToChapter = (note: QuestionNote) => {
    // 从笔记本跳回对应章节
    const [t, ...rest] = note.sourceRef.split(":");
    if (t === "book") {
      const [bookId, chId] = rest;
      const bi = books.findIndex((b) => b.id === bookId);
      if (bi >= 0) {
        setTrack("book");
        setBookIdx(bi);
        const ci = books[bi].chapters.findIndex((c) => c.id === chId);
        if (ci >= 0) setChapterIdx(ci);
      }
    } else {
      const newTrack = t as TrackKind;
      const dayId = rest[0];
      setTrack(newTrack);
      const list = newTrack === "crash" ? crashDays : newTrack === "power90" ? power90Days : deepDays;
      const di = list.findIndex((d) => d.id === dayId);
      if (di >= 0) setDayIdx(di);
    }
    setShowNotebook(false);
  };

  // 过滤后的问题列表
  const filteredNotes = questionNotes.filter((n) => {
    if (notebookFilter !== "all") {
      if (notebookFilter === "open" || notebookFilter === "reviewing" || notebookFilter === "resolved") {
        if (n.status !== notebookFilter) return false;
      } else if (n.track !== notebookFilter) return false;
    }
    if (notebookSearch.trim()) {
      const q = notebookSearch.toLowerCase();
      if (!n.question.toLowerCase().includes(q) && !n.answer.toLowerCase().includes(q) && !n.sourceTitle.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  // 按章节聚合（用于"按章节翻看"视图）
  const notesByChapter = new Map<string, QuestionNote[]>();
  filteredNotes.forEach((n) => {
    const key = n.sourceRef;
    if (!notesByChapter.has(key)) notesByChapter.set(key, []);
    notesByChapter.get(key)!.push(n);
  });

  // ── Sidebar weeks ──
  const weeks = new Map<number, DayContent[]>();
  days.forEach((d) => {
    if (!weeks.has(d.week)) weeks.set(d.week, []);
    weeks.get(d.week)!.push(d);
  });

  const hasKey = getEncryptedKey() !== null;
  const lockedOut = lockUntil > Date.now();

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="hl-icon">📊</span>
          <span className="hl-title">量化分析师成长之路</span>
          <span className="hl-sub">供应链预测实战</span>
          <span className="hl-sub">📅 Day {streak}</span>
        </div>
        <div className="track-tabs">
          <button className={`track-tab ${track === "crash" ? "active" : ""}`} onClick={() => { setTrack("crash"); setDayIdx(0); }}>
            ⚡5天速成
          </button>
          <button className={`track-tab ${track === "deep" ? "active" : ""}`} onClick={() => { setTrack("deep"); setDayIdx(0); }}>
            📅100天修炼
          </button>
          <button className={`track-tab ${track === "power90" ? "active" : ""}`} onClick={() => { setTrack("power90"); setDayIdx(0); }}>
            ⚡电力市场90天
          </button>
          <button className={`track-tab ${track === "book" ? "active" : ""}`} onClick={() => { setTrack("book"); setBookIdx(0); setChapterIdx(0); }}>
            📖教材精读
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span className="day-badge">{track === "crash" ? "速成" : track === "deep" ? "深入" : track === "power90" ? "电力" : "教材"} {track === "book" ? `Ch.${currentChapter?.number ?? 0}` : `Day ${day.day}`}</span>
          <div className="prog-wrap"><div className="prog-fill" style={{ width: track === "book" ? `${((chapterIdx + 1) / (currentBook?.chapters.length || 1)) * 100}%` : `${((dayIdx + 1) / days.length) * 100}%` }} /></div>
          <button className="btn" onClick={() => setShowResources(true)}>📚资源</button>
          <button className="btn" onClick={() => setShowCheatsheets(true)}>📋速查</button>
          <button className="btn" onClick={() => setShowNotebook(true)}>
            📓笔记本{questionNotes.length > 0 && <span style={{ marginLeft: 4, fontSize: 9, background: "var(--accent)", color: "#fff", borderRadius: 8, padding: "1px 5px" }}>{questionNotes.length}</span>}
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {track === "book" ? (
            <>
              {/* Book selector */}
              <div className="side-hdr">教材精读</div>
              <div style={{ padding: "6px 8px", borderBottom: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 4 }}>
                {books.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => { setBookIdx(i); setChapterIdx(0); }}
                    className={`book-pick ${i === bookIdx ? "active" : ""}`}
                  >
                    <span style={{ fontSize: 14 }}>{b.cover}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontWeight: 600, fontSize: 10 }}>{b.title}</div>
                      <div style={{ fontSize: 8, color: "var(--text2)" }}>{b.author}</div>
                    </span>
                    <span style={{ fontSize: 8, color: "var(--text2)" }}>{b.chapters.length}章</span>
                  </button>
                ))}
              </div>
              {/* Chapter list */}
              <div className="side-hdr" style={{ borderTop: "none" }}>
                {currentBook?.cover} {currentBook?.title?.slice(0, 12)}
              </div>
              {currentBook?.chapters.map((c, i) => {
                const ck = `${currentBook.id}:${c.id}`;
                const isDone = completed.has(ck);
                const isActive = i === chapterIdx;
                return (
                  <div
                    key={c.id}
                    className={`day-it ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                    onClick={() => setChapterIdx(i)}
                  >
                    <span className="day-n">{c.number}</span>
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.title}
                    </span>
                    <span className="day-ck">{isDone ? "✅" : ""}</span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="side-hdr">
                {track === "crash" ? "5天速成" : track === "deep" ? "100天修炼" : "电力市场90天"}
              </div>
              {Array.from(weeks.entries()).map(([wk, ds]) => (
                <div key={wk} className="wk-grp">
                  {track === "deep" && <div className="wk-lbl">W{wk}</div>}
                  {ds.map((d) => {
                    const dk = `${track}:${d.id}`;
                    const isDone = completed.has(dk);
                    const isActive = d.id === day.id;
                    return (
                      <div
                        key={d.id}
                        className={`day-it ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                        onClick={() => setDayIdx(d.day - 1)}
                      >
                        <span className="day-n">{d.day}</span>
                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {d.title}
                        </span>
                        <span className="day-ck">{isDone ? "✅" : ""}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </aside>

        {/* Content Area */}
        <div className="content-area">
          {track === "book" && currentBook && currentChapter ? (
            <BookChapterView
              book={currentBook}
              chapter={currentChapter}
              chapterKey={chapterKey}
              isCompleted={completed.has(chapterKey)}
              onToggle={() => {
                const next = toggleDayComplete(chapterKey);
                setCompleted(new Set(next));
              }}
              userSummary={userSummaries[chapterKey] ?? ""}
              onSummaryChange={(v) => setUserSummaries((s) => ({ ...s, [chapterKey]: v }))}
              onPrev={chapterIdx > 0 ? () => setChapterIdx(chapterIdx - 1) : undefined}
              onNext={chapterIdx < currentBook.chapters.length - 1 ? () => setChapterIdx(chapterIdx + 1) : undefined}
              onCueClick={handleCueClick}
              idx={chapterIdx}
              total={currentBook.chapters.length}
            />
          ) : (
            <>
              <div className="cornell">
                <div className="day-hdr">
                  <h2>{day.day}. {day.title}</h2>
                  {day.subtitle && (
                    <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2, lineHeight: 1.4 }}>
                      💡 {day.subtitle}
                    </div>
                  )}
                  <div className="meta" style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                    <LevelBadge level={day.level} />
                    <span>⏱ {day.duration} min</span>
                    <span>📅 W{day.week}</span>
                  </div>
                </div>

                <div className="cornell-main">
                  {/* Cue Column */}
                  <div className="cue-col">
                    <div className="cue-label">🔑 关键线索</div>
                    <div className="cue-list">
                      {day.cues.map((cue, i) => (
                        <div key={i} className="cue-item" onClick={() => handleCueClick(cue)}>{cue}</div>
                      ))}
                    </div>
                  </div>

                  {/* Notes Column */}
                  <div className="notes-col">
                    <div className="notes" dangerouslySetInnerHTML={{ __html: day.content }} />

                    {/* Glossary 术语词条 */}
                    {day.glossary && day.glossary.length > 0 && (
                      <GlossarySection terms={day.glossary} />
                    )}

                    {/* Mind Map 每日脑图 */}
                    {day.mindMap && (
                      <MindMapSection root={day.mindMap} />
                    )}

                    {/* Quiz */}
                    {quizzes.filter((q) => q.dayId === day.id).length > 0 && (
                      <div className="quiz-box" style={{ display: "block" }}>
                        <h4>🧠 自测</h4>
                        {quizzes.filter((q) => q.dayId === day.id).map((q) => (
                          <QuizWidget key={q.id} quiz={q} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="summary-area">
                  <div className="summary-label">📝 用自己的话总结</div>
                  <textarea
                    value={userSummaries[dayKey] ?? ""}
                    onChange={(e) => setUserSummaries((s) => ({ ...s, [dayKey]: e.target.value }))}
                    placeholder="今天学到的最重要的3个点..."
                  />
                </div>
              </div>

              <div className="bottom-bar">
                <div className="bottom-left">
                  <button className="btn" onClick={() => setDayIdx(Math.max(0, dayIdx - 1))} disabled={dayIdx === 0}>
                    ← 上一课
                  </button>
                  <span style={{ fontSize: 11, color: "var(--text2)" }}>
                    {dayIdx + 1} / {days.length}
                  </span>
                  <button className="btn" onClick={() => setDayIdx(Math.min(days.length - 1, dayIdx + 1))} disabled={dayIdx === days.length - 1}>
                    下一课 →
                  </button>
                </div>
                <div className="bottom-right">
                  <button className={`btn ${completed.has(dayKey) ? "btn-g" : "btn-a"}`} onClick={handleToggleComplete}>
                    {completed.has(dayKey) ? "✅ 已完成" : "✅ 完成今日"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* AI Panel */}
        <aside className="ai-panel">
          <div className="ai-hdr">
            <span className="ai-title">🤖 AI助手 <span className="ai-model">DeepSeek V4-Pro</span></span>
            <div style={{ display: "flex", gap: 3 }}>
              {apiKey && (
                <button className="btn btn-r btn-sm" onClick={handleLock}>🔒锁定</button>
              )}
              <button className="btn btn-sm" onClick={() => setShowSetup(true)}>⚙️</button>
            </div>
          </div>

          {showSetup && (
            <div className="ai-setup">
              <h4>配置 API Key</h4>
              <p style={{ fontSize: 10 }}>在 <a href="https://platform.deepseek.com/api_keys" target="_blank" style={{ color: "var(--accent)" }}>platform.deepseek.com</a> 创建</p>

              {hasKey && !apiKey ? (
                <>
                  <p style={{ fontSize: 10, color: "var(--warn)" }}>
                    {lockedOut ? "⛔ 密码错误5次，请15分钟后再试" : "🔒 Key 已加密存储，输入密码解锁"}
                  </p>
                  <input
                    type="password"
                    placeholder="解锁密码（≥6位）"
                    value={encPassword}
                    onChange={(e) => setEncPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    style={{ width: "100%", padding: "5px 8px", borderRadius: 4, border: "1px solid var(--border)", fontSize: 11, marginBottom: 4 }}
                    disabled={lockedOut}
                  />
                  <button className="btn btn-a" onClick={handleUnlock} disabled={lockedOut} style={{ width: "100%" }}>
                    🔓 解锁
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="password"
                    placeholder="sk-xxxxxxxx"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    style={{ width: "100%", padding: "5px 8px", borderRadius: 4, border: "1px solid var(--border)", fontSize: 11, marginBottom: 4 }}
                  />
                  <input
                    type="password"
                    placeholder="设置解锁密码（≥6位）"
                    value={encPassword}
                    onChange={(e) => setEncPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
                    style={{ width: "100%", padding: "5px 8px", borderRadius: 4, border: "1px solid var(--border)", fontSize: 11, marginBottom: 4 }}
                  />
                  <button className="btn btn-a" onClick={handleSaveKey} style={{ width: "100%" }}>
                    🔒 加密保存
                  </button>
                  <div style={{ fontSize: 9, color: "var(--text2)", marginTop: 4 }}>
                    Key 用 AES-256-GCM 加密，密码不存储。仅存浏览器本地。
                  </div>
                </>
              )}
              <button className="btn" onClick={() => setShowSetup(false)} style={{ width: "100%", marginTop: 4 }}>取消</button>
            </div>
          )}

          <div className="ai-msgs">
            {chatHistory.length === 0 && (
              <div className="ai-empty">
                <p>👋 我是你的量化学习助手</p>
                <p style={{ fontSize: 10, color: "var(--text2)" }}>点击左侧线索或直接提问</p>
                <p style={{ fontSize: 10, color: "var(--text2)" }}>当前模型：DeepSeek V4-Pro · Think Max</p>
              </div>
            )}
            {chatHistory.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                <div className="ai-msg-content" dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, "<br>") }} />
              </div>
            ))}
            {chatLoading && <div className="ai-typing">思考中...</div>}
          </div>
          <div className="ai-input-area">
            <div style={{ display: "flex", gap: 4 }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={apiKey ? "Cmd+Enter 发送" : "请先配置 API Key"}
                className="ai-input"
                disabled={!apiKey}
              />
              <button className="btn btn-a" onClick={handleSendChat} disabled={!apiKey || !chatInput.trim()}>
                发送
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Resources Modal */}
      {showResources && (
        <div className="modal-overlay" onClick={() => setShowResources(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <span>📚 资源宝库</span>
              <button className="btn btn-sm" onClick={() => setShowResources(false)}>✕</button>
            </div>
            <div className="modal-body">
              {(["dataset", "github", "video", "book", "tool", "community", "paper"] as const).map((cat) => {
                const items = resources.filter((r) => r.category === cat);
                const catLabels: Record<string, string> = {
                  dataset: "📦 数据集", github: "💻 GitHub仓库", video: "🎬 视频教程",
                  book: "📖 免费书籍", tool: "🛠 工具平台", community: "👥 学习社区", paper: "📄 必读论文",
                };
                return (
                  <div key={cat} style={{ marginBottom: 12 }}>
                    <h4 style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{catLabels[cat] || cat}</h4>
                    {items.map((r) => (
                      <div key={r.id} style={{ padding: "4px 0", fontSize: 11, borderBottom: "1px solid #f5f5f5" }}>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 500 }}>
                          {r.title}
                        </a>
                        <span style={{ color: "var(--text2)", marginLeft: 6 }}>{r.description}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Cheatsheet Modal */}
      {showCheatsheets && (
        <div className="modal-overlay" onClick={() => setShowCheatsheets(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <span>📋 速查表</span>
              <button className="btn btn-sm" onClick={() => setShowCheatsheets(false)}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 6, padding: "4px 12px", borderBottom: "1px solid var(--border)" }}>
              {cheatsheets.map((cs, i) => (
                <button key={cs.id} className={`btn btn-sm ${i === csIdx ? "btn-a" : ""}`} onClick={() => setCsIdx(i)}>
                  {cs.icon} {cs.title}
                </button>
              ))}
            </div>
            <div className="modal-body">
              {cheatsheets[csIdx]?.entries.map((e, i) => (
                <div key={i} style={{ marginBottom: 8, padding: "6px 8px", background: "#f8f9fb", borderRadius: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 11, marginBottom: 2 }}>{e.label}</div>
                  <pre style={{ background: "#1e293b", color: "#e2e8f0", padding: "4px 6px", borderRadius: 3, fontSize: 10, overflowX: "auto" }}>
                    <code>{e.code}</code>
                  </pre>
                  {e.note && <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 2 }}>{e.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Question Notebook Modal ── */}
      {showNotebook && (
        <div className="modal-overlay" onClick={() => setShowNotebook(false)}>
          <div className="modal nb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr" style={{ justifyContent: "space-between" }}>
              <span>📓 问题笔记本 <span style={{ fontSize: 10, color: "var(--text2)" }}>({questionNotes.length} 条 · 自动归档每次提问)</span></span>
              <button className="btn btn-sm" onClick={() => setShowNotebook(false)}>✕</button>
            </div>

            {/* 过滤栏 */}
            <div style={{ display: "flex", gap: 6, padding: "6px 12px", borderBottom: "1px solid var(--border)", flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                placeholder="🔍 搜索问题或回答..."
                value={notebookSearch}
                onChange={(e) => setNotebookSearch(e.target.value)}
                style={{ flex: 1, minWidth: 150, padding: "4px 8px", fontSize: 11, border: "1px solid var(--border)", borderRadius: 4 }}
              />
              <select
                value={notebookFilter}
                onChange={(e) => setNotebookFilter(e.target.value)}
                style={{ padding: "4px 8px", fontSize: 11, border: "1px solid var(--border)", borderRadius: 4 }}
              >
                <option value="all">全部 ({questionNotes.length})</option>
                <option value="open">🔴 待复习 ({questionNotes.filter(n => n.status === "open").length})</option>
                <option value="reviewing">🟡 复习中 ({questionNotes.filter(n => n.status === "reviewing").length})</option>
                <option value="resolved">🟢 已解决 ({questionNotes.filter(n => n.status === "resolved").length})</option>
                <option value="crash">⚡ 速成</option>
                <option value="deep">📅 修炼</option>
                <option value="power90">⚡ 电力</option>
                <option value="book">📖 教材</option>
              </select>
            </div>

            {/* 列表 */}
            <div className="modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
              {filteredNotes.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "var(--text2)" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📓</div>
                  <div style={{ fontSize: 12 }}>
                    {questionNotes.length === 0
                      ? "还没有任何问题笔记。在右侧 AI 助手提问，会自动归档到这里。"
                      : "没有符合筛选条件的问题"}
                  </div>
                </div>
              ) : (
                // 按章节聚合显示
                Array.from(notesByChapter.entries()).map(([srcRef, notes]) => (
                  <div key={srcRef} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", marginBottom: 4, padding: "2px 6px", background: "var(--accent-lt)", borderRadius: 3 }}>
                      📂 {notes[0].sourceTitle} <span style={{ color: "var(--text2)", fontWeight: 400 }}>({notes.length})</span>
                    </div>
                    {notes.map((n) => (
                      <div key={n.id} style={{ border: "1px solid var(--border)", borderRadius: 4, marginBottom: 4, overflow: "hidden" }}>
                        {/* 问题头部（点击展开） */}
                        <div
                          onClick={() => expandNote(n.id)}
                          style={{ padding: "6px 10px", cursor: "pointer", background: expandedNoteId === n.id ? "#f0f9ff" : "#fff", display: "flex", gap: 8, alignItems: "center" }}
                        >
                          <span style={{ fontSize: 10 }}>
                            {n.status === "open" ? "🔴" : n.status === "reviewing" ? "🟡" : "🟢"}
                          </span>
                          <span style={{ flex: 1, fontSize: 11, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {n.question}
                          </span>
                          <span style={{ fontSize: 9, color: "var(--text2)" }}>
                            {new Date(n.timestamp).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}
                            {n.reviewCount > 0 && ` · 👁${n.reviewCount}`}
                          </span>
                          <span style={{ fontSize: 10 }}>{expandedNoteId === n.id ? "▲" : "▼"}</span>
                        </div>
                        {/* 展开后的详情 */}
                        {expandedNoteId === n.id && (
                          <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border)", background: "#fafbfc" }}>
                            <div style={{ fontSize: 10, color: "var(--text2)", marginBottom: 4 }}>💬 AI 回答：</div>
                            <div style={{ fontSize: 11, lineHeight: 1.6, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>
                              {n.answer}
                            </div>
                            <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                              <button className="btn btn-sm" onClick={() => jumpToChapter(n)}>📚 跳到原章节</button>
                              {n.status !== "reviewing" && (
                                <button className="btn btn-sm" onClick={() => updateNoteStatus(n.id, "reviewing")}>🟡 标记复习中</button>
                              )}
                              {n.status !== "resolved" && (
                                <button className="btn btn-sm btn-g" onClick={() => updateNoteStatus(n.id, "resolved")}>🟢 标记已解决</button>
                              )}
                              {n.status !== "open" && (
                                <button className="btn btn-sm" onClick={() => updateNoteStatus(n.id, "open")}>🔴 重置为待复习</button>
                              )}
                              <button className="btn btn-sm btn-r" onClick={() => { if (confirm("删除这条笔记？")) deleteNote(n.id); }}>🗑 删除</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* 底部统计 */}
            {questionNotes.length > 0 && (
              <div style={{ borderTop: "1px solid var(--border)", padding: "6px 12px", fontSize: 10, color: "var(--text2)", display: "flex", justifyContent: "space-between" }}>
                <span>📚 覆盖 {notesByChapter.size} 个章节 · 累计翻看 {questionNotes.reduce((s, n) => s + n.reviewCount, 0)} 次</span>
                <span>高频提问是知识盲点，建议反复翻看 🔴 状态的问题</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .header-left { display: flex; align-items: center; gap: 6px; }
        .hl-icon { font-size: 16px; }
        .hl-title { font-size: 12px; font-weight: 700; }
        .hl-sub { font-size: 10px; color: var(--text2); }
        .day-badge { background: var(--accent-lt); color: var(--accent); font-size: 9px; font-weight: 600; padding: 2px 7px; border-radius: 8px; }
        .prog-wrap { width: 80px; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .prog-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width .4s; }
        .btn { padding: 4px 8px; border: 1px solid var(--border); border-radius: 5px; background: var(--card-bg); color: var(--text); cursor: pointer; font-size: 10px; font-family: var(--sans); transition: all .15s; white-space: nowrap; }
        .btn:hover { background: #f3f4f6; }
        .btn:disabled { opacity: 0.4; cursor: default; }
        .btn-a { background: var(--accent); color: #fff; border-color: var(--accent); }
        .btn-a:hover { background: #1d4ed8; }
        .btn-r { background: #fef2f2; color: var(--danger); border-color: #fecaca; }
        .btn-r:hover { background: #fee2e2; }
        .btn-g { background: #f0fdf4; color: var(--success); border-color: #bbf7d0; }
        .btn-g:hover { background: #dcfce7; }
        .btn-sm { font-size: 8px; padding: 2px 5px; }
        .track-tabs { display: flex; gap: 3px; }
        .track-tab { padding: 4px 10px; border-radius: 5px; font-size: 10px; font-weight: 600; cursor: pointer; border: 1px solid transparent; background: transparent; color: var(--text2); font-family: var(--sans); }
        .track-tab.active { background: var(--accent); color: #fff; }
        .track-tab:hover:not(.active) { background: #f3f4f6; }

        .sidebar { width: 185px; flex-shrink: 0; background: var(--card-bg); border-right: 1px solid var(--border); overflow-y: auto; display: flex; flex-direction: column; }
        .side-hdr { padding: 8px 12px; font-size: 10px; font-weight: 700; color: var(--text2); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .wk-grp { margin: 2px 0; }
        .wk-lbl { padding: 4px 12px; font-size: 9px; font-weight: 700; color: var(--purple); background: #faf5ff; border-bottom: 1px solid #ede9fe; }
        .day-it { padding: 6px 12px; font-size: 11px; cursor: pointer; border-bottom: 1px solid #f5f5f5; display: flex; align-items: center; gap: 5px; transition: all .12s; color: var(--text2); }
        .day-it:hover { background: #f8f9fb; color: var(--text); }
        .day-it.active { background: var(--accent-lt); color: var(--accent); font-weight: 600; border-right: 3px solid var(--accent); }
        .day-it .day-n { width: 18px; height: 18px; background: var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; }
        .day-it.active .day-n { background: var(--accent); color: #fff; }
        .day-it .day-ck { font-size: 12px; opacity: .4; margin-left: auto; }
        .day-it.done .day-ck { opacity: 1; color: var(--success); }

        .content-area { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .cornell { padding: 14px 18px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .day-hdr { padding-bottom: 6px; border-bottom: 2px solid var(--border); }
        .day-hdr h2 { font-size: 16px; font-weight: 700; }
        .day-hdr .meta { font-size: 10px; color: var(--text2); margin-top: 2px; display: flex; gap: 8px; flex-wrap: wrap; }
        .cornell-main { display: flex; gap: 14px; flex: 1; min-height: 0; }
        .cue-col { width: 180px; flex-shrink: 0; display: flex; flex-direction: column; gap: 5px; }
        .cue-label { font-size: 9px; font-weight: 700; color: var(--text2); text-transform: uppercase; }
        .cue-list { background: var(--cue-bg); border: 1px solid #d4dbf0; border-radius: var(--radius); padding: 8px; flex: 1; overflow-y: auto; font-size: 10px; line-height: 1.9; }
        .cue-item { padding: 1px 0; color: var(--text2); cursor: pointer; }
        .cue-item:hover { color: var(--accent); }
        .cue-item::before { content: "▸ "; color: var(--accent); font-size: 8px; }
        .notes-col { flex: 1; overflow-y: auto; padding-right: 4px; }

        .summary-area { border-top: 2px solid var(--border); padding-top: 6px; }
        .summary-label { font-size: 9px; font-weight: 700; color: var(--text2); text-transform: uppercase; margin-bottom: 3px; }
        .summary-area textarea { width: 100%; border: 1px dashed var(--border); border-radius: var(--radius); padding: 6px 10px; font-size: 11px; font-family: var(--sans); resize: vertical; min-height: 36px; background: var(--summary-bg); }
        .summary-area textarea:focus { outline: none; border-color: var(--warn); border-style: solid; }

        .bottom-bar { padding: 6px 14px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--card-bg); gap: 8px; }
        .bottom-left { display: flex; align-items: center; gap: 8px; }
        .bottom-right { display: flex; gap: 6px; }

        .ai-panel { width: 300px; flex-shrink: 0; background: var(--card-bg); border-left: 1px solid var(--border); display: flex; flex-direction: column; }
        .ai-hdr { padding: 8px 10px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .ai-title { font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .ai-model { font-size: 8px; color: var(--accent); background: var(--accent-lt); padding: 1px 4px; border-radius: 3px; }
        .ai-setup { padding: 10px; border-bottom: 1px solid var(--border); font-size: 11px; }
        .ai-setup h4 { font-size: 12px; margin-bottom: 4px; }
        .ai-msgs { flex: 1; overflow-y: auto; padding: 8px; }
        .ai-empty { text-align: center; padding: 20px; color: var(--text2); font-size: 11px; }
        .ai-msg { margin-bottom: 8px; }
        .ai-msg.user .ai-msg-content { background: var(--accent-lt); color: var(--accent); padding: 5px 8px; border-radius: var(--radius) var(--radius) 0 var(--radius); font-size: 11px; }
        .ai-msg.assistant .ai-msg-content { background: #f8f9fb; padding: 5px 8px; border-radius: 0 var(--radius) var(--radius) var(--radius); font-size: 11px; }
        .ai-typing { color: var(--text2); font-size: 10px; padding: 4px 8px; }
        .ai-input-area { padding: 8px; border-top: 1px solid var(--border); }
        .ai-input { flex: 1; padding: 5px 8px; border: 1px solid var(--border); border-radius: 4px; font-size: 11px; font-family: var(--sans); }
        .ai-input:focus { outline: none; border-color: var(--accent); }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .modal-content { background: var(--card-bg); border-radius: 10px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
        .modal { background: var(--card-bg); border-radius: 10px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.12); display: flex; flex-direction: column; }
        .nb-modal { max-width: 720px; max-height: 85vh; }
        .modal-hdr { padding: 10px 14px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 13px; }
        .modal-body { padding: 12px 14px; }

        .quiz-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: var(--radius); padding: 12px 16px; margin: 12px 0; }
        .quiz-box h4 { color: var(--accent); margin: 0 0 6px; }

        /* ── Book track styles ── */
        .book-pick { display: flex; align-items: center; gap: 6px; padding: 6px 8px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg); cursor: pointer; font-family: var(--sans); transition: all .15s; }
        .book-pick:hover { background: #f8f9fb; }
        .book-pick.active { border-color: var(--accent); background: var(--accent-lt); }
        .bk-hero { padding: 14px 18px 10px; border-bottom: 2px solid var(--border); background: linear-gradient(180deg, #fafbff 0%, var(--card-bg) 100%); }
        .bk-hero h2 { font-size: 16px; font-weight: 700; }
        .bk-hero .bk-sub { font-size: 11px; color: var(--text2); margin-top: 2px; }
        .bk-hero .bk-meta { font-size: 10px; color: var(--text2); margin-top: 4px; display: flex; gap: 10px; flex-wrap: wrap; }
        .bk-quote { background: #fefce8; border-left: 3px solid var(--warn); padding: 8px 12px; margin: 10px 0; font-size: 11px; line-height: 1.7; color: var(--text); font-style: italic; border-radius: 0 var(--radius) var(--radius) 0; }
        .bk-section { margin: 12px 0; }
        .bk-section h4 { font-size: 12px; font-weight: 700; color: var(--purple); margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
        .bk-kp { display: flex; gap: 6px; padding: 4px 0; font-size: 11px; line-height: 1.6; border-bottom: 1px dashed #f0f0f0; }
        .bk-kp-num { width: 18px; height: 18px; background: var(--accent-lt); color: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; }
        .bk-scm { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius); padding: 8px 12px; margin: 10px 0; font-size: 11px; line-height: 1.7; }
        .bk-scm h4 { color: var(--success); }
        .bk-practice { background: #fef3f2; border: 1px solid #fecaca; border-radius: var(--radius); padding: 8px 12px; margin: 10px 0; font-size: 11px; line-height: 1.7; }
        .bk-practice h4 { color: var(--danger); }
      `}</style>
    </>
  );
}

function BookChapterView({
  book, chapter, chapterKey, isCompleted, onToggle,
  userSummary, onSummaryChange, onPrev, onNext, onCueClick, idx, total,
}: {
  book: import("@/lib/types").Book;
  chapter: BookChapter;
  chapterKey: string;
  isCompleted: boolean;
  onToggle: () => void;
  userSummary: string;
  onSummaryChange: (v: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  onCueClick: (cue: string) => void;
  idx: number;
  total: number;
}) {
  return (
    <>
      <div className="cornell" style={{ overflowY: "auto" }}>
        {/* Hero: book + chapter info */}
        <div className="bk-hero">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>{book.cover}</span>
            <div>
              <div style={{ fontSize: 10, color: "var(--text2)" }}>{book.title} · {book.author}</div>
              <h2>{chapter.title}</h2>
            </div>
          </div>
          <div className="bk-sub">{chapter.summary}</div>
          <div className="bk-meta">
            <span>📖 p{chapter.pageStart}-{chapter.pageEnd}</span>
            <span>⏱ {chapter.duration} min</span>
            <span>📊 第 {idx + 1} / {total} 章</span>
          </div>
        </div>

        <div className="cornell-main">
          {/* Cue column = key points as cues */}
          <div className="cue-col">
            <div className="cue-label">🔑 本章要点</div>
            <div className="cue-list">
              {chapter.keyPoints.map((kp, i) => (
                <div key={i} className="cue-item" onClick={() => onCueClick(kp)}>{kp}</div>
              ))}
            </div>
          </div>

          {/* Notes column */}
          <div className="notes-col">
            {/* Key points expanded */}
            <div className="bk-section">
              <h4>📌 核心知识点</h4>
              {chapter.keyPoints.map((kp, i) => (
                <div key={i} className="bk-kp">
                  <span className="bk-kp-num">{i + 1}</span>
                  <span>{kp}</span>
                </div>
              ))}
            </div>

            {/* Excerpt */}
            {chapter.excerpt && (
              <div className="bk-section">
                <h4>💬 原文金句</h4>
                <div className="bk-quote">"{chapter.excerpt}"</div>
                <div style={{ fontSize: 9, color: "var(--text2)", textAlign: "right" }}>
                  —— 《{book.title}》p{chapter.pageStart}+
                </div>
              </div>
            )}

            {/* SCM insight */}
            {chapter.scmInsight && (
              <div className="bk-scm">
                <h4>🏭 供应链迁移思考</h4>
                <div>{chapter.scmInsight}</div>
              </div>
            )}

            {/* Practice */}
            {chapter.practice && (
              <div className="bk-practice">
                <h4>✏️ 配套练习</h4>
                <div>{chapter.practice}</div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="summary-area">
          <div className="summary-label">📝 读完本章，用自己的话总结</div>
          <textarea
            value={userSummary}
            onChange={(e) => onSummaryChange(e.target.value)}
            placeholder="本章最重要的 3 个概念，以及它们如何应用到我的工作..."
          />
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-left">
          <button className="btn" onClick={onPrev} disabled={!onPrev}>
            ← 上一章
          </button>
          <span style={{ fontSize: 11, color: "var(--text2)" }}>
            第 {idx + 1} / {total} 章
          </span>
          <button className="btn" onClick={onNext} disabled={!onNext}>
            下一章 →
          </button>
        </div>
        <div className="bottom-right">
          <button className={`btn ${isCompleted ? "btn-g" : "btn-a"}`} onClick={onToggle}>
            {isCompleted ? "✅ 已读" : "✅ 标记已读"}
          </button>
        </div>
      </div>
    </>
  );
}

function QuizWidget({ quiz }: { quiz: { id: string; question: string; options: string[]; answer: number; explanation: string } }) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ marginBottom: 10 }}>
      <div className="quiz-q">{quiz.question}</div>
      <div>
        {quiz.options.map((opt, i) => (
          <span
            key={i}
            className={`quiz-opt ${selected === i ? (i === quiz.answer ? "correct" : "wrong") : ""}`}
            onClick={() => setSelected(i)}
          >
            {opt}
          </span>
        ))}
      </div>
      {selected !== null && (
        <div className="quiz-fb" style={{ display: "block", fontSize: 10, marginTop: 4 }}>
          {selected === quiz.answer ? "✅ 正确！" : "❌ 不对哦。"} {quiz.explanation}
        </div>
      )}
    </div>
  );
}
