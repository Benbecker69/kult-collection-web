"use client";

import { useEffect, useState } from "react";

/**
 * Renvoie `false` au premier rendu (serveur + hydratation), puis `true` après
 * montage. Permet d'afficher les données issues d'un store persistant
 * (localStorage) sans provoquer d'erreur d'hydratation.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
