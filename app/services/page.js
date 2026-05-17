import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { images } from "@/lib/images";
import { getServices } from "@/lib/supabase/queries";

export const metadata = {
  title: "Services",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        badge="Nos services"
        title="Des solutions complètes pour vos chantiers"
        subtitle="Construction, matériaux, équipements, conseil technique et architecture — ASBAT couvre l'ensemble de vos besoins."
      />

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={images.maconnerie}
              alt="Équipe ASBAT en maçonnerie"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={images.renovation}
              alt="Rénovation et gros œuvre"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="card-hover group flex gap-6 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-asbat-green/10 text-3xl transition group-hover:bg-asbat-green group-hover:text-white">
                  {service.icon}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-asbat-black">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-asbat-black p-10 text-center sm:p-14">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Un projet en tête ?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-zinc-400">
              Nos experts vous accompagnent de la première esquisse à la remise des clés.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-asbat-green px-8 py-3.5 text-sm font-semibold text-white hover:bg-asbat-green-light"
            >
              Obtenir un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
