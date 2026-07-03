"use client";

import { useState } from "react";
import { useToasts } from "@/stores/toast-store";

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none focus:border-cream/40";

export function DevisForm() {
  const pushToast = useToasts((s) => s.push);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    need: "",
  });

  function submit() {
    pushToast("Votre demande de devis a bien été envoyée ✓");
    setForm({ name: "", company: "", email: "", need: "" });
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          className={inputClass}
          placeholder="Société"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        />
      </div>
      <input
        className={inputClass}
        placeholder="E-mail professionnel"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <textarea
        rows={3}
        className={inputClass}
        placeholder="Votre besoin"
        value={form.need}
        onChange={(e) => setForm((f) => ({ ...f, need: e.target.value }))}
      />
      <button
        onClick={submit}
        className="w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
      >
        Envoyer ma demande
      </button>
    </div>
  );
}
