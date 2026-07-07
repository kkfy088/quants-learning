// ───────────────────────────────────────────────
// DeepSeek API client (browser-side)
// Uses Web Crypto encrypted key storage
// ───────────────────────────────────────────────

import type { ChatMessage } from "./types";
import { getEncryptedKey, type EncryptedBlob } from "./storage";

const API_URL = "https://api.deepseek.com/chat/completions";

// ── Encryption ─────────────────────────────────

async function deriveKey(password: string, salt: BufferSource): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 200_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToB64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export async function encryptApiKey(apiKey: string, password: string): Promise<EncryptedBlob> {
  const enc = new TextEncoder();
  const rawSalt = new Uint8Array(16);
  const rawIv = new Uint8Array(12);
  crypto.getRandomValues(rawSalt);
  crypto.getRandomValues(rawIv);
  const salt = rawSalt.buffer as ArrayBuffer;
  const iv = rawIv.buffer as ArrayBuffer;
  const key = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(apiKey)
  );
  return {
    salt: bytesToB64(rawSalt),
    iv: bytesToB64(rawIv),
    ciphertext: bytesToB64(new Uint8Array(ciphertext)),
  };
}

export async function decryptApiKey(blob: EncryptedBlob, password: string): Promise<string> {
  const saltBytes = b64ToBytes(blob.salt);
  const ivBytes = b64ToBytes(blob.iv);
  const cipherBytes = b64ToBytes(blob.ciphertext);
  const salt = saltBytes.buffer as ArrayBuffer;
  const iv = ivBytes.buffer as ArrayBuffer;
  const key = await deriveKey(password, salt);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipherBytes.buffer as ArrayBuffer
  );
  return new TextDecoder().decode(plaintext);
}

// ── Chat API ───────────────────────────────────

export interface SendMessageOptions {
  apiKey: string;
  message: string;
  /** Context about the current lesson */
  context?: string;
  history?: ChatMessage[];
}

export async function sendMessage(opts: SendMessageOptions): Promise<string> {
  const systemPrompt =
    "你是量化分析师学习助手。你的学生是供应链分析师，正在将量化金融方法迁移到供应链预测。请用中文通俗解释，避免统计术语，给出可执行的代码示例。";

  const messages: { role: string; content: string }[] = [
    { role: "system", content: opts.context ? `${systemPrompt}\n\n当前课程：${opts.context}` : systemPrompt },
  ];

  if (opts.history) {
    for (const m of opts.history.slice(-10)) {
      messages.push({ role: m.role, content: m.content });
    }
  }

  messages.push({ role: "user", content: opts.message });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-pro",
      messages,
      max_tokens: 65536,
      temperature: 0.7,
      thinking: { type: "enabled" },
      reasoning_effort: "max",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } }).error?.message ?? res.statusText;
    throw new Error(msg);
  }

  const data = await res.json();
  return (data as { choices?: [{ message?: { content?: string } }] }).choices?.[0]?.message?.content ?? "";
}
