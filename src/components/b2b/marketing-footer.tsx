export function MarketingFooter() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-cream">KULT Collection</p>
          <p className="mt-2 max-w-xs text-sm text-cream/60">
            Maison d&apos;artisanat contemporain — bougies, parfums d&apos;intérieur
            & céramique. L&apos;art de vivre californien et méditerranéen.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-widest text-cream/40">
            Espace Pro
          </p>
          <ul className="space-y-2 text-cream/70">
            <li>Créer un compte revendeur</li>
            <li>Commander en ligne</li>
            <li>Suivi de commande & livraison</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-widest text-cream/40">
            Contact pro
          </p>
          <p className="text-cream/70">pro@kultcollection.com</p>
          <p className="text-cream/70">Atelier — Paris 20ᵉ</p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/40">
        © 2026 KULT Collection — Espace professionnel
      </div>
    </footer>
  );
}
