import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { getSiteSettings } from "@/lib/supabase/queries";

const links = [
  { href: "/services", label: "Services" },
  { href: "/materiaux", label: "Matériaux & équipements" },
  { href: "/projets", label: "Nos projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-asbat-black text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Image
                src={images.logo}
                alt="ASBAT"
                width={110}
                height={36}
                className="h-8 w-auto rounded bg-white px-2 py-1"
              />
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Entreprise de construction spécialisée dans le bâtiment, la vente de
              matériaux et équipements, le conseil technique et les plans
              d&apos;architecture.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-asbat-green-light">
              Navigation
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-asbat-green-light">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Construction neuve &amp; rénovation</li>
              <li>Vente de matériaux</li>
              <li>Location d&apos;équipements</li>
              <li>Conseil &amp; plans d&apos;architecture</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-asbat-green-light">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-asbat-green">📍</span>
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-asbat-green">📞</span>
                <a href={`tel:${settings.phoneHref}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-asbat-green">✉️</span>
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} ASBAT. Tous droits réservés.
          </p>
          <p className="text-sm text-zinc-500">
            Construire avec confiance · Qualité · Durabilité
          </p>
        </div>
      </div>
    </footer>
  );
}
