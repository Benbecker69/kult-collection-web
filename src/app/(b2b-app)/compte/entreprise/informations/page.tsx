"use client";

import { useState } from "react";
import { useAccount } from "@/stores/account-store";
import { useToasts } from "@/stores/toast-store";
import { useHydrated } from "@/lib/use-hydrated";
import { required, validEmail, validPhone, validSiret, isClean } from "@/lib/validation";

const base =
  "w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors";
const cls = (bad?: string | null) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-ink/15 focus:border-clay"}`;

const sectors = ["Concept store", "Hôtellerie & spa", "Grand magasin", "Autre"];

export default function InformationsPage() {
  const hydrated = useHydrated();
  const store = useAccount();
  const pushToast = useToasts((s) => s.push);
  const [form, setForm] = useState(() => ({
    company: store.company,
    siret: store.siret,
    sector: store.sector,
    contactName: store.contactName,
    email: store.email,
    phone: store.phone,
  }));
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  if (!hydrated) {
    return <div className="h-96 max-w-2xl animate-pulse rounded-2xl bg-sand/40" />;
  }

  const errs = {
    company: required(form.company, "La raison sociale"),
    siret: validSiret(form.siret),
    contactName: required(form.contactName, "Le nom"),
    email: validEmail(form.email),
    phone: validPhone(form.phone),
  };

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: keyof typeof errs) => (touched[k] ? errs[k] : null);

  function save() {
    setTouched({
      company: true,
      siret: true,
      contactName: true,
      email: true,
      phone: true,
    });
    if (!isClean(errs)) {
      pushToast("Veuillez corriger les champs en erreur", "info");
      return;
    }
    store.update(form);
    setSaved(true);
    pushToast("Informations enregistrées");
    setTimeout(() => setSaved(false), 1600);
  }

  const ErrMsg = ({ show }: { show?: string | null }) =>
    show ? <p className="mt-1 text-xs text-red-500">{show}</p> : null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="animate-fade-up font-display text-3xl font-semibold text-ink">
        Mes informations
      </h1>
      <p className="mt-1 text-ink/50">
        Ces informations figurent sur vos devis et commandes.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-ink/10 bg-white/60 p-6">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-ink/40">
            Société
          </p>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-ink/70">
                Raison sociale
              </label>
              <input
                className={cls(showErr("company"))}
                maxLength={80}
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                onBlur={() => touch("company")}
              />
              <ErrMsg show={showErr("company")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-ink/70">SIRET</label>
                <input
                  className={cls(showErr("siret"))}
                  inputMode="numeric"
                  maxLength={17}
                  value={form.siret}
                  onChange={(e) => set("siret", e.target.value)}
                  onBlur={() => touch("siret")}
                />
                <ErrMsg show={showErr("siret")} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">Secteur</label>
                <select
                  className={cls()}
                  value={form.sector}
                  onChange={(e) => set("sector", e.target.value)}
                >
                  {sectors.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ink/10 pt-6">
          <p className="mb-3 text-xs uppercase tracking-widest text-ink/40">
            Contact
          </p>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-ink/70">
                Nom / Prénom
              </label>
              <input
                className={cls(showErr("contactName"))}
                maxLength={60}
                value={form.contactName}
                onChange={(e) => set("contactName", e.target.value)}
                onBlur={() => touch("contactName")}
              />
              <ErrMsg show={showErr("contactName")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-ink/70">E-mail</label>
                <input
                  className={cls(showErr("email"))}
                  maxLength={120}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("email")}
                />
                <ErrMsg show={showErr("email")} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">
                  Téléphone
                </label>
                <input
                  className={cls(showErr("phone"))}
                  inputMode="tel"
                  maxLength={14}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => touch("phone")}
                />
                <ErrMsg show={showErr("phone")} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-ink/10 pt-6">
          <button
            onClick={save}
            className="rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Enregistrer
          </button>
          {saved && (
            <span className="text-sm text-olive">Modifications enregistrées ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
