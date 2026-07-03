export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/10 bg-cream px-6">
      <div className="font-display text-lg text-ink md:hidden">
        KULT <span className="text-clay">Pro</span>
      </div>
      <div className="hidden text-sm text-ink/50 md:block">Espace revendeur</div>
      <div className="flex items-center gap-3">
        <div className="text-right leading-tight">
          <p className="text-sm font-medium text-ink">Maison Léa</p>
          <p className="text-xs text-ink/40">Compte pro validé</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-clay text-sm font-medium text-cream">
          ML
        </div>
      </div>
    </header>
  );
}
