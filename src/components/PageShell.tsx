import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="mt-24 border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Seven77 — Demo MVP. No real money. No gambling.</p>
          <p className="font-mono text-xs">v0.1.0 · provably fair (coming soon)</p>
        </div>
      </footer>
    </div>
  );
}
