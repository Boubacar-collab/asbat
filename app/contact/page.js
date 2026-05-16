import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Contact"
        title="Parlons de votre projet"
        subtitle="Remplissez le formulaire ou contactez-nous directement. Réponse sous 24h ouvrées."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-asbat-black">Coordonnées</h2>
              <ul className="mt-6 space-y-6">
                <li>
                  <p className="text-sm font-medium text-zinc-500">Adresse</p>
                  <p className="mt-1 text-asbat-black">Zone industrielle, Dakar, Sénégal</p>
                </li>
                <li>
                  <p className="text-sm font-medium text-zinc-500">Téléphone</p>
                  <a href="tel:+221338000000" className="mt-1 block text-asbat-green hover:underline">
                    +221 33 800 00 00
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-zinc-500">Email</p>
                  <a href="mailto:contact@asbat.sn" className="mt-1 block text-asbat-green hover:underline">
                    contact@asbat.sn
                  </a>
                </li>
                <li>
                  <p className="text-sm font-medium text-zinc-500">Horaires</p>
                  <p className="mt-1 text-asbat-black">
                    Lun – Ven : 8h – 18h
                    <br />
                    Sam : 9h – 13h
                  </p>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl bg-asbat-black p-6">
                <p className="text-sm font-semibold text-asbat-green-light">Devis gratuit</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Décrivez votre projet et recevez une estimation personnalisée sans engagement.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm lg:col-span-3">
              <h2 className="mb-6 text-xl font-semibold text-asbat-black">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
