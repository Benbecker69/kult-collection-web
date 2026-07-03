"use client";

import { useState } from "react";
import Link from "next/link";
import {
  required,
  validEmail,
  validPhone,
  validSiret,
  validVat,
  isClean,
} from "@/lib/validation";

const base =
  "w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-ink placeholder-ink/40 outline-none transition-colors";
const cls = (bad?: string | null | false) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-ink/15 focus:border-clay"}`;

const sectors = ["Concept store", "Hôtellerie & spa", "Grand magasin", "Autre"];

export default function InscriptionPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    company: "",
    siret: "",
    tva: "",
    sector: "Concept store",
    name: "",
    phone: "",
    email: "",
    cgv: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const e1 = {
    company: required(form.company, "La raison sociale"),
    siret: validSiret(form.siret),
    tva: validVat(form.tva),
  };
  const e2 = {
    name: required(form.name, "Le nom"),
    email: validEmail(form.email),
    phone: validPhone(form.phone),
    cgv: form.cgv ? null : "Vous devez accepter les CGV pro.",
  };

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  function next() {
    setTouched((t) => ({ ...t, company: true, siret: true, tva: true }));
    if (isClean(e1)) setStep(2);
  }
  function submit() {
    setTouched((t) => ({
      ...t,
      name: true,
      email: true,
      phone: true,
      cgv: true,
    }));
    if (isClean(e2)) setStep(3);
  }

  const ErrMsg = ({ show }: { show?: string | null }) =>
    show ? <p className="mt-1 text-xs text-red-500">{show}</p> : null;

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
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
              Créer un compte professionnel
            </h1>
          </div>

          <div className="mb-8 flex items-center gap-3 text-sm">
            <span className={step >= 1 ? "font-medium text-clay" : "text-ink/40"}>
              1 · Société
            </span>
            <span className="h-px flex-1 bg-ink/10" />
            <span className={step >= 2 ? "font-medium text-clay" : "text-ink/40"}>
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
            <input
              className={cls(touched.company && e1.company)}
              placeholder="Maison Léa"
              maxLength={80}
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              onBlur={() => touch("company")}
            />
            <ErrMsg show={touched.company ? e1.company : null} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-ink/70">SIRET</label>
              <input
                className={cls(touched.siret && e1.siret)}
                placeholder="123 456 789 00012"
                inputMode="numeric"
                maxLength={17}
                value={form.siret}
                onChange={(e) => set("siret", e.target.value)}
                onBlur={() => touch("siret")}
              />
              <ErrMsg show={touched.siret ? e1.siret : null} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink/70">
                N° TVA (optionnel)
              </label>
              <input
                className={cls(touched.tva && e1.tva)}
                placeholder="FR 00 123456789"
                maxLength={15}
                value={form.tva}
                onChange={(e) => set("tva", e.target.value)}
                onBlur={() => touch("tva")}
              />
              <ErrMsg show={touched.tva ? e1.tva : null} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              Secteur d&apos;activité
            </label>
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
          <button
            onClick={next}
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
              <input
                className={cls(touched.name && e2.name)}
                placeholder="Léa Martin"
                maxLength={60}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => touch("name")}
              />
              <ErrMsg show={touched.name ? e2.name : null} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-ink/70">Téléphone</label>
              <input
                className={cls(touched.phone && e2.phone)}
                placeholder="06 12 34 56 78"
                inputMode="tel"
                maxLength={14}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => touch("phone")}
              />
              <ErrMsg show={touched.phone ? e2.phone : null} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              E-mail professionnel
            </label>
            <input
              className={cls(touched.email && e2.email)}
              placeholder="lea@maison-lea.fr"
              maxLength={120}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
            />
            <ErrMsg show={touched.email ? e2.email : null} />
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input
                type="checkbox"
                className="mt-1 accent-clay"
                checked={form.cgv}
                onChange={(e) => set("cgv", e.target.checked)}
              />
              <span>J&apos;accepte les conditions générales de vente pro.</span>
            </label>
            <ErrMsg show={touched.cgv ? e2.cgv : null} />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors hover:border-ink/40"
            >
              ← Retour
            </button>
            <button
              onClick={submit}
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
          <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
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
