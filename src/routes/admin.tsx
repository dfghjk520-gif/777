import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { getAdminUsers } from "@/lib/admin.functions";
import { Loader2, ShieldCheck } from "lucide-react";
import { useT } from "@/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin · Seven77" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t, lang } = useT();
  const fetchUsers = useServerFn(getAdminUsers);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) throw new Error(t("admin.relogin"));
      return fetchUsers({ data: { accessToken } });
    },
    retry: false,
  });

  const localeTag = lang === "zh-TW" ? "zh-Hant" : lang === "zh-CN" ? "zh-Hans" : "en";

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold">
            <ShieldCheck className="h-5 w-5 text-background" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">{t("admin.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("admin.sub")}</p>
          </div>
        </div>

        {isLoading && (
          <div className="glass-strong rounded-3xl p-12 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> {t("admin.loading")}
          </div>
        )}

        {error && (
          <div className="glass-strong rounded-3xl p-8 text-center">
            <p className="text-sm text-destructive font-medium">
              {String((error as Error).message ?? error)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t("admin.needAdmin")}
            </p>
          </div>
        )}

        {data && (
          <div className="glass-strong rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("admin.total")} <span className="text-foreground font-semibold">{data.users.length}</span> {t("admin.users")}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {t("admin.totalBalance")} {data.users.reduce((s, u) => s + u.balance, 0).toLocaleString()} pts
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 font-medium">{t("admin.th.name")}</th>
                    <th className="text-left px-6 py-3 font-medium">{t("admin.th.email")}</th>
                    <th className="text-right px-6 py-3 font-medium">{t("admin.th.balance")}</th>
                    <th className="text-left px-6 py-3 font-medium">{t("admin.th.role")}</th>
                    <th className="text-left px-6 py-3 font-medium">{t("admin.th.created")}</th>
                    <th className="text-left px-6 py-3 font-medium">{t("admin.th.last")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] flex items-center justify-center text-xs font-bold text-background">
                            {(u.username || u.email || "?").slice(0, 1).toUpperCase()}
                          </span>
                          <span className="font-medium">{u.username || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{u.email}</td>
                      <td className="px-6 py-4 text-right font-mono text-gradient-gold">
                        {u.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {u.roles.map((r) => (
                            <span
                              key={r}
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                                r === "admin"
                                  ? "bg-[oklch(0.7_0.2_240)/0.15] text-[oklch(0.85_0.15_240)] border border-[oklch(0.7_0.2_240)/0.3]"
                                  : "bg-white/5 text-muted-foreground border border-white/10"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {new Date(u.created_at).toLocaleString(localeTag)}
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString(localeTag) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
