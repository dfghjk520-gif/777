import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Sparkles, User as UserIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Seven77" },
      { name: "description", content: "Sign in or sign up to join the Seven77 daily lottery." },
    ],
  }),
  component: LoginPage,
});

type Mode = "signin" | "signup";

function LoginPage() {
  const { t } = useT();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/play" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === "signup") {
        if (username.trim().length < 2) {
          toast.error(t("login.errUsername"));
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/play`,
            data: { username: username.trim() },
          },
        });
        if (error) {
          if (error.message.includes("already")) toast.error(t("login.errExists"));
          else toast.error(error.message);
          return;
        }
        toast.success(t("login.successSignUp"));
        navigate({ to: "/play" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast.error(t("login.errCred"));
          return;
        }
        toast.success(t("login.welcome"));
        navigate({ to: "/play" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 pt-16 pb-20">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.13_95)] to-[oklch(0.7_0.2_240)] glow-gold">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">
            {mode === "signin" ? t("login.welcomeBack") : t("login.create")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin" ? t("login.descSignIn") : t("login.descSignUp")}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 glass rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`h-9 rounded-full text-sm font-medium transition-colors ${mode === "signin" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("login.tabSignIn")}
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`h-9 rounded-full text-sm font-medium transition-colors ${mode === "signup" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t("login.tabSignUp")}
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 glass-strong rounded-3xl p-6 space-y-4">
          {mode === "signup" && (
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("login.username")}</span>
              <div className="mt-1.5 relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("login.usernamePh")}
                  maxLength={32}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.18_240)] focus:border-transparent transition"
                />
              </div>
            </label>
          )}

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("login.email")}</span>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@seven77.app"
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.18_240)] focus:border-transparent transition"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t("login.password")}</span>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("login.passwordPh")}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.18_240)] focus:border-transparent transition"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.95_0.13_95)] to-[oklch(0.78_0.18_70)] font-semibold text-primary-foreground glow-gold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? t("login.submitSignIn") : t("login.submitSignUp")}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "signin" ? (
              <>{t("login.noAcc")}<button type="button" onClick={() => setMode("signup")} className="text-foreground underline underline-offset-4">{t("login.signUpNow")}</button></>
            ) : (
              <>{t("login.hasAcc")}<button type="button" onClick={() => setMode("signin")} className="text-foreground underline underline-offset-4">{t("login.goSignIn")}</button></>
            )}
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("login.backHome")} <Link to="/" className="text-foreground underline underline-offset-4">{t("login.home")}</Link>
        </p>
      </section>
    </PageShell>
  );
}
