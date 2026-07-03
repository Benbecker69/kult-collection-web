import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-clay";

export default function ConnexionPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-20 md:py-28">
      <div className="animate-fade-up rounded-3xl border border-ink/10 bg-white/60 p-8 md:p-10">
        <h1 className="text-center font-display text-3xl text-ink">Connexion</h1>
        <p className="mt-2 text-center text-sm text-ink/50">
          Accédez à votre espace revendeur.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-ink/70">E-mail</label>
            <input className={inputClass} placeholder="lea@maison-lea.fr" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-ink/70">
              Mot de passe
            </label>
            <input
              type="password"
              className={inputClass}
              placeholder="••••••••"
            />
            <div className="mt-1 text-right">
              <span className="cursor-pointer text-xs text-ink/40 hover:text-ink/70">
                Mot de passe oublié ?
              </span>
            </div>
          </div>

          <Link
            href="/compte/entreprise"
            className="block rounded-full bg-clay px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-clayDark"
          >
            Se connecter
          </Link>
        </div>

        <div className="mt-6 border-t border-ink/10 pt-6 text-center text-sm text-ink/60">
          Pas encore de compte pro ?{" "}
          <Link href="/entreprise/inscription" className="text-clay hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </section>
  );
}
