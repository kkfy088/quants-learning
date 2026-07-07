// ───────────────────────────────────────────────
// quants-learning — TypeScript Types
// All domain types for the learning platform
// ───────────────────────────────────────────────

// ── Content Types ──────────────────────────────

export type TrackKind = "crash" | "deep";

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
