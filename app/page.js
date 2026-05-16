import Link from "next/link";
import Image from "next/image";
import Stats from "@/components/Stats";
import { services } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="gradient-hero relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
          alt="Chantier de construction"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <span className="animate-fade-up mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-asbat-green-light/30 bg-asbat-green/20 px-4 py-1.5 text-sm font-medium text-asbat-green-light">
            <span className="h-2 w-2 rounded-full bg-asbat-green-light" />
            Leader en construction au Sénégal
          </span>
          <h1 className="animate-fade-up animation-delay-100 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white opacity-0 [animation-fill-mode:forwards] sm:text-6xl lg:text-7xl">
            Bâtir l&apos;avenir avec{" "}
            <span className="text-asbat-green-light">confiance</span>
          </h1>
          <p className="animate-fade-up animation-delay-200 mt-6 max-w-2xl text-lg text-zinc-300 opacity-0 [animation-fill-mode:forwards] sm:text-xl">
            ASBAT construit, vend des matériaux et équipements, conseille vos
            projets et conçoit vos plans d&apos;architecture.
          </p>
          <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap gap-4 opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="/contact"
              className="rounded-lg bg-asbat-green px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-asbat-green-light"
            >
              Demander un devis
            </Link>
            <Link
              href="/projets"
              className="rounded-lg border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Voir nos projets
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-asbat-black sm:text-4xl">
              Nos expertises
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
              Une offre complète pour accompagner chaque étape de votre projet,
              de la conception à la livraison.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="card-hover rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm"
              >
                <span className="text-4xl">{service.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-asbat-black">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-asbat-green hover:text-asbat-green-dark"
            >
              Tous nos services →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-asbat-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Pourquoi choisir ASBAT ?
              </h2>
              <p className="mt-4 text-zinc-400">
                Depuis plus de 15 ans, nous combinons expertise technique, matériaux
                de qualité et accompagnement personnalisé pour des réalisations
                durables.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Équipe qualifiée et certifiée",
                  "Matériaux et équipements en stock",
                  "Devis transparents et délais respectés",
                  "Plans d'architecture sur mesure",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-asbat-green text-xs text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/a-propos"
                className="mt-8 inline-block rounded-lg bg-asbat-green px-6 py-3 text-sm font-semibold text-white hover:bg-asbat-green-light"
              >
                En savoir plus
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Plans d'architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-asbat-black sm:text-4xl">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            Contactez-nous pour un devis gratuit et personnalisé.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-asbat-green px-10 py-4 text-sm font-semibold text-white transition hover:bg-asbat-green-dark"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
