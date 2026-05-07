export const TOTAL_BALLS = 77;
export const PICK_COUNT = 7;
export const TICKET_COST = 100;
export const STARTING_BALANCE = 5000;

export function generateWinningNumbers(seed?: number): number[] {
  const pool = Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1);
  // simple deterministic-ish shuffle
  let s = seed ?? Date.now();
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, PICK_COUNT).sort((a, b) => a - b);
}

export function calculateReward(matches: number): number {
  const table: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 200, 4: 1000, 5: 5000, 6: 25000, 7: 250000 };
  return table[matches] ?? 0;
}

export function getNextDrawDate(): Date {
  const next = new Date();
  next.setUTCHours(20, 0, 0, 0);
  if (next.getTime() <= Date.now()) next.setUTCDate(next.getUTCDate() + 1);
  return next;
}
