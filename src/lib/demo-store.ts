// Lightweight client-side demo state. Will be swapped for Lovable Cloud later.
import { useEffect, useState } from "react";
import { STARTING_BALANCE } from "./lottery";

export interface Ticket {
  id: string;
  numbers: number[];
  createdAt: number;
  drawAt: number;
  winning?: number[];
  matches?: number;
  reward?: number;
}

interface DemoState {
  balance: number;
  tickets: Ticket[];
  username: string;
}

const KEY = "seven77-demo-v1";

function read(): DemoState {
  if (typeof window === "undefined") return { balance: STARTING_BALANCE, tickets: [], username: "Player" };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { balance: STARTING_BALANCE, tickets: [], username: "Player" };
    return JSON.parse(raw);
  } catch {
    return { balance: STARTING_BALANCE, tickets: [], username: "Player" };
  }
}

function write(state: DemoState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("seven77:update"));
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>(() => read());

  useEffect(() => {
    const handler = () => setState(read());
    window.addEventListener("seven77:update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("seven77:update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    ...state,
    setBalance: (b: number) => write({ ...read(), balance: b }),
    addTicket: (t: Ticket) => {
      const cur = read();
      write({ ...cur, tickets: [t, ...cur.tickets] });
    },
    updateTicket: (id: string, patch: Partial<Ticket>) => {
      const cur = read();
      write({ ...cur, tickets: cur.tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
    },
    setUsername: (n: string) => write({ ...read(), username: n }),
    reset: () => write({ balance: STARTING_BALANCE, tickets: [], username: "Player" }),
  };
}
