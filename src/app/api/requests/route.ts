import { NextResponse } from "next/server";

import {
  addRequest,
  deleteRequest,
  listRequests,
  setRequestRead,
  type NewClientRequest,
} from "@/lib/requests-store";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = ["project", "website", "automation", "other"] as const;
const MAX_PER_IP_PER_HOUR = 6;
const attempts = new Map<string, number[]>();

function getIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= MAX_PER_IP_PER_HOUR) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

function isAdminRequest(request: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "snow0192";
  return request.headers.get("x-admin-token") === expected;
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(getIp(request))) {
    return error("Too many requests. Try again later.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Invalid request body.", 400);
  }

  const { name, email, type, budget, message, website } = body as Record<string, unknown>;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const cleanName = typeof name === "string" ? name.trim().slice(0, 80) : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase().slice(0, 120) : "";
  const cleanMessage = typeof message === "string" ? message.trim().slice(0, 4000) : "";
  const cleanBudget = typeof budget === "string" && budget ? budget.slice(0, 40) : undefined;

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return error("Missing required fields.", 400);
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return error("Invalid email address.", 400);
  }

  const cleanType = PROJECT_TYPES.includes(type as (typeof PROJECT_TYPES)[number])
    ? (type as (typeof PROJECT_TYPES)[number])
    : "other";

  const created = addRequest({
    name: cleanName,
    email: cleanEmail,
    type: cleanType,
    budget: cleanBudget,
    message: cleanMessage,
  } satisfies NewClientRequest);

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return error("Unauthorized.", 401);
  }
  return NextResponse.json({ requests: listRequests() });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return error("Unauthorized.", 401);
  }
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("Missing id.", 400);

  const updated = setRequestRead(id, url.searchParams.get("read") === "true");
  if (!updated) return error("Request not found.", 404);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return error("Unauthorized.", 401);
  }
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("Missing id.", 400);

  if (!deleteRequest(id)) return error("Request not found.", 404);
  return NextResponse.json({ ok: true });
}