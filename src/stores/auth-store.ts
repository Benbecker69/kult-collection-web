import { create } from "zustand";
import { persist } from "zustand/middleware";

// Compte de démonstration (prototype — aucune vérification serveur).
export const DEMO_EMAIL = "demo@kult.fr";
export const DEMO_PASSWORD = "kult1234";

interface AuthState {
  authed: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      authed: false,
      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
        if (ok) set({ authed: true });
        return ok;
      },
      logout: () => set({ authed: false }),
    }),
    { name: "kult-b2b-auth" },
  ),
);
