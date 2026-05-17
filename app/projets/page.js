import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getProjects } from "@/lib/supabase/queries";

export const metadata = {
  title: "Projets",
};

export const revalidate = 60;

const typeColors = {
  Résidentiel: "bg-emerald-100 text-emerald-800",
  Industriel: "bg-zinc-200 text-zinc-800",
  Commercial: "bg-blue-100 text-blue-800",
  Public: "bg-amber-100 text-amber-800",
};

export default async function ProjetsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        badge="Portfolio"
        title="Nos réalisations"
        subtitle="Découvrez une sélection de projets menés par ASBAT à travers le Sénégal."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="card-hover overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColors[project.type] || "bg-zinc-100 text-zinc-800"}`}
                    >
                      {project.type}
                    </span>
                    <span className="text-sm text-zinc-500">{project.year}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-asbat-black">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-asbat-green">{project.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-zinc-600">
              Vous avez un projet similaire ? Parlons-en ensemble.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-asbat-green px-8 py-3.5 text-sm font-semibold text-white hover:bg-asbat-green-dark"
            >
              Démarrer mon projet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
