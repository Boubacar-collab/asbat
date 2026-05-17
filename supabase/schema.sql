-- Exécuter dans Supabase : SQL Editor → New query → Run
-- Projet : sewolmrlhdypwhrirlld

-- Messages de contact
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  telephone text,
  sujet text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Paramètres du site (clé / valeur)
create table if not exists public.site_settings (
  key text primary key,
  value text not null
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  icon text default '🏗️',
  sort_order int not null default 0
);

-- Matériaux
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  image_url text,
  sort_order int not null default 0
);

-- Projets
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  location text not null,
  year text not null,
  description text not null,
  image_url text,
  sort_order int not null default 0
);

-- Galerie accueil
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text not null,
  sort_order int not null default 0
);

-- Statistiques
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value int not null,
  suffix text default '',
  label text not null,
  sort_order int not null default 0
);

-- Valeurs entreprise
create table if not exists public.company_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  sort_order int not null default 0
);

-- Équipements
create table if not exists public.equipment (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  sort_order int not null default 0
);

-- Droits API (requis pour anon / authenticated)
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert on public.contact_messages to anon;

-- RLS
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.materials enable row level security;
alter table public.projects enable row level security;
alter table public.gallery_items enable row level security;
alter table public.stats enable row level security;
alter table public.company_values enable row level security;
alter table public.equipment enable row level security;

create policy "Lecture publique site_settings"
  on public.site_settings for select to anon, authenticated using (true);

create policy "Lecture publique services"
  on public.services for select to anon, authenticated using (true);

create policy "Lecture publique materials"
  on public.materials for select to anon, authenticated using (true);

create policy "Lecture publique projects"
  on public.projects for select to anon, authenticated using (true);

create policy "Lecture publique gallery"
  on public.gallery_items for select to anon, authenticated using (true);

create policy "Lecture publique stats"
  on public.stats for select to anon, authenticated using (true);

create policy "Lecture publique values"
  on public.company_values for select to anon, authenticated using (true);

create policy "Lecture publique equipment"
  on public.equipment for select to anon, authenticated using (true);

create policy "Insertion contact anonyme"
  on public.contact_messages
  as permissive
  for insert
  to anon, authenticated
  with check (true);

create or replace function public.submit_contact_message(
  p_nom text,
  p_email text,
  p_telephone text,
  p_sujet text,
  p_message text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  insert into public.contact_messages (nom, email, telephone, sujet, message)
  values (p_nom, p_email, p_telephone, p_sujet, p_message)
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.submit_contact_message(text, text, text, text, text) from public;
grant execute on function public.submit_contact_message(text, text, text, text, text) to anon, authenticated;

-- Données initiales
insert into public.site_settings (key, value) values
  ('address', 'Zone industrielle, Dakar, Sénégal'),
  ('phone', '+221 33 800 00 00'),
  ('phoneHref', '+221338000000'),
  ('email', 'contact@asbat.sn'),
  ('hours', 'Lun – Ven : 8h – 18h' || E'\n' || 'Sam : 9h – 13h'),
  ('tagline', 'Leader en construction au Sénégal'),
  ('experienceYears', '15')
on conflict (key) do nothing;

insert into public.services (slug, title, description, icon, sort_order) values
  ('construction', 'Construction & Rénovation', 'Réalisation de bâtiments résidentiels, commerciaux et industriels. Gros œuvre, second œuvre et finitions de qualité.', '🏗️', 1),
  ('materiaux', 'Vente de Matériaux', 'Ciment, fer, bois, carrelage, peinture et tous les matériaux essentiels pour vos chantiers, livrés rapidement.', '🧱', 2),
  ('equipements', 'Matériel & Équipements', 'Vente et location d''engins de chantier, outillage professionnel et équipements de sécurité.', '🚜', 3),
  ('conseil', 'Conseil en Construction', 'Accompagnement technique, études de faisabilité, optimisation des coûts et respect des normes.', '📋', 4),
  ('architecture', 'Plans d''Architecture', 'Conception de plans 2D/3D, permis de construire, aménagement intérieur et design architectural moderne.', '📐', 5)
on conflict (slug) do nothing;

insert into public.materials (name, category, description, image_url, sort_order) values
  ('Ciment & Béton', 'Structure', 'Ciment Portland, gravier, sable et adjuvants pour fondations solides.', '/images/chantier-fondations.jpg', 1),
  ('Acier & Fer', 'Structure', 'Barres d''armature, treillis soudés et profilés pour charpentes.', '/images/chantier-dalle.jpg', 2),
  ('Bois & Menuiserie', 'Structure', 'Poutres, planches, contreplaqué et bois traité pour toitures et coffrages.', '/images/chantier-cours.jpg', 3),
  ('Carrelage & Revêtements', 'Finition', 'Carreaux, marbre, parquet et revêtements muraux haut de gamme.', '/images/facade-finition.jpg', 4),
  ('Peinture & Enduits', 'Finition', 'Peintures intérieures/extérieures, enduits et produits d''étanchéité.', '/images/villa-toiture.jpg', 5),
  ('Plomberie & Électricité', 'Installations', 'Tuyauterie, câblage, tableaux électriques et accessoires certifiés.', '/images/renovation.jpeg', 6);

insert into public.projects (title, type, location, year, description, image_url, sort_order) values
  ('Résidence Les Palmiers', 'Résidentiel', 'Dakar', '2025', 'Complexe de 12 villas avec piscine commune et espaces verts.', '/images/villa-moderne.jpg', 1),
  ('Entrepôt Logistique Sud', 'Industriel', 'Thiès', '2024', 'Structure métallique de 3 500 m² avec quais de chargement.', '/images/chantier-dalle.jpg', 2),
  ('Centre Commercial Almadies', 'Commercial', 'Dakar', '2024', 'Rénovation complète de 2 étages, 45 boutiques et parking.', '/images/immeuble-cotier.jpeg', 3),
  ('École Primaire Liberté', 'Public', 'Saint-Louis', '2023', 'Construction de 8 salles de classe et bloc administratif.', '/images/projet-residentiel.jpeg', 4),
  ('Villa Contemporaine', 'Résidentiel', 'Saly', '2023', 'Maison R+1 avec terrasse, piscine et plans architecturaux sur mesure.', '/images/facade-finition.jpg', 5),
  ('Usine Agroalimentaire', 'Industriel', 'Kaolack', '2022', 'Bâtiment de production avec chambres froides et bureaux.', '/images/chantier-fondations.jpg', 6);

insert into public.gallery_items (src, alt, sort_order) values
  ('/images/hero.jpg', 'Chantier — coulage de dalle', 1),
  ('/images/immeuble-cotier.jpeg', 'Immeuble en construction', 2),
  ('/images/villa-toiture.jpg', 'Villa — pose de toiture', 3),
  ('/images/maconnerie.jpeg', 'Équipe en maçonnerie', 4);

insert into public.stats (value, suffix, label, sort_order) values
  (250, '+', 'Projets réalisés', 1),
  (15, ' ans', 'D''expérience', 2),
  (120, '+', 'Clients satisfaits', 3),
  (50, '+', 'Collaborateurs', 4);

insert into public.company_values (title, description, sort_order) values
  ('Qualité', 'Matériaux certifiés et savoir-faire rigoureux sur chaque chantier.', 1),
  ('Fiabilité', 'Respect des délais et transparence totale avec nos clients.', 2),
  ('Innovation', 'Techniques modernes et plans architecturaux à la pointe.', 3),
  ('Proximité', 'Une équipe locale à votre écoute, du devis à la livraison.', 4);

insert into public.equipment (name, description, sort_order) values
  ('Pelleteuse', 'Location journalière ou mensuelle', 1),
  ('Bétonnière', 'Capacités 350L à 500L', 2),
  ('Échafaudage', 'Montage et démontage inclus', 3),
  ('Groupe électrogène', 'Puissances 5 à 100 kVA', 4),
  ('Niveleuse laser', 'Précision pour terrassement', 5),
  ('Compresseur & outillage', 'Perforation et finition', 6);
