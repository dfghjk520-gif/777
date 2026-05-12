import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { getAdminUsers } from "@/lib/admin.functions";
import { Loader2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "管理員後台 · Seven77" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const fetchUsers = useServerFn(getAdminUsers);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) throw new Error("請重新登入管理員帳號");
      return fetchUsers({ data: { accessToken } });
    },
    retry: false,
  });

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold">
            <ShieldCheck className="h-5 w-5 text-background" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">管理員後台</h1>
            <p className="text-sm text-muted-foreground mt-1">查看所有用戶帳號、暱稱與點數餘額</p>
          </div>
        </div>

        {isLoading && (
          <div className="glass-strong rounded-3xl p-12 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> 載入中…
          </div>
        )}

        {error && (
          <div className="glass-strong rounded-3xl p-8 text-center">
            <p className="text-sm text-destructive font-medium">
              {String((error as Error).message ?? error)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              你需要管理員權限才能查看此頁面。請聯繫系統管理員。
            </p>
            <Link to="/" className="inline-block mt-4 text-sm underline underline-offset-4">
              返回首頁
            </Link>
          </div>
        )}

        {data && (
          <div className="glass-strong rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                共 <span className="text-foreground font-semibold">{data.users.length}</span> 位用戶
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                總餘額 {data.users.reduce((s, u) => s + u.balance, 0).toLocaleString()} pts
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 font-medium">暱稱</th>
                    <th className="text-left px-6 py-3 font-medium">電子郵件</th>
                    <th className="text-right px-6 py-3 font-medium">點數餘額</th>
                    <th className="text-left px-6 py-3 font-medium">角色</th>
                    <th className="text-left px-6 py-3 font-medium">註冊時間</th>
                    <th className="text-left px-6 py-3 font-medium">最後登入</th>
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
                        {new Date(u.created_at).toLocaleString("zh-Hant")}
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString("zh-Hant") : "—"}
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
