import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Countdown } from "@/components/Countdown";
import { LotteryBall } from "@/components/LotteryBall";
import { ArrowRight, Shield, Sparkles, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seven77 — 77 選 7 · 新世代加密樂透" },
      { name: "description", content: "未來感十足、公平透明的每日樂透。從 77 顆球選 7 顆,挑戰頭獎。" },
      { property: "og:title", content: "Seven77 — 77 選 7" },
      { property: "og:description", content: "未來感十足、公平透明的每日樂透。" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-fade-mask opacity-40"
             style={{ backgroundImage: "linear-gradient(oklch(1 0 0 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.06) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_140)] animate-pulse" />
            示範版本 · 每日 20:00 UTC 開獎
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter animate-fade-up" style={{ animationDelay: "60ms" }}>
            <span className="text-gradient-gold">77</span>
            <span className="text-foreground/90"> 選 </span>
            <span className="text-gradient-neon">7</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "120ms" }}>
            新世代數位樂透。挑選七個幸運號碼,參加每日開獎,公平透明,輕鬆挑戰頭獎。
          </p>

          {/* floating balls */}
          <div className="relative mx-auto mt-10 h-44 sm:h-56 w-full max-w-3xl">
            {[7, 21, 34, 42, 55, 63, 77].map((n, i) => (
              <div
                key={n}
                className="absolute animate-float"
                style={{
                  left: `${8 + i * 12.5}%`,
                  top: `${i % 2 === 0 ? 10 : 50}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                }}
              >
                <LotteryBall number={n} size="lg" selected={i % 3 === 0} winning={i % 4 === 1} />
              </div>
            ))}
          </div>

          {/* JACKPOT */}
          <div className="mx-auto mt-4 max-w-2xl glass-strong rounded-3xl p-6 sm:p-8 animate-pulse-glow">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">今日頭獎</div>
            <div className="mt-2 font-mono text-5xl sm:text-7xl font-bold text-gradient-gold tabular-nums">
              250,000
            </div>
            <div className="text-sm text-muted-foreground">示範點數</div>
            <div className="mt-6">
              <Countdown />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/play"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] px-7 text-base font-semibold text-primary-foreground glow-gold hover:scale-105 transition-transform"
            >
              立即開玩
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/results"
              className="inline-flex h-12 items-center gap-2 rounded-full glass px-6 text-base font-medium text-foreground hover:bg-white/5 transition-colors"
            >
              查看開獎
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: "公平驗證", desc: "每場開獎皆可驗證,值得您信任。" },
          { icon: Zap, title: "即時結算", desc: "開獎結束後立即發放示範點數。" },
          { icon: Trophy, title: "每日頭獎", desc: "每 24 小時新一場機會,連勝再加碼。" },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
              <f.icon className="h-5 w-5 text-[oklch(0.85_0.15_240)]" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> 玩法說明
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">
            三步驟挑戰頭獎
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "01", title: "從 77 選 7", desc: "從號碼星座中挑選你的幸運數字。" },
            { step: "02", title: "提交彩券", desc: "花費 100 示範點數鎖定你的彩券。" },
            { step: "03", title: "觀看開獎", desc: "每日 20:00 UTC 即時揭曉中獎號碼。" },
          ].map((s) => (
            <div key={s.step} className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="font-mono text-6xl font-bold text-gradient-neon opacity-30">{s.step}</div>
              <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
