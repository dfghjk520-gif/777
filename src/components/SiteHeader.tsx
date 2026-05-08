import { Link } from "@tanstack/react-router";
import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const nav = [
  { to: "/", label: "首頁" },
  { to: "/play", label: "選號" },
  { to: "/results", label: "開獎" },
  { to: "/leaderboard", label: "排行榜" },
  { to: "/dashboard", label: "我的" },
] as const;

export function SiteHeader() {
  const { user, profile, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background/80 to-transparent backdrop-blur-md border-b border-white/5" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold">
            <Sparkles className="h-4 w-4 text-background" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Seven<span className="text-gradient-gold">77</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-1.5 text-sm font-medium text-foreground bg-white/5" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 h-9 rounded-full glass px-3 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] flex items-center justify-center text-xs font-bold text-background">
                  {(profile?.username ?? "U").slice(0, 1).toUpperCase()}
                </span>
                <span className="font-mono text-xs text-gradient-gold">
                  {(profile?.balance ?? 0).toLocaleString()}
                </span>
              </Link>
              <button
                onClick={async () => { await signOut(); toast.success("已登出"); }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="登出"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                登入
              </Link>
              <Link
                to="/login"
                className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] px-4 text-sm font-semibold text-primary-foreground glow-gold hover:scale-105 transition-transform"
              >
                立即開玩
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
