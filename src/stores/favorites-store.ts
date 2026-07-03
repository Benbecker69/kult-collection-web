import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  slugs: string[];
  toggle: (slug: string) => void;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) =>
        set((s) => ({
          slugs: s.slugs.includes(slug)
            ? s.slugs.filter((x) => x !== slug)
            : [...s.slugs, slug],
        })),
      clear: () => set({ slugs: [] }),
    }),
    { name: "kult-b2b-favorites" },
  ),
);
