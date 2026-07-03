// Petits validateurs réutilisables — renvoient un message d'erreur (string)
// ou `null` si la valeur est valide.

export function required(value: string, label = "Ce champ"): string | null {
  return value.trim() ? null : `${label} est requis.`;
}

export function validEmail(value: string): string | null {
  if (!value.trim()) return "L'e-mail est requis.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ? null
    : "Format d'e-mail invalide (ex. nom@domaine.fr).";
}

export function validSiret(value: string): string | null {
  const digits = value.replace(/\s/g, "");
  if (!digits) return "Le SIRET est requis.";
  if (!/^\d+$/.test(digits))
    return "Le SIRET ne doit contenir que des chiffres.";
  if (digits.length !== 14)
    return `Le SIRET doit comporter 14 chiffres (actuellement ${digits.length}).`;
  return null;
}

export function validVat(value: string): string | null {
  const v = value.replace(/\s/g, "");
  if (!v) return null; // optionnel
  return /^FR[0-9A-Z]{2}\d{9}$/i.test(v)
    ? null
    : "N° de TVA invalide (ex. FR12345678901).";
}

export function validPhone(value: string): string | null {
  const digits = value.replace(/[\s.]/g, "");
  if (!digits) return "Le téléphone est requis.";
  return /^(?:\+33|0)\d{9}$/.test(digits)
    ? null
    : "Numéro de téléphone invalide (ex. 06 12 34 56 78).";
}

export function minLen(
  value: string,
  n: number,
  label = "Ce champ",
): string | null {
  if (!value) return `${label} est requis.`;
  return value.length >= n
    ? null
    : `${label} doit contenir au moins ${n} caractères.`;
}

/** true si l'objet d'erreurs ne contient que des valeurs nulles. */
export function isClean(errors: Record<string, string | null>): boolean {
  return Object.values(errors).every((e) => !e);
}
