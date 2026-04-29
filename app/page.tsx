"use client";

import { useState } from "react";

const VPS_IP = "72.60.0.60";
const APP_PASSWORD = "Techmind@2026@"; // 🔁 Change this to your password

const projects = [
  {
    id: "calendar",
    title: "Calendar Project",
    subtitle: "Team scheduling and event automation",
    link: `http://${VPS_IP}:8080`,
    role: "Planner",
    username: "admin",
    password: "admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M6 2v4M18 2v4M4 8h16M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "purchase",
    title: "Purchase Project",
    subtitle: "Procurement workflows and orders hub",
    link: `http://${VPS_IP}:8070`,
    role: "Buyer",
    username: "admin",
    password: "admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M5 6h14M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 18h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "glpi",
    title: "GLPI Project",
    subtitle: "IT service management and support desk",
    link: `http://${VPS_IP}:8082`,
    role: "Support",
    username: "admin",
    password: "admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 4l8 4v8l-8 4-8-4V8l8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 8.5l-8 4.5-8-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

type Project = (typeof projects)[number];

function copyToClipboard(value: string, onSuccess: () => void) {
  if (typeof window === "undefined" || !navigator.clipboard) return;
  navigator.clipboard.writeText(value).then(onSuccess);
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (input === APP_PASSWORD) {
      sessionStorage.setItem("auth", "1");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.10),_transparent_60%)] blur-3xl" />

      <div
        className={`relative w-full max-w-sm px-4 transition-transform ${shake ? "animate-[shake_0.4s_ease]" : ""}`}
        style={shake ? { animation: "shake 0.4s ease" } : {}}
      >
        {/* Card */}
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          {/* Lock icon */}
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl bg-white/5 text-red-300 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="mb-1 text-center text-2xl font-semibold text-white">Access Required</h1>
          <p className="mb-8 text-center text-sm text-slate-400">Enter the password to continue</p>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={`w-full rounded-2xl border px-4 py-3 text-sm text-white placeholder-slate-500 bg-slate-900/80 outline-none transition focus:ring-2 focus:ring-red-500/40 ${
                error ? "border-red-500/60" : "border-white/10"
              }`}
            />

            {error && (
              <p className="text-center text-xs text-red-400">Incorrect password. Try again.</p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 active:scale-95"
            >
              Unlock
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [copiedLabel, setCopiedLabel] = useState<string>("");

  const handleCopy = (label: string, value: string) => {
    copyToClipboard(value, () => {
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(""), 1400);
    });
  };

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 px-6 py-7 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(239,68,68,0.22)]">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-40 rounded-[24px] bg-gradient-to-br from-red-500/10 via-transparent to-sky-500/5 blur-3xl opacity-80" />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white/5 text-red-300 ring-1 ring-white/10">
            {project.icon}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{project.role}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{project.title}</h2>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          SaaS
        </span>
      </div>

      <p className="relative z-10 mt-5 text-sm leading-6 text-slate-400">{project.subtitle}</p>

      <div className="relative z-10 mt-6 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
            <span>Username</span>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:bg-white/10"
              onClick={() => handleCopy("Username", project.username)}
            >
              Copy
            </button>
          </div>
          <p className="mt-3 truncate text-base font-medium text-white">{project.username}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
            <span>Password</span>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:bg-white/10"
              onClick={() => handleCopy("Password", project.password)}
            >
              Copy
            </button>
          </div>
          <p className="mt-3 truncate text-base font-medium text-white">{project.password}</p>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[160px] items-center justify-center rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Open Project
        </a>
        <button
          type="button"
          onClick={() => handleCopy("Credentials", `${project.username}:${project.password}`)}
          className="inline-flex min-w-[160px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          Copy All
        </button>
      </div>

      {copiedLabel ? (
        <div className="relative z-10 mt-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-500/20">
          {copiedLabel} copied to clipboard
        </div>
      ) : null}
    </article>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.22),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.14),_transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header with logout */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Projects</h1>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/10"
          >
            Lock
          </button>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("auth") === "1";
  });

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    setAuthed(false);
  };

  if (!authed) {
    return <LoginPage onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}