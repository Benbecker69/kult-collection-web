import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/b2b/reveal";
import { DevisForm } from "@/components/b2b/devis-form";
import { BrandLogo } from "@/components/b2b/brand-logo";

const stats = [
  { value: "30+", label: "pays de distribution" },
  { value: "50+", label: "produits artisanaux" },
  { value: "−40%", label: "tarifs revendeurs" },
  { value: "48h", label: "validation de compte" },
];

const secteurs = [
  {
    title: "Concept stores",
    text: "Des pièces qui racontent une histoire et se démarquent en linéaire.",
  },
  {
    title: "Hôtellerie & spa",
    text: "Bougies et diffuseurs pour signer une ambiance sensorielle unique.",
  },
  {
    title: "Grands magasins",
    text: "Une marque lifestyle en pleine croissance, déjà chez Monoprix.",
  },
];

const services = [
  "Tarifs dégressifs réservés aux professionnels",
  "Minimum de commande accessible, dès 150 € HT",
  "Réassort rapide depuis votre espace",
  "Suivi de commande et de livraison en temps réel",
];

const steps = [
  { n: "01", t: "Créez votre compte", d: "Renseignez votre société, on valide sous 48h." },
  { n: "02", t: "Commandez en ligne", d: "Catalogue pro, tarifs remisés, panier dédié." },
  { n: "03", t: "Suivez la commande", d: "Statut en temps réel, jusqu'à l'expédition." },
  { n: "04", t: "Recevez & réassortez", d: "Suivi de livraison, réassort en un clic." },
];

export default function EntreprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.25em] text-clay">
              KULT · Professionnels
            </p>
            <h1 className="mt-6 font-display text-5xl font-light leading-[1.03] text-ink md:text-7xl">
              Revendez l&apos;art
              <br />
              de vivre <span className="italic text-clay">KULT</span>.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/60">
              Bougies, parfums d&apos;intérieur et céramique faits main. Un
              espace revendeur pour commander simplement et suivre chaque
              commande, jusqu&apos;à la livraison.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/entreprise/inscription"
                className="rounded-full bg-clay px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-clayDark"
              >
                Créer un compte pro
              </Link>
              <Link
                href="#devis"
                className="border-b border-ink/30 pb-1 text-sm text-ink transition-colors hover:border-ink"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-sand">
                <div className="grid aspect-4/5 place-items-center p-10">
                  <Image
                    src="/images/products/carafe.png"
                    alt="Céramique KULT"
                    width={280}
                    height={280}
                    className="drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
              <div className="absolute left-4 top-4">
                <BrandLogo showPro={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-ink/10 bg-sand/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4 md:divide-x md:divide-ink/10">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-10 text-center md:px-6">
              <p className="font-display text-4xl font-light text-ink md:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-ink/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Secteurs */}
      <section id="secteurs" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-clay">
              Secteurs
            </p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink md:text-5xl">
              Pensé pour les professionnels de l&apos;art de vivre
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {secteurs.map((s, i) => (
            <div key={s.title} className="bg-cream p-8">
              <p className="font-display text-2xl font-light text-clay/60">
                0{i + 1}
              </p>
              <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-ink/10 bg-sand/40">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-clay">
              Services
            </p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink md:text-5xl">
              Tout ce qu&apos;il faut pour revendre sereinement
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/60">
              Un compte revendeur complet, des conditions claires et un suivi de
              bout en bout — sans jamais quitter votre espace.
            </p>
          </Reveal>
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {services.map((s) => (
              <div key={s} className="flex items-baseline gap-4 py-5">
                <span className="font-display text-lg leading-none text-clay">
                  —
                </span>
                <span className="text-ink/80">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-light text-ink md:text-5xl">
          Comment ça marche
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-cream p-7">
              <p className="font-display text-3xl font-light text-clay/40">
                {s.n}
              </p>
              <h3 className="mt-5 font-medium text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 rounded-2xl bg-ink px-8 py-14 text-cream md:grid-cols-2 md:px-14 md:py-16">
          <div>
            <h2 className="font-display text-4xl font-light md:text-5xl">
              Un projet ? Demandez un devis
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-cream/60">
              Dites-nous en quelques mots votre besoin, notre équipe pro vous
              recontacte rapidement.
            </p>
            <p className="mt-8 text-sm text-cream/40">
              Ou créez directement votre compte revendeur pour commander en
              ligne.
            </p>
          </div>
          <DevisForm />
        </div>
      </section>
    </>
  );
}
