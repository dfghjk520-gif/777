import { useEffect, useState } from "react";
import { getNextDrawDate } from "@/lib/lottery";

function format(n: number) { return n.toString().padStart(2, "0"); }

export function Countdown() {
  const [target, setTarget] = useState<Date>(() => getNextDrawDate());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (target.getTime() <= now) setTarget(getNextDrawDate());
  }, [now, target]);

  const diff = Math.max(0, target.getTime() - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  const Cell = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="glass rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[88px]">
        <div className="font-mono text-3xl sm:text-5xl font-bold text-gradient-gold tabular-nums">
          {value}
        </div>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4">
      <Cell value={format(h)} label="時" />
      <div className="pb-8 text-3xl sm:text-5xl font-bold text-muted-foreground/50">:</div>
      <Cell value={format(m)} label="分" />
      <div className="pb-8 text-3xl sm:text-5xl font-bold text-muted-foreground/50">:</div>
      <Cell value={format(s)} label="秒" />
    </div>
  );
}
