"use client";

import { useState } from "react";
import { useAccount } from "@/stores/account-store";
import { useToasts } from "@/stores/toast-store";
import { useHydrated } from "@/lib/use-hydrated";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-clay";

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
  const [saved, setSaved] = useState(false);

  if (!hydrated) {
    return <div className="h-96 max-w-2xl animate-pulse rounded-2xl bg-sand/40" />;
  }

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function save() {
    store.update(form);
    setSaved(true);
    pushToast("Informations enregistrées");
    setTimeout(() => setSaved(false), 1600);
  }

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
                className={inputClass}
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-ink/70">SIRET</label>
                <input
                  className={inputClass}
                  value={form.siret}
                  onChange={(e) => set("siret", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">
                  Secteur
                </label>
                <select
                  className={inputClass}
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
                className={inputClass}
                value={form.contactName}
                onChange={(e) => set("contactName", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-ink/70">E-mail</label>
                <input
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-ink/70">
                  Téléphone
                </label>
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
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
