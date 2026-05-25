import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { LotteryBall } from "@/components/LotteryBall";
import { useDemoState } from "@/lib/demo-store";
import { Coins, History, Trophy, User2 } from "lucide-react";
import { useT } from "@/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Seven77" },
      { name: "description", content: "Your tickets, balance and lottery stats." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t } = useT();
  const { balance, tickets, username, reset } = useDemoState();

  const totalTickets = tickets.length;
  const totalWon = tickets.reduce((sum, tk) => sum + (tk.reward ?? 0), 0);
  const bestMatch = tickets.reduce((m, tk) => Math.max(m, tk.matches ?? 0), 0);

  const stats = [
    { icon: Coins, label: t("dash.stat.balance"), value: balance.toLocaleString(), accent: "gold" as const },
    { icon: History, label: t("dash.stat.played"), value: totalTickets.toString() },
    { icon: Trophy, label: t("dash.stat.won"), value: totalWon.toLocaleString(), accent: "gold" as const },
    { icon: User2, label: t("dash.stat.best"), value: `${bestMatch}/7` },
  ];

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold flex items-center justify-center font-display font-bold text-xl text-background">
              {username.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{t("dash.hello", { name: username })}</h1>
              <p className="text-sm text-muted-foreground">{t("dash.sub")}</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="inline-flex h-9 items-center rounded-full glass px-4 text-sm hover:bg-white/5"
          >
            {t("dash.reset")}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <s.icon className="h-4 w-4 text-[oklch(0.85_0.15_240)]" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className={`mt-1 font-mono text-2xl font-bold ${s.accent === "gold" ? "text-gradient-gold" : ""}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">{t("dash.records")}</h2>
            <Link to="/play" className="text-sm text-muted-foreground hover:text-foreground">{t("dash.add")}</Link>
          </div>

          <div className="mt-4 grid gap-3">
            {tickets.length === 0 && (
              <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
                {t("dash.empty")}<Link to="/play" className="text-foreground underline underline-offset-4">{t("dash.empty.link")}</Link>。
              </div>
            )}
            {tickets.map((tk) => (
              <div key={tk.id} className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {new Date(tk.createdAt).toLocaleString()}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {tk.numbers.map((n) => (
                      <LotteryBall key={n} number={n} size="sm" selected={tk.winning?.includes(n)} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("res.matches")}</div>
                    <div className="font-mono text-lg font-bold text-gradient-neon">
                      {tk.matches ?? "—"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("res.reward")}</div>
                    <div className="font-mono text-lg font-bold text-gradient-gold">
                      {tk.reward ? `+${tk.reward.toLocaleString()}` : "—"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
