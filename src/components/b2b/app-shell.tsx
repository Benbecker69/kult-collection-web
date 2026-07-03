"use client";

import { useState } from "react";
import { SidebarNav } from "./sidebar-nav";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream font-sans text-ink">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-ink/10 bg-sand/40 p-5 md:block">
        <SidebarNav />
      </aside>

      {/* Drawer mobile */}
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
    </div>
  );
}
