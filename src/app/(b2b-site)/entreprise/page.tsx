import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/b2b/reveal";
import { DevisForm } from "@/components/b2b/devis-form";

const stats = [
  { value: "30+", label: "pays de distribution" },
  { value: "50+", label: "produits artisanaux" },
  { value: "-40%", label: "tarifs revendeurs" },
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
  "Minimum de commande accessible (dès 150 € HT)",
  "Réassort rapide depuis votre espace",
  "Suivi de commande et de livraison en temps réel",
];

const steps = [
  { n: "01", t: "Créez votre compte", d: "Renseignez votre société, on valide sous 48h." },
  { n: "02", t: "Commandez en ligne", d: "Catalogue pro, tarifs remisés, panier dédié." },
  { n: "03", t: "Suivez la commande", d: "Statut en temps réel, de la validation à l'expédition." },
  { n: "04", t: "Recevez & réassortez", d: "Suivi de livraison jusqu'à réception, réassort en un clic." },
];

export default function EntreprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 90% at 85% 0%, rgba(255,213,229,0.6) 0%, rgba(252,244,230,0) 60%), radial-gradient(90% 80% at 0% 100%, rgba(17,85,204,0.12) 0%, rgba(252,244,230,0) 55%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-clayDark">
              Espace professionnel
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink md:text-6xl">
              Revendez l&apos;art de vivre KULT
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Bougies, parfums d&apos;intérieur et céramique faits main. Un espace
              revendeur pensé pour commander simplement et suivre chaque commande,
              jusqu&apos;à la livraison.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/entreprise/inscription"
                className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-clayDark hover:shadow-md"
              >
                Créer un compte pro
              </Link>
              <Link
                href="#devis"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="relative mx-auto aspect-4/5 w-full max-w-sm">
              <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-blush" />
              <div className="absolute inset-0 -rotate-2 rounded-[2rem] bg-sand" />
              <div className="absolute inset-0 grid place-items-center rounded-[2rem] bg-gradient-to-br from-cream to-sand shadow-xl">
                <Image
                  src="/images/products/carafe.png"
                  alt="Céramique KULT"
                  width={260}
                  height={260}
                  className="animate-float drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink/10 bg-sand/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-display text-3xl text-clay md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Secteurs */}
      <section id="secteurs" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-clay">Secteurs</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl text-ink md:text-4xl">
            Pensé pour les professionnels de l&apos;art de vivre
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {secteurs.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-ink/10 bg-white/60 p-7 transition-all hover:-translate-y-1 hover:border-clay/30 hover:shadow-lg">
                <div className="mb-5 h-10 w-10 rounded-xl bg-clay/10 transition-colors group-hover:bg-clay/20" />
                <h3 className="font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-ink/[0.03]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-clay">Services</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
              Tout ce qu&apos;il faut pour revendre sereinement
            </h2>
            <p className="mt-4 max-w-md text-ink/60">
              Un compte revendeur complet, des conditions claires et un suivi de
              bout en bout — sans jamais quitter votre espace.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-4">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-xl bg-white/60 px-5 py-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-clay text-[11px] text-cream">
                    ✓
                  </span>
                  <span className="text-ink/80">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-center font-display text-3xl text-ink md:text-4xl">
            Comment ça marche
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white/50 p-6">
                <p className="font-display text-3xl text-clay/40">{s.n}</p>
                <h3 className="mt-3 font-medium text-ink">{s.t}</h3>
                <p className="mt-1 text-sm text-ink/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Devis CTA */}
      <section id="devis" className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-ink px-8 py-12 text-cream md:px-14 md:py-16">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">
                  Un projet ? Demandez un devis
                </h2>
                <p className="mt-4 max-w-sm text-cream/70">
                  Dites-nous en quelques mots votre besoin, notre équipe pro vous
                  recontacte rapidement.
                </p>
                <p className="mt-6 text-sm text-cream/50">
                  Ou créez directement votre compte revendeur pour commander en
                  ligne.
                </p>
              </div>
              <DevisForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
