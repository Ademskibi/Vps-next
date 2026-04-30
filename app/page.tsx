"use client";

import { useState } from "react";

const VPS_IP = "72.60.90.60";
const APP_PASSWORD = "Techmind@2026@";

const projects = [
  {
    id: "calendar",
    title: "Calendar Project",
    subtitle: "Team scheduling and event automation",
    link: `http://${VPS_IP}:8080`,
    role: "Planner",
    accounts: [
      { label: "Admin", username: "admin", password: "admin" },
    ],
  },
  {
    id: "purchase",
    title: "Purchase Project",
    subtitle: "Procurement workflows and orders hub",
    link: `http://${VPS_IP}:8070`,
    role: "Buyer",
    accounts: [
      { label: "Admin", username: "admin", password: "admin" },
      { label: "test", username: "UserIt", password: "userit" },
    ],
  },
  {
    id: "glpi",
    title: "GLPI Project",
    subtitle: "IT service management and support desk",
    link: `http://${VPS_IP}:8082`,
    role: "Support",
    accounts: [
      { label: "entity HTA", username: "Admin-HTA", password: "HTA2026" },
      { label: "entity Techmind", username: "Admin-Techmind", password: "Techmind2026" },
      { label: "entity root", username: "glpi", password: "09944242ha" },
    ],
  },
];

type Project = (typeof projects)[number];

function copyToClipboard(value: string, onSuccess: () => void) {
  if (typeof window === "undefined" || !navigator.clipboard) return;
  navigator.clipboard.writeText(value).then(onSuccess);
}

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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_45%)]" />

      <div
        className={`relative w-full max-w-sm px-4 ${
          shake ? "animate-[shake_0.4s_ease]" : ""
        }`}
      >
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl bg-white/5 text-red-300 ring-1 ring-white/10">
            🔒
          </div>

          <h1 className="mb-1 text-center text-2xl font-semibold text-white">
            Access Required
          </h1>

          <p className="mb-8 text-center text-sm text-slate-400">
            Enter the password to continue
          </p>

          <input
            type="password"
            placeholder="Password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={`w-full rounded-2xl border px-4 py-3 text-sm text-white placeholder-slate-500 bg-slate-900/80 outline-none transition focus:ring-2 focus:ring-red-500/40 ${
              error ? "border-red-500/60" : "border-white/10"
            }`}
          />

          {error && (
            <p className="mt-3 text-center text-xs text-red-400">
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 w-full rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 active:scale-95"
          >
            Unlock
          </button>
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

function ProjectCard({ project }: { project: Project }) {
  const [copiedLabel, setCopiedLabel] = useState("");

  const handleCopy = (label: string, value: string) => {
    copyToClipboard(value, () => {
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(""), 1400);
    });
  };

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 px-6 py-7 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
            {project.role}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {project.title}
          </h2>
        </div>

       
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-400">
        {project.subtitle}
      </p>

      <div className="mt-6 space-y-4">
        {project.accounts.map((account, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-red-300">
                {account.label}
              </h3>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `${account.label} Credentials`,
                    `${account.username}:${account.password}`
                  )
                }
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10"
              >
                Copy All
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Username</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(`${account.label} Username`, account.username)
                    }
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-1 truncate text-base font-medium text-white">
                  {account.username}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Password</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(`${account.label} Password`, account.password)
                    }
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-1 truncate text-base font-medium text-white">
                  {account.password}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
      >
        Open Project
      </a>

      {copiedLabel && (
        <div className="mt-4 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-500/20">
          {copiedLabel} copied to clipboard
        </div>
      )}
    </article>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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