"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { required, validEmail, isClean } from "@/lib/validation";

const base =
  "w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-ink placeholder-ink/40 outline-none transition-colors";
const cls = (bad?: string | null) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-ink/15 focus:border-clay"}`;

export default function ConnexionPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errs = {
    email: validEmail(form.email),
    password: required(form.password, "Le mot de passe"),
  };
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: keyof typeof errs) => (touched[k] ? errs[k] : null);

  function login() {
    setTouched({ email: true, password: true });
    if (!isClean(errs)) return;
    router.push("/compte/entreprise");
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

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-ink/70">E-mail</label>
            <input
              className={cls(showErr("email"))}
              placeholder="lea@maison-lea.fr"
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

          <button
            onClick={login}
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
