// ───────────────────────────────────────────────
// quants-learning — TypeScript Types
// All domain types for the learning platform
// ───────────────────────────────────────────────

// ── Content Types ──────────────────────────────

export type TrackKind = "crash" | "deep" | "book" | "power90";

export interface DayResource {
  label: string;
  url: string;
}

/** 知识权重等级（决定篇幅 + UI 徽章） */
export type KnowledgeLevel = "L1" | "L2" | "L3" | "L4";

/** 术语词条卡片 */
export interface GlossaryTerm {
  term: string;        // 术语名（中英对照）
  definition: string;  // 一句话定义
  analogy: string;     // 一句话类比
  code?: string;       // 代码示例（可选）
  pitfall?: string;    // 踩坑点（可选）
}

/** 脑图节点 */
export interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

export interface DayContent {
  id: string;
  day: number;
  week: number;
  title: string;          // 主标题（术语+结论）
  subtitle?: string;      // 副标题（解决的业务问题，问题驱动）
  description: string;
  track: TrackKind;
  /** HTML body content */
  content: string;
  /** Cornell note cues (left sidebar prompts) */
  cues: string[];
  /** Learning objectives */
  objectives: string[];
  /** Estimated time in minutes */
  duration: number;
  /** External resources (optional) */
  resources?: DayResource[];
  /** 知识权重等级（L1 通识 / L2 理解 / L3 深刻 / L4 灵活） */
  level?: KnowledgeLevel;
  /** 术语词条卡片（每日 4-6 个，累积成全局词汇表） */
  glossary?: GlossaryTerm[];
  /** 每日脑图（SVG 字符串或 MindMapNode 树） */
  mindMap?: MindMapNode;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  days: string[]; // day IDs
}

export interface Track {
  kind: TrackKind;
  label: string;
  subtitle: string;
  modules: Module[];
}

// ── Book / Textbook Types ──────────────────────

export interface BookChapter {
  id: string;
  bookId: string;
  number: number;          // chapter number, 0 = 前言/总览
  title: string;
  pageStart: number;
  pageEnd: number;
  duration: number;        // minutes
  summary: string;         // 一句话主旨
  keyPoints: string[];     // 核心知识点
  excerpt?: string;        // 原文金句/摘要
  scmInsight?: string;     // 供应链场景迁移思考
  practice?: string;       // 配套练习/思考题
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  totalPages: number;
  cover: string;           // emoji or short label
  abstract: string;        // 一段话介绍本书
  whyForScm: string;       // 为什么供应链分析师要读这本
  chapters: BookChapter[];
}

// ── Quiz Types ─────────────────────────────────

export interface QuizQuestion {
  id: string;
  dayId: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
}

// ── Resource Types ─────────────────────────────

export type ResourceCategory =
  | "dataset"
  | "github"
  | "video"
  | "book"
  | "tool"
  | "community"
  | "paper";

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ResourceCategory;
  lang: "en" | "zh" | "both";
}

// ── Cheatsheet Types ───────────────────────────

export interface CheatsheetEntry {
  label: string;
  code: string;
  note?: string;
}

export interface Cheatsheet {
  id: string;
  title: string;
  icon: string;
  entries: CheatsheetEntry[];
}

// ── Chat Types ─────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

// ── Question Notebook Types ────────────────────
// 每次 AI 提问自动归档到对应章节，形成可翻看的问题笔记本

export type QuestionStatus = "open" | "reviewing" | "resolved";

export interface QuestionNote {
  id: string;              // 唯一 ID（时间戳+随机）
  question: string;        // 用户提问
  answer: string;          // AI 回答
  track: TrackKind;        // 来自哪个轨
  sourceRef: string;       // 对应章节引用（如 "crash:crash-1" / "book:bk-measure:ch3"）
  sourceTitle: string;     // 章节标题（便于在笔记本中显示）
  category: string;        // 知识点分类（如 "ml_models/tree_models"）
  timestamp: number;       // 提问时间
  status: QuestionStatus;  // 状态：待复习 / 复习中 / 已解决
  tags: string[];          // 用户自定义标签（可选）
  reviewCount: number;     // 被翻看次数（用于"高频问题"识别）
  lastReviewed?: number;   // 最后一次翻看时间
}

// ── User Progress Types ────────────────────────

export interface UserProgress {
  completedDays: string[];
  userCues: Record<string, string[]>;   // dayId → user notes
  userSummaries: Record<string, string>; // dayId → summary
  streak: number;
  lastVisit: string;
  chatHistory: ChatMessage[];
  questionNotes: QuestionNote[];        // 问题笔记本
}
