"use client";

import { useState } from "react";
import type { KnowledgeLevel, GlossaryTerm, MindMapNode } from "@/lib/types";

// ── 权重徽章 ───────────────────────────────────
const LEVEL_META: Record<KnowledgeLevel, { label: string; color: string; bg: string; tip: string }> = {
  L1: { label: "L1 通识", color: "#6b7280", bg: "#f3f4f6", tip: "听过+知道存在（5分钟速读）" },
  L2: { label: "L2 理解", color: "#2563eb", bg: "#dbeafe", tip: "懂原理+会读代码（30分钟）" },
  L3: { label: "L3 深刻", color: "#d97706", bg: "#fef3c7", tip: "会调参+会诊断（1天实操）" },
  L4: { label: "L4 灵活", color: "#dc2626", bg: "#fee2e2", tip: "能创新+能教学（多天项目）" },
};

export function LevelBadge({ level }: { level?: KnowledgeLevel }) {
  if (!level) return null;
  const meta = LEVEL_META[level];
  return (
    <span
      title={meta.tip}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 10,
        fontWeight: 700,
        color: meta.color,
        background: meta.bg,
        border: `1px solid ${meta.color}33`,
        cursor: "help",
        letterSpacing: 0.3,
      }}
    >
      {meta.label}
    </span>
  );
}

// ── 术语卡片 ───────────────────────────────────
export function GlossarySection({ terms }: { terms: GlossaryTerm[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  if (!terms || terms.length === 0) return null;

  return (
    <div className="glossary-section" style={{ marginTop: 18 }}>
      <h4 style={{ fontSize: 13, marginBottom: 8, color: "var(--text1)", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 16 }}>📚</span>
        <span>术语词条（{terms.length}）</span>
        <span style={{ fontSize: 10, color: "var(--text2)", fontWeight: 400 }}>点击展开详情</span>
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {terms.map((t, i) => {
          const isOpen = expanded === t.term;
          return (
            <div
              key={i}
              onClick={() => setExpanded(isOpen ? null : t.term)}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "6px 8px",
                cursor: "pointer",
                background: isOpen ? "var(--bg2, #fafbfc)" : "var(--bg1, #ffffff)",
                transition: "all 0.15s",
                fontSize: 11,
              }}
            >
              <div style={{ fontWeight: 600, color: "var(--text1)", marginBottom: 2 }}>{t.term}</div>
              <div style={{ color: "var(--text2)", fontSize: 10, lineHeight: 1.4 }}>{t.definition}</div>
              {isOpen && (
                <div style={{ marginTop: 6, fontSize: 10, color: "var(--text2)", borderTop: "1px dashed var(--border)", paddingTop: 6 }}>
                  {t.analogy && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ color: "#16a34a", fontWeight: 600 }}>💡 类比：</span>
                      {t.analogy}
                    </div>
                  )}
                  {t.code && (
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ color: "#2563eb", fontWeight: 600 }}>🐍 代码：</span>
                      <code style={{ background: "#f3f4f6", padding: "1px 4px", borderRadius: 3, fontSize: 10 }}>{t.code}</code>
                    </div>
                  )}
                  {t.pitfall && (
                    <div>
                      <span style={{ color: "#dc2626", fontWeight: 600 }}>⚠️ 踩坑：</span>
                      {t.pitfall}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 脑图渲染（递归 SVG 树） ────────────────────
export function MindMapSection({ root }: { root: MindMapNode }) {
  return (
    <div className="mindmap-section" style={{ marginTop: 18, padding: 12, border: "1px solid var(--border)", borderRadius: 8, background: "var(--bg1, #ffffff)" }}>
      <h4 style={{ fontSize: 13, marginBottom: 8, color: "var(--text1)", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 16 }}>🧠</span>
        <span>每日脑图 — 5 分钟回顾今天</span>
      </h4>
      <MindMapTree node={root} depth={0} />
    </div>
  );
}

function MindMapTree({ node, depth }: { node: MindMapNode; depth: number }) {
  const isRoot = depth === 0;
  const colors = ["#1e293b", "#2563eb", "#16a34a", "#d97706", "#7c3aed"];
  const color = colors[Math.min(depth, colors.length - 1)];

  return (
    <div style={{ marginBottom: depth === 0 ? 0 : 4 }}>
      <div
        style={{
          fontWeight: isRoot ? 700 : 500,
          fontSize: isRoot ? 13 : Math.max(11 - depth, 9),
          color,
          padding: "3px 0",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {!isRoot && (
          <span style={{ color: "#cbd5e1", fontSize: 10 }}>
            {depth === 1 ? "├─" : "│  └─"}
          </span>
        )}
        <span>{isRoot && <span style={{ marginRight: 4 }}>🎯</span>}{node.label}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div style={{ marginLeft: isRoot ? 0 : 12, borderLeft: isRoot ? "none" : "1px dashed var(--border)", paddingLeft: isRoot ? 0 : 8 }}>
          {node.children.map((child, i) => (
            <MindMapTree key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── 周脑图（合成 5 天知识） ────────────────────
export function WeekReviewSection({ days, weekNum }: { days: { title: string; mindMap?: MindMapNode }[]; weekNum: number }) {
  const withMaps = days.filter((d) => d.mindMap);
  if (withMaps.length === 0) return null;

  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid var(--border)", borderRadius: 8, background: "var(--bg2, #fafbfc)" }}>
      <h4 style={{ fontSize: 13, marginBottom: 8, color: "var(--text1)" }}>
        🗓️ Week {weekNum} 周脑图合成 — 把 {withMaps.length} 天的知识连起来
      </h4>
      {withMaps.map((d, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", marginBottom: 2 }}>{d.title}</div>
          {d.mindMap && <MindMapTree node={d.mindMap} depth={0} />}
        </div>
      ))}
    </div>
  );
}
