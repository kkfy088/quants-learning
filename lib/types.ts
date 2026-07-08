// ───────────────────────────────────────────────
// quants-learning — TypeScript Types
// All domain types for the learning platform
// ───────────────────────────────────────────────

// ── Content Types ──────────────────────────────

export type TrackKind = "crash" | "deep" | "book" | "power90";

export interface DayContent {
  id: string;
  day: number;
  week: number;
  title: string;
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

// ── User Progress Types ────────────────────────

export interface UserProgress {
  completedDays: string[];
  userCues: Record<string, string[]>;   // dayId → user notes
  userSummaries: Record<string, string>; // dayId → summary
  streak: number;
  lastVisit: string;
  chatHistory: ChatMessage[];
}
