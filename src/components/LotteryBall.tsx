import { cn } from "@/lib/utils";

interface LotteryBallProps {
  number: number;
  selected?: boolean;
  winning?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  disabled?: boolean;
  animateIn?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-10 h-10 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-xl",
  xl: "w-20 h-20 text-2xl",
};

export function LotteryBall({
  number,
  selected,
  winning,
  size = "md",
  onClick,
  disabled,
  animateIn,
  className,
}: LotteryBallProps) {
  const interactive = !!onClick && !disabled;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-display font-bold tracking-tight",
        "transition-all duration-300 select-none",
        sizeMap[size],
        interactive && "hover:scale-110 active:scale-95 cursor-pointer",
        disabled && !selected && "opacity-30 cursor-not-allowed",
        animateIn && "animate-ball-pop",
        // base look
        !selected && !winning &&
          "bg-[radial-gradient(circle_at_30%_25%,oklch(0.4_0.04_260),oklch(0.18_0.03_260))] text-foreground/80 border border-white/10 shadow-[inset_0_-6px_12px_oklch(0_0_0/0.5),inset_0_2px_4px_oklch(1_0_0/0.1)]",
        // selected (gold)
        selected &&
          "text-primary-foreground border border-[oklch(0.95_0.13_90)] glow-gold bg-[radial-gradient(circle_at_30%_25%,oklch(0.98_0.12_95),oklch(0.78_0.18_70))] shadow-[inset_0_-6px_14px_oklch(0.5_0.15_60/0.6),inset_0_3px_6px_oklch(1_0_0/0.5)]",
        // winning (neon)
        winning &&
          "text-accent-foreground border border-[oklch(0.85_0.18_240)] glow-neon bg-[radial-gradient(circle_at_30%_25%,oklch(0.92_0.12_230),oklch(0.62_0.22_245))] shadow-[inset_0_-6px_14px_oklch(0.4_0.18_245/0.6),inset_0_3px_6px_oklch(1_0_0/0.5)]",
        className,
      )}
    >
      <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">{number}</span>
      <span className="pointer-events-none absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_30%_22%,oklch(1_0_0/0.45),transparent_45%)]" />
    </button>
  );
}
