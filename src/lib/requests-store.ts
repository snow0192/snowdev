import "server-only";

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface ClientRequest {
  id: string;
  name: string;
  email: string;
  type: "project" | "website" | "automation" | "other";
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export type NewClientRequest = Omit<ClientRequest, "id" | "createdAt" | "read">;

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "requests.json");

function readAll(): ClientRequest[] {
  try {
    if (!existsSync(DATA_FILE)) return [];
    const parsed = JSON.parse(readFileSync(DATA_FILE, "utf8")) as unknown;
    return Array.isArray(parsed) ? (parsed as ClientRequest[]) : [];
  } catch {
    return [];
  }
}

function writeAll(requests: ClientRequest[]) {
  mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(requests, null, 2), "utf8");
  renameSync(tmp, DATA_FILE);
}

export function listRequests(): ClientRequest[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addRequest(input: NewClientRequest): ClientRequest {
  const request: ClientRequest = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  writeAll([request, ...readAll()]);
  return request;
}

export function setRequestRead(id: string, read: boolean): ClientRequest | null {
  const all = readAll();
  const found = all.find((request) => request.id === id);
  if (!found) return null;
  found.read = read;
  writeAll(all);
  return found;
}

export function deleteRequest(id: string): boolean {
  const all = readAll();
  const next = all.filter((request) => request.id !== id);
  if (next.length === all.length) return false;
  writeAll(next);
  return true;
}

export function requestStats() {
  const all = readAll();
  return {
    total: all.length,
    unread: all.filter((request) => !request.read).length,
  };
}