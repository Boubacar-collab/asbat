import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { materials } from "@/lib/data";

export const metadata = {
  title: "Matériaux & Équipements",
};

const equipment = [
  { name: "Pelleteuse", desc: "Location journalière ou mensuelle" },
  { name: "Bétonnière", desc: "Capacités 350L à 500L" },
  { name: "Échafaudage", desc: "Montage et démontage inclus" },
  { name: "Groupe électrogène", desc: "Puissances 5 à 100 kVA" },
  { name: "Niveleuse laser", desc: "Précision pour terrassement" },
  { name: "Compresseur & outillage", desc: "Perforation et finition" },
];

export default function MateriauxPage() {
  return (
    <>
      <PageHeader
        badge="Catalogue"
        title="Matériaux & équipements de chantier"
        subtitle="Tout le nécessaire pour construire : matériaux en vente et matériel en location ou à l'achat."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-asbat-black">Matériaux de construction</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((item) => (
              <div
                key={item.name}
                className="card-hover overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
              >
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="rounded-full bg-asbat-green/10 px-3 py-1 text-xs font-semibold text-asbat-green-dark">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-asbat-black">{item.name}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-asbat-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-white">Équipements disponibles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-asbat-green/50"
              >
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-zinc-400">
            Besoin d&apos;un devis pour vos matériaux ou la location d&apos;équipement ?{" "}
            <Link href="/contact" className="font-semibold text-asbat-green-light hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
