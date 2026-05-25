import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { LotteryBall } from "@/components/LotteryBall";
import { useDemoState } from "@/lib/demo-store";
import { calculateReward, generateWinningNumbers, PICK_COUNT } from "@/lib/lottery";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "开奖结果 · Seven77" },
      { name: "description", content: "观看即时开奖并查看你的彩券结果。" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { tickets, balance, setBalance, updateTicket } = useDemoState();
  const [winning, setWinning] = useState<number[]>([]);
  const [revealCount, setRevealCount] = useState(0);
  const [drawing, setDrawing] = useState(false);

  const runDraw = () => {
    const nums = generateWinningNumbers();
    setWinning(nums);
    setRevealCount(0);
    setDrawing(true);

    nums.forEach((_, i) => {
      setTimeout(() => setRevealCount(i + 1), 700 * (i + 1));
    });

    setTimeout(() => {
      setDrawing(false);
      // settle pending tickets
      let credited = 0;
      tickets.forEach((t) => {
        if (t.matches != null) return;
        const matches = t.numbers.filter((n) => nums.includes(n)).length;
        const reward = calculateReward(matches);
        credited += reward;
        updateTicket(t.id, { winning: nums, matches, reward });
      });
      if (credited > 0) setBalance(balance + credited);
    }, 700 * (PICK_COUNT + 1));
  };

  useEffect(() => {
    // auto-draw on first visit if there's nothing yet
    if (winning.length === 0) {
      const timer = setTimeout(runDraw, 400);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> 今日开奖
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-gradient-neon">中奖</span>号码
          </h1>
        </div>

        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[100px]">
            {Array.from({ length: PICK_COUNT }).map((_, i) => {
              const n = winning[i];
              const revealed = i < revealCount;
              if (!revealed) {
                return (
                  <div
                    key={i}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-white/15 flex items-center justify-center"
                  >
                    <div className="h-6 w-6 rounded-full bg-white/5 animate-spin-slow" />
                  </div>
                );
              }
              return <LotteryBall key={n} number={n} winning size="xl" animateIn />;
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={runDraw}
              disabled={drawing}
              className="inline-flex h-10 items-center gap-2 rounded-full glass px-5 text-sm font-medium hover:bg-white/5 disabled:opacity-50"
            >
              {drawing ? "开奖中…" : "再来一次示范开奖"}
            </button>
          </div>
        </div>

        {/* TICKETS */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-semibold">你的彩券</h2>
          <p className="text-sm text-muted-foreground">命中越多号码,奖励越丰厚。</p>

          <div className="mt-6 grid gap-3">
            {tickets.length === 0 && (
              <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
                目前没有彩券。<a href="/play" className="text-foreground underline underline-offset-4">前往选号</a>。
              </div>
            )}
            {tickets.map((t) => {
              const matches =
                t.matches != null
                  ? t.matches
                  : winning.length === PICK_COUNT && revealCount === PICK_COUNT
                  ? t.numbers.filter((n) => winning.includes(n)).length
                  : null;
              return (
                <div key={t.id} className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {t.numbers.map((n) => (
                      <LotteryBall
                        key={n}
                        number={n}
                        size="sm"
                        selected={winning.includes(n)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">命中</div>
                      <div className="font-mono text-xl font-bold text-gradient-neon">
                        {matches ?? "—"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">奖励</div>
                      <div className="font-mono text-xl font-bold text-gradient-gold">
                        {t.reward != null ? `+${t.reward.toLocaleString()}` : "—"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
