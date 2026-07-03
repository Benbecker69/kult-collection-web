"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-clay";

export default function InscriptionPage() {
  // 1 = société, 2 = contact, 3 = confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <section className="mx-auto max-w-xl px-6 py-16 md:py-24">
      {step !== 3 && (
        <>
          <div className="mb-8">
            <Link
              href="/entreprise"
              className="text-sm text-ink/50 transition-colors hover:text-ink"
            >
              ← Retour
            </Link>
            <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Créer un compte professionnel
            </h1>
          </div>

          {/* Progression */}
          <div className="mb-8 flex items-center gap-3 text-sm">
            <span
              className={step >= 1 ? "font-medium text-clay" : "text-ink/40"}
            >
              1 · Société
            </span>
            <span className="h-px flex-1 bg-ink/10" />
            <span
              className={step >= 2 ? "font-medium text-clay" : "text-ink/40"}
            >
              2 · Contact
            </span>
          </div>
        </>
      )}

      {step === 1 && (
        <div key="step1" className="animate-fade-up space-y-4">
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              Raison sociale
            </label>
            <input className={inputClass} placeholder="Maison Léa" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-ink/70">SIRET</label>
              <input className={inputClass} placeholder="123 456 789 00012" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink/70">
                N° TVA (optionnel)
              </label>
              <input className={inputClass} placeholder="FR 00 123456789" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              Secteur d&apos;activité
            </label>
            <select className={inputClass}>
              <option>Concept store</option>
              <option>Hôtellerie & spa</option>
              <option>Grand magasin</option>
              <option>Autre</option>
            </select>
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-2 w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Continuer →
          </button>
        </div>
      )}

      {step === 2 && (
        <div key="step2" className="animate-fade-up space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-ink/70">
                Nom / Prénom
              </label>
              <input className={inputClass} placeholder="Léa Martin" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink/70">Téléphone</label>
              <input className={inputClass} placeholder="06 12 34 56 78" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              E-mail professionnel
            </label>
            <input className={inputClass} placeholder="lea@maison-lea.fr" />
          </div>
          <label className="flex items-start gap-3 text-sm text-ink/70">
            <input type="checkbox" className="mt-1 accent-clay" />
            <span>J&apos;accepte les conditions générales de vente pro.</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors hover:border-ink/40"
            >
              ← Retour
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
            >
              Envoyer ma demande
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          key="step3"
          className="animate-fade-up rounded-3xl border border-ink/10 bg-white/60 p-10 text-center"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-clay text-2xl text-cream">
            ✓
          </div>
          <h1 className="mt-6 font-display text-3xl text-ink">
            Demande envoyée
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-ink/60">
            Votre compte pro est en attente de validation par l&apos;équipe KULT.
            Vous recevrez un e-mail dès son activation (sous 24–48 h ouvrées).
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/entreprise"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors hover:border-ink/40"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/connexion"
              className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
            >
              Aller à la connexion
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
