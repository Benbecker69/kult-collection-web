"use client";

import { useState } from "react";
import { useToasts } from "@/stores/toast-store";
import { required, validEmail, isClean } from "@/lib/validation";

const base =
  "w-full rounded-xl border bg-cream/5 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none transition-colors";
const cls = (bad?: string | null) =>
  `${base} ${bad ? "border-red-400 focus:border-red-400" : "border-cream/15 focus:border-cream/40"}`;

export function DevisForm() {
  const pushToast = useToasts((s) => s.push);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    need: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errs = {
    name: required(form.name, "Le nom"),
    company: required(form.company, "La société"),
    email: validEmail(form.email),
    need: required(form.need, "Le besoin"),
  };
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: keyof typeof errs) => (touched[k] ? errs[k] : null);

  function submit() {
    setTouched({ name: true, company: true, email: true, need: true });
    if (!isClean(errs)) return;
    pushToast("Votre demande de devis a bien été envoyée ✓");
    setForm({ name: "", company: "", email: "", need: "" });
    setTouched({});
  }

  const ErrMsg = ({ show }: { show?: string | null }) =>
    show ? <p className="mt-1 text-xs text-red-300">{show}</p> : null;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input
            className={cls(showErr("name"))}
            placeholder="Nom"
            maxLength={60}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => touch("name")}
          />
          <ErrMsg show={showErr("name")} />
        </div>
        <div>
          <input
            className={cls(showErr("company"))}
            placeholder="Société"
            maxLength={80}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            onBlur={() => touch("company")}
          />
          <ErrMsg show={showErr("company")} />
        </div>
      </div>
      <div>
        <input
          className={cls(showErr("email"))}
          placeholder="E-mail professionnel"
          maxLength={120}
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => touch("email")}
        />
        <ErrMsg show={showErr("email")} />
      </div>
      <div>
        <textarea
          rows={3}
          className={cls(showErr("need"))}
          placeholder="Votre besoin"
          maxLength={500}
          value={form.need}
          onChange={(e) => set("need", e.target.value)}
          onBlur={() => touch("need")}
        />
        <ErrMsg show={showErr("need")} />
      </div>
      <button
        onClick={submit}
        className="w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
      >
        Envoyer ma demande
      </button>
    </div>
  );
}
