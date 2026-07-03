"use client";

import { useState } from "react";
import { useAccount } from "@/stores/account-store";
import { useHydrated } from "@/lib/use-hydrated";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-clay";

export default function AdressesPage() {
  const hydrated = useHydrated();
  const addresses = useAccount((s) => s.addresses);
  const addAddress = useAccount((s) => s.addAddress);
  const removeAddress = useAccount((s) => s.removeAddress);
  const setDefault = useAccount((s) => s.setDefaultAddress);

  const [form, setForm] = useState({ label: "", line: "", city: "" });

  function add() {
    if (!form.label || !form.line || !form.city) return;
    addAddress(form);
    setForm({ label: "", line: "", city: "" });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="animate-fade-up font-display text-3xl font-semibold text-ink">
        Mes adresses
      </h1>
      <p className="mt-1 text-ink/50">
        Gérez vos adresses de livraison et de facturation.
      </p>

      {!hydrated ? (
        <div className="mt-8 h-40 animate-pulse rounded-2xl bg-sand/40" />
      ) : (
        <div className="mt-8 space-y-3">
          {addresses.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white/60 p-5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink">{a.label}</p>
                  {a.isDefault && (
                    <span className="rounded-full bg-clay/10 px-2 py-0.5 text-xs text-clayDark">
                      Par défaut
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/60">
                  {a.line}, {a.city}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {!a.isDefault && (
                  <button
                    onClick={() => setDefault(a.id)}
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    Définir par défaut
                  </button>
                )}
                <button
                  onClick={() => removeAddress(a.id)}
                  className="text-ink/40 transition-colors hover:text-clay"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {addresses.length === 0 && (
            <p className="text-sm text-ink/50">Aucune adresse enregistrée.</p>
          )}
        </div>
      )}

      {/* Ajouter une adresse */}
      <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white/40 p-5">
        <p className="mb-3 text-xs uppercase tracking-widest text-ink/40">
          Ajouter une adresse
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className={inputClass}
            placeholder="Libellé (ex. Boutique)"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Adresse"
            value={form.line}
            onChange={(e) => setForm((f) => ({ ...f, line: e.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Code postal & ville"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
          />
        </div>
        <button
          onClick={add}
          className="mt-3 rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
