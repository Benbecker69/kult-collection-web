"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { required, validEmail, isClean } from "@/lib/validation";
import { useAuth, DEMO_EMAIL, DEMO_PASSWORD } from "@/stores/auth-store";

const base =
  "w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-ink placeholder-ink/40 outline-none transition-colors";
const cls = (bad?: string | null) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-ink/15 focus:border-clay"}`;

export default function ConnexionPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  const errs = {
    email: validEmail(form.email),
    password: required(form.password, "Le mot de passe"),
  };
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: keyof typeof errs) => (touched[k] ? errs[k] : null);

  function doLogin() {
    setTouched({ email: true, password: true });
    setAuthError(null);
    if (!isClean(errs)) return;
    const ok = login(form.email, form.password);
    if (!ok) {
      setAuthError("Identifiants incorrects. Vérifiez l'e-mail et le mot de passe.");
      return;
    }
    router.push("/compte/entreprise");
  }

  function useDemo() {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setTouched({});
    setAuthError(null);
  }

  const ErrMsg = ({ show }: { show?: string | null }) =>
    show ? <p className="mt-1 text-xs text-red-500">{show}</p> : null;

  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-20 md:py-28">
      <div className="animate-fade-up rounded-3xl border border-ink/10 bg-white/60 p-8 md:p-10">
        <h1 className="text-center font-display text-3xl font-semibold text-ink">
          Connexion
        </h1>
        <p className="mt-2 text-center text-sm text-ink/50">
          Accédez à votre espace revendeur.
        </p>

        {/* Compte de démonstration */}
        <div className="mt-6 rounded-xl bg-sky/60 px-4 py-3 text-xs text-ink/70">
          <p className="font-medium text-ink">Compte de démonstration</p>
          <p className="mt-0.5">
            {DEMO_EMAIL} · {DEMO_PASSWORD}
          </p>
          <button
            onClick={useDemo}
            className="mt-1 font-medium text-clay hover:underline"
          >
            Remplir automatiquement
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-ink/70">E-mail</label>
            <input
              className={cls(showErr("email"))}
              placeholder="demo@kult.fr"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
            />
            <ErrMsg show={showErr("email")} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              Mot de passe
            </label>
            <input
              type="password"
              className={cls(showErr("password"))}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              onBlur={() => touch("password")}
            />
            <ErrMsg show={showErr("password")} />
            <div className="mt-1 text-right">
              <span className="cursor-pointer text-xs text-ink/40 hover:text-ink/70">
                Mot de passe oublié ?
              </span>
            </div>
          </div>

          {authError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {authError}
            </p>
          )}

          <button
            onClick={doLogin}
            className="block w-full rounded-full bg-clay px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Se connecter
          </button>
        </div>

        <div className="mt-6 border-t border-ink/10 pt-6 text-center text-sm text-ink/60">
          Pas encore de compte pro ?{" "}
          <Link href="/entreprise/inscription" className="text-clay hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </section>
  );
}
