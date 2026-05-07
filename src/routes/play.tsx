import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { LotteryBall } from "@/components/LotteryBall";
import { useDemoState } from "@/lib/demo-store";
import { PICK_COUNT, TICKET_COST, TOTAL_BALLS, getNextDrawDate } from "@/lib/lottery";
import { Shuffle, Ticket, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play · Seven77" },
      { name: "description", content: "Pick 7 numbers from 77 balls and submit your ticket." },
    ],
  }),
  component: PlayPage,
});

function PlayPage() {
  const { balance, setBalance, addTicket } = useDemoState();
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  const remaining = PICK_COUNT - selected.length;
  const sortedSelected = useMemo(() => [...selected].sort((a, b) => a - b), [selected]);

  const toggle = (n: number) => {
    setSelected((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : prev.length >= PICK_COUNT ? prev : [...prev, n],
    );
  };

  const quickPick = () => {
    const pool = Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setSelected(pool.slice(0, PICK_COUNT));
  };

  const submit = () => {
    if (selected.length !== PICK_COUNT) {
      toast.error(`Pick exactly ${PICK_COUNT} numbers`);
      return;
    }
    if (balance < TICKET_COST) {
      toast.error("Not enough demo points");
      return;
    }
    setBalance(balance - TICKET_COST);
    addTicket({
      id: crypto.randomUUID(),
      numbers: sortedSelected,
      createdAt: Date.now(),
      drawAt: getNextDrawDate().getTime(),
    });
    toast.success("Ticket submitted!");
    navigate({ to: "/results" });
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Lottery · 77 → 7
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Pick your <span className="text-gradient-gold">7</span> lucky numbers
          </h1>
          <p className="mt-2 text-muted-foreground">Tap balls to select. Selected balls glow gold.</p>
        </div>

        {/* SELECTION SUMMARY */}
        <div className="mt-8 glass-strong rounded-3xl p-5 sm:p-6 sticky top-20 z-30">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-2 min-h-[48px]">
              {sortedSelected.length === 0 ? (
                <p className="text-sm text-muted-foreground">No numbers picked yet</p>
              ) : (
                sortedSelected.map((n) => (
                  <LotteryBall key={n} number={n} selected size="sm" onClick={() => toggle(n)} animateIn />
                ))
              )}
              {Array.from({ length: remaining }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-10 h-10 rounded-full border-2 border-dashed border-white/10"
                />
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={quickPick}
                className="inline-flex h-10 items-center gap-2 rounded-full glass px-4 text-sm font-medium hover:bg-white/5"
              >
                <Shuffle className="h-4 w-4" /> Quick pick
              </button>
              <button
                onClick={() => setSelected([])}
                className="inline-flex h-10 items-center gap-2 rounded-full glass px-4 text-sm font-medium hover:bg-white/5"
                disabled={selected.length === 0}
              >
                <Trash2 className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Cost: <span className="font-mono text-foreground">{TICKET_COST}</span> pts</span>
            <span>Balance: <span className="font-mono text-foreground">{balance.toLocaleString()}</span> pts</span>
          </div>
        </div>

        {/* BALL GRID */}
        <div className="mt-8 glass rounded-3xl p-4 sm:p-6">
          <div
            className="grid gap-2 sm:gap-3 justify-items-center"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))" }}
          >
            {Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1).map((n) => {
              const isSelected = selected.includes(n);
              const disabled = !isSelected && selected.length >= PICK_COUNT;
              return (
                <LotteryBall
                  key={n}
                  number={n}
                  selected={isSelected}
                  disabled={disabled}
                  onClick={() => toggle(n)}
                  size="md"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBMIT BAR */}
      <div className="fixed bottom-4 inset-x-0 z-40 px-4">
        <div className="mx-auto max-w-2xl glass-strong rounded-2xl p-3 flex items-center justify-between gap-3 shadow-elevated">
          <div className="text-sm">
            <div className="font-display font-semibold">
              {selected.length}/{PICK_COUNT} selected
            </div>
            <div className="text-xs text-muted-foreground">{remaining} remaining</div>
          </div>
          <button
            onClick={submit}
            disabled={selected.length !== PICK_COUNT}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] px-5 font-semibold text-primary-foreground glow-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:glow-none transition-transform hover:scale-105 disabled:hover:scale-100"
          >
            <Ticket className="h-4 w-4" /> Submit Ticket
          </button>
        </div>
      </div>
    </PageShell>
  );
}
