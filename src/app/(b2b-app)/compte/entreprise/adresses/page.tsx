"use client";

import { useState } from "react";
import { useAccount } from "@/stores/account-store";
import { useToasts } from "@/stores/toast-store";
import { useHydrated } from "@/lib/use-hydrated";
import { required, isClean } from "@/lib/validation";

const base =
  "w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-ink placeholder-ink/40 outline-none transition-colors";
const cls = (bad?: string | null) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-ink/15 focus:border-clay"}`;

export default function AdressesPage() {
  const hydrated = useHydrated();
  const addresses = useAccount((s) => s.addresses);
  const addAddress = useAccount((s) => s.addAddress);
  const removeAddress = useAccount((s) => s.removeAddress);
  const setDefault = useAccount((s) => s.setDefaultAddress);
  const pushToast = useToasts((s) => s.push);

  const [form, setForm] = useState({ label: "", line: "", city: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errs = {
    label: required(form.label, "Le libellé"),
    line: required(form.line, "L'adresse"),
    city: required(form.city, "La ville"),
  };
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: keyof typeof errs) => (touched[k] ? errs[k] : null);

  function add() {
    setTouched({ label: true, line: true, city: true });
    if (!isClean(errs)) return;
    addAddress(form);
    setForm({ label: "", line: "", city: "" });
    setTouched({});
    pushToast("Adresse ajoutée");
  }

  const ErrMsg = ({ show }: { show?: string | null }) =>
    show ? <p className="mt-1 text-xs text-red-500">{show}</p> : null;

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
                    onClick={() => {
                      setDefault(a.id);
                      pushToast("Adresse par défaut mise à jour", "info");
                    }}
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    Définir par défaut
                  </button>
                )}
                <button
                  onClick={() => {
                    removeAddress(a.id);
                    pushToast("Adresse supprimée", "info");
                  }}
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

      <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white/40 p-5">
        <p className="mb-3 text-xs uppercase tracking-widest text-ink/40">
          Ajouter une adresse
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <input
              className={cls(showErr("label"))}
              placeholder="Libellé (ex. Boutique)"
              maxLength={40}
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              onBlur={() => touch("label")}
            />
            <ErrMsg show={showErr("label")} />
          </div>
          <div>
            <input
              className={cls(showErr("line"))}
              placeholder="Adresse"
              maxLength={80}
              value={form.line}
              onChange={(e) => set("line", e.target.value)}
              onBlur={() => touch("line")}
            />
            <ErrMsg show={showErr("line")} />
          </div>
          <div>
            <input
              className={cls(showErr("city"))}
              placeholder="Code postal & ville"
              maxLength={60}
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              onBlur={() => touch("city")}
            />
            <ErrMsg show={showErr("city")} />
          </div>
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
