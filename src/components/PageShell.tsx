import { SiteHeader } from "./SiteHeader";
import { useT } from "@/i18n";

export function PageShell({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="mt-24 border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t("footer.copy", { year: new Date().getFullYear() })}</p>
          <p className="font-mono text-xs">{t("footer.version")}</p>
        </div>
      </footer>
    </div>
  );
}
