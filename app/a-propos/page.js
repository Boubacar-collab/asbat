import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { values } from "@/lib/data";
import { images } from "@/lib/images";

export const metadata = {
  title: "À propos",
};

export default function AProposPage() {
  return (
    <>
      <PageHeader
        badge="Notre histoire"
        title="À propos d'ASBAT"
        subtitle="Une entreprise sénégalaise engagée dans la construction durable et l'excellence technique."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={images.chantierFondations}
                alt="Équipe ASBAT sur chantier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-asbat-black sm:text-3xl">
                Construire avec passion depuis 2010
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-600">
                ASBAT est née de la volonté d&apos;offrir au Sénégal une entreprise de
                construction complète : nous bâtissons, vendons les matériaux et
                équipements nécessaires, conseillons nos clients et dessinons leurs
                plans d&apos;architecture.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-600">
                Notre équipe pluridisciplinaire réunit ingénieurs, architectes,
                conducteurs de travaux et techniciens qualifiés. Chaque projet est
                traité avec le même niveau d&apos;exigence, qu&apos;il s&apos;agisse d&apos;une villa
                familiale ou d&apos;un complexe industriel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-asbat-off-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold text-asbat-black sm:text-3xl">
            Nos valeurs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-asbat-green text-xl text-white">
                  ★
                </div>
                <h3 className="font-semibold text-asbat-black">{value.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-asbat-black">Rejoignez nos clients satisfaits</h2>
          <p className="mt-4 text-zinc-600">
            Faites confiance à une équipe locale qui connaît le terrain et les normes
            en vigueur.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-asbat-green px-8 py-3.5 text-sm font-semibold text-white hover:bg-asbat-green-light"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
