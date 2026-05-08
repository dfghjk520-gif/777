import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useDemoState } from "@/lib/demo-store";
import { Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "登入 · Seven77" },
      { name: "description", content: "登入以參加 Seven77 每日樂透。" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { setUsername } = useDemoState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split("@")[0] || "玩家";
    setUsername(name);
    toast.success(`歡迎回來,${name}`);
    navigate({ to: "/play" });
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 pt-16 pb-20">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">歡迎回來</h1>
          <p className="mt-2 text-sm text-muted-foreground">登入以參加今日開獎。</p>
        </div>

        <form onSubmit={submit} className="mt-8 glass-strong rounded-3xl p-6 space-y-4">
          <button
            type="button"
            onClick={() => { setUsername("玩家"); navigate({ to: "/play" }); }}
            className="w-full h-11 inline-flex items-center justify-center gap-3 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            使用 Google 繼續
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-white/10" />
            或
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">電子郵件</span>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@seven77.app"
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.18_240)] focus:border-transparent transition"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">密碼</span>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.18_240)] focus:border-transparent transition"
              />
            </div>
          </label>

          <button
            type="submit"
            className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] font-semibold text-primary-foreground glow-gold hover:scale-[1.02] transition-transform"
          >
            登入並開玩
          </button>

          <p className="text-center text-xs text-muted-foreground">
            還沒有帳號?<Link to="/login" className="text-foreground underline underline-offset-4">建立帳號</Link>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          示範模式 · 無真實驗證。完整登入功能將透過 Lovable Cloud 提供。
        </p>
      </section>
    </PageShell>
  );
}
