// ───────────────────────────────────────────────
// LocalStorage wrapper with encryption support
// ───────────────────────────────────────────────

import type { UserProgress } from "./types";

const STORAGE_KEY = "ql2_progress";
const ENC_KEY_STORAGE = "ql_enc_key";

// ── Progress ───────────────────────────────────

export function loadProgress(): Partial<UserProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(data: Partial<UserProgress>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full — silently fail
  }
}

export function getCompletedDays(): string[] {
  const p = loadProgress();
  return p.completedDays ?? [];
}

export function toggleDayComplete(dayId: string): string[] {
  const p = loadProgress();
  const set = new Set(p.completedDays ?? []);
  if (set.has(dayId)) {
    set.delete(dayId);
  } else {
    set.add(dayId);
  }
  const arr = Array.from(set);
  saveProgress({ ...p, completedDays: arr });
  return arr;
}

// ── Encrypted API Key ─────────────────────────

export interface EncryptedBlob {
  salt: string;
  iv: string;
  ciphertext: string;
}

export function getEncryptedKey(): EncryptedBlob | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ENC_KEY_STORAGE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EncryptedBlob;
  } catch {
    return null;
  }
}

export function hasEncryptedKey(): boolean {
  return getEncryptedKey() !== null;
}

// ── Streak ─────────────────────────────────────

export function updateStreak(): number {
  if (typeof window === "undefined") return 0;
  const p = loadProgress();
  const today = new Date().toISOString().split("T")[0];
  const last = p.lastVisit ?? "";

  let streak = p.streak ?? 0;
  if (last === today) return streak;

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (last === yesterday) {
    streak += 1;
  } else if (!last) {
    streak = 1;
  } else {
    streak = 1;
  }

  saveProgress({ ...p, streak, lastVisit: today });
  return streak;
}
