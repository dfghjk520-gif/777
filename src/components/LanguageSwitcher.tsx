import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useT, LANGS } from "@/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useT();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 items-center gap-1.5 rounded-full glass px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        aria-label={t("lang.label")}
      >
        <Languages className="h-3.5 w-3.5" />
        <span className="font-mono">{current.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className={lang === l.code ? "font-semibold text-foreground" : ""}
          >
            <span className="font-mono text-xs w-6 text-muted-foreground">{l.short}</span>
            <span>{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
