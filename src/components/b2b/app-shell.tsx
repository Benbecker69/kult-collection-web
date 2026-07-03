"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav } from "./sidebar-nav";
import { Topbar } from "./topbar";
import { Toaster } from "./toaster";
import { useAuth } from "@/stores/auth-store";
import { useHydrated } from "@/lib/use-hydrated";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hydrated = useHydrated();
  const authed = useAuth((s) => s.authed);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !authed) router.replace("/connexion");
  }, [hydrated, authed, router]);

  // Tant que non hydraté ou non connecté : on n'affiche pas l'espace privé.
  if (!hydrated || !authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream text-sm text-ink/40">
        Chargement…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream font-sans text-ink">
      <aside className="hidden w-64 shrink-0 border-r border-ink/10 bg-sand/40 p-5 md:block">
        <SidebarNav />
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-cream p-5 shadow-xl">
            <SidebarNav onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onBurger={() => setMenuOpen(true)} />
        <main className="flex-1 p-5 md:p-10">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}
