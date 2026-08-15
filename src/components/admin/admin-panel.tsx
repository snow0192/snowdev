"use client";

import { useEffect, useEffectEvent, useMemo, useSyncExternalStore, useState } from "react";
import {
  Check,
  Download,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface AdminRequest {
  id: string;
  name: string;
  email: string;
  type: string;
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const TOKEN_KEY = "snow-admin-token";
const TOKEN_EVENT = "snow-admin-login";

function subscribeToToken(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(TOKEN_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(TOKEN_EVENT, callback);
  };
}

function getTokenSnapshot(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

async function fetchRequestsFromApi(authToken: string): Promise<AdminRequest[]> {
  const response = await fetch("/api/requests", {
    headers: { "x-admin-token": authToken },
  });
  if (response.status === 401) {
    throw new AdminAuthError();
  }
  if (!response.ok) throw new Error("Falha ao carregar solicitações.");
  const data = (await response.json()) as { requests: AdminRequest[] };
  return data.requests;
}

class AdminAuthError extends Error {}

const TYPE_LABELS: Record<string, string> = {
  project: "Projeto de software",
  website: "Site / web app",
  automation: "Automação / ferramenta",
  other: "Outro",
};

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(iso: string) {
  try {
    return dateFormat.format(new Date(iso));
  } catch {
    return iso;
  }
}

function toCsv(requests: AdminRequest[]) {
  const header = ["nome", "email", "tipo", "orcamento", "mensagem", "data", "status"];
  const rows = requests.map((request) => [
    request.name,
    request.email,
    TYPE_LABELS[request.type] ?? request.type,
    request.budget ?? "",
    request.message,
    formatDate(request.createdAt),
    request.read ? "lida" : "nova",
  ]);
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  return [header, ...rows].map((row) => row.map(escape).join(";")).join("\r\n");
}

export function AdminPanel() {
  const token = useSyncExternalStore(subscribeToToken, getTokenSnapshot, () => null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadRequests = useEffectEvent(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      setRequests(await fetchRequestsFromApi(authToken));
    } catch (cause) {
      if (cause instanceof AdminAuthError) {
        sessionStorage.removeItem(TOKEN_KEY);
        window.dispatchEvent(new Event(TOKEN_EVENT));
        setAuthError("Senha incorreta.");
      } else {
        setError(cause instanceof Error ? cause.message : "Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async data fetch on mount (recommended React pattern)
    if (token) void loadRequests(token);
  }, [token]);

  const stats = useMemo(
    () => ({
      total: requests.length,
      unread: requests.filter((request) => !request.read).length,
    }),
    [requests],
  );

  const visible = useMemo(
    () => (filter === "unread" ? requests.filter((request) => !request.read) : requests),
    [requests, filter],
  );

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password) return;
    setAuthError("");
    setLoading(true);
    try {
      const requests = await fetchRequestsFromApi(password.trim());
      sessionStorage.setItem(TOKEN_KEY, password.trim());
      window.dispatchEvent(new Event(TOKEN_EVENT));
      setRequests(requests);
    } catch (cause) {
      setAuthError(
        cause instanceof AdminAuthError
          ? "Senha incorreta."
          : "Erro de conexão. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      setRequests(await fetchRequestsFromApi(token));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const setRead = async (request: AdminRequest, read: boolean) => {
    if (!token) return;
    setBusyId(request.id);
    try {
      const response = await fetch(`/api/requests?id=${request.id}&read=${read}`, {
        method: "PATCH",
        headers: { "x-admin-token": token },
      });
      if (!response.ok) throw new Error();
      setRequests((previous) =>
        previous.map((item) => (item.id === request.id ? { ...item, read } : item)),
      );
    } catch {
      setError("Falha ao atualizar.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (request: AdminRequest) => {
    if (!token || !window.confirm(`Excluir solicitação de ${request.name}?`)) return;
    setBusyId(request.id);
    try {
      const response = await fetch(`/api/requests?id=${request.id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (!response.ok) throw new Error();
      setRequests((previous) => previous.filter((item) => item.id !== request.id));
    } catch {
      setError("Falha ao excluir.");
    } finally {
      setBusyId(null);
    }
  };

  const exportCsv = () => {
    const blob = new Blob(["\uFEFF" + toCsv(requests)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `solicitacoes-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event(TOKEN_EVENT));
    setRequests([]);
    setPassword("");
  };

  if (!token) {
    return (
      <main className="flex min-h-svh items-center justify-center px-6">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--color-line)] bg-surface p-8"
        >
          <p className="eyebrow">Admin · Snow</p>
          <h1 className="mt-3 font-display text-2xl font-medium text-white">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-faint">
            Entre com a senha para gerenciar as solicitações dos clientes.
          </p>
          <label htmlFor="admin-pass" className="sr-only">
            Senha
          </label>
          <input
            id="admin-pass"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            autoFocus
            className="mt-6 w-full border-b border-[var(--color-line)] bg-transparent py-3 text-sm text-white placeholder:text-faint focus:border-white focus:outline-none"
          />
          {authError && (
            <p role="alert" className="mt-3 font-mono text-xs text-red-400">
              {authError}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-[var(--radius-xs)] bg-white py-3 text-sm font-medium text-black transition-opacity disabled:opacity-50"
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-svh">
      <header className="sticky top-0 z-10 border-b border-[var(--color-line)] bg-ink/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              SNOW
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.2em] text-faint uppercase sm:block">
              Painel administrativo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-white"
              aria-label="Atualizar"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="flex h-9 items-center gap-2 rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3 text-xs text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-white"
            >
              <Download size={13} />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--color-line)] text-muted transition-colors hover:border-red-400/40 hover:text-red-400"
              aria-label="Sair"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Solicitações de clientes</p>
            <h1 className="mt-3 font-display text-3xl font-medium text-white">
              Caixa de entrada
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-5 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Total</p>
              <p className="mt-1 font-display text-2xl text-white">{stats.total}</p>
            </div>
            <div className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-5 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Novas</p>
              <p className="mt-1 font-display text-2xl text-white">{stats.unread}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-1">
          {(
            [
              ["all", "Todas"],
              ["unread", "Não lidas"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-[var(--radius-xs)] px-4 py-2 font-mono text-[11px] tracking-wide uppercase transition-colors ${
                filter === value
                  ? "bg-white font-medium text-black"
                  : "text-faint hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-6 font-mono text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {visible.length === 0 && !loading && (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-line)] py-20 text-center">
              <p className="font-mono text-xs tracking-[0.2em] text-faint uppercase">
                Nenhuma solicitação {filter === "unread" ? "não lida" : ""} por aqui
              </p>
            </div>
          )}

          {visible.map((request) => (
            <article
              key={request.id}
              className={`rounded-[var(--radius-md)] border p-6 transition-colors sm:p-7 ${
                request.read
                  ? "border-[var(--color-line)] bg-surface/60"
                  : "border-[var(--color-line-strong)] bg-surface"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      request.read ? "bg-white/20" : "bg-white"
                    }`}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-lg font-medium text-white">
                        {request.name}
                      </h2>
                      {!request.read && (
                        <span className="rounded-[var(--radius-xs)] border border-white/20 px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-white uppercase">
                          Nova
                        </span>
                      )}
                    </div>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-faint">
                      <a
                        href={`mailto:${request.email}`}
                        className="transition-colors hover:text-white"
                      >
                        {request.email}
                      </a>
                      <span>·</span>
                      <span>{formatDate(request.createdAt)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-2.5 py-1 font-mono text-[10px] text-muted">
                    {TYPE_LABELS[request.type] ?? request.type}
                  </span>
                  {request.budget && (
                    <span className="rounded-[var(--radius-xs)] border border-[var(--color-line)] px-2.5 py-1 font-mono text-[10px] text-muted">
                      {request.budget}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed whitespace-pre-wrap text-muted">
                {request.message}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--color-line)] pt-5">
                <button
                  type="button"
                  disabled={busyId === request.id}
                  onClick={() => setRead(request, !request.read)}
                  className="flex items-center gap-2 rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3.5 py-2 text-xs text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-white disabled:opacity-50"
                >
                  <Check size={13} />
                  {request.read ? "Marcar como não lida" : "Marcar como lida"}
                </button>
                <a
                  href={`mailto:${request.email}?subject=${encodeURIComponent(`Re: projeto — ${request.name}`)}`}
                  className="flex items-center gap-2 rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3.5 py-2 text-xs text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-white"
                >
                  <Mail size={13} />
                  Responder
                </a>
                <button
                  type="button"
                  disabled={busyId === request.id}
                  onClick={() => void remove(request)}
                  className="ml-auto flex items-center gap-2 rounded-[var(--radius-xs)] border border-[var(--color-line)] px-3.5 py-2 text-xs text-muted transition-colors hover:border-red-400/40 hover:text-red-400 disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}