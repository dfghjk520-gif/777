import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Crown, Flame, Target } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "排行榜 · Seven77" },
      { name: "description", content: "顶尖赢家、最热连胜与最准玩家。" },
    ],
  }),
  component: LeaderboardPage,
});

const winners = [
  { rank: 1, name: "0xLuna", points: 412_500, matches: 7 },
  { rank: 2, name: "neonNomad", points: 268_300, matches: 6 },
  { rank: 3, name: "satoshi.eth", points: 199_000, matches: 6 },
  { rank: 4, name: "midnightFox", points: 142_750, matches: 5 },
  { rank: 5, name: "auraDrop", points: 128_900, matches: 5 },
  { rank: 6, name: "vaporPunk", points: 98_400, matches: 5 },
  { rank: 7, name: "novaWave", points: 71_200, matches: 4 },
  { rank: 8, name: "cryoKid", points: 64_800, matches: 4 },
];

const streaks = [
  { name: "neonNomad", streak: 12 },
  { name: "0xLuna", streak: 9 },
  { name: "vaporPunk", streak: 7 },
];

const accurate = [
  { name: "satoshi.eth", accuracy: "38.2%" },
  { name: "auraDrop", accuracy: "34.7%" },
  { name: "midnightFox", accuracy: "31.4%" },
];

function LeaderboardPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            名人堂
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-gradient-gold">顶尖</span>玩家
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-strong rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 flex items-center gap-2">
              <Crown className="h-4 w-4 text-[oklch(0.85_0.16_88)]" />
              <h2 className="font-display font-semibold">最高获奖</h2>
            </div>
            <div className="divide-y divide-white/5">
              {winners.map((w) => (
                <div key={w.rank} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-white/[0.03] transition-colors">
                  <div className="col-span-2 sm:col-span-1">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-bold ${
                      w.rank === 1 ? "bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] text-primary-foreground glow-gold"
                      : w.rank <= 3 ? "glass text-foreground" : "bg-white/5 text-muted-foreground"
                    }`}>
                      {w.rank}
                    </span>
                  </div>
                  <div className="col-span-6 sm:col-span-7 font-display font-medium">{w.name}</div>
                  <div className="col-span-2 text-right sm:text-left text-sm text-muted-foreground">
                    <span className="font-mono text-foreground">{w.matches}</span>/7
                  </div>
                  <div className="col-span-2 sm:col-span-2 text-right font-mono text-gradient-gold font-bold">
                    {w.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-[oklch(0.78_0.2_45)]" />
                <h3 className="font-display font-semibold">最热连胜</h3>
              </div>
              <ul className="space-y-3">
                {streaks.map((s) => (
                  <li key={s.name} className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="font-mono text-gradient-neon font-bold">{s.streak}🔥</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-[oklch(0.72_0.2_240)]" />
                <h3 className="font-display font-semibold">命中率最高</h3>
              </div>
              <ul className="space-y-3">
                {accurate.map((a) => (
                  <li key={a.name} className="flex justify-between text-sm">
                    <span>{a.name}</span>
                    <span className="font-mono text-gradient-neon font-bold">{a.accuracy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
