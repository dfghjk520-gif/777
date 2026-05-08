import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="mt-24 border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Seven77 — 示範版本。本平台不涉及真實金錢與賭博。</p>
          <p className="font-mono text-xs">v0.1.0 · 公平驗證(即將推出)</p>
        </div>
      </footer>
    </div>
  );
}
