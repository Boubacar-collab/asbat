import {
  gallery as fallbackGallery,
  materials as fallbackMaterials,
  projects as fallbackProjects,
  services as fallbackServices,
  values as fallbackValues,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const defaultSettings = {
  address: "Zone industrielle, Dakar, Sénégal",
  phone: "+221 33 800 00 00",
  phoneHref: "+221338000000",
  email: "contact@asbat.sn",
  hours: "Lun – Ven : 8h – 18h\nSam : 9h – 13h",
  tagline: "Leader en construction au Sénégal",
  experienceYears: 15,
};

const defaultStats = [
  { value: 250, suffix: "+", label: "Projets réalisés" },
  { value: 15, suffix: " ans", label: "D'expérience" },
  { value: 120, suffix: "+", label: "Clients satisfaits" },
  { value: 50, suffix: "+", label: "Collaborateurs" },
];

const defaultEquipment = [
  { name: "Pelleteuse", desc: "Location journalière ou mensuelle" },
  { name: "Bétonnière", desc: "Capacités 350L à 500L" },
  { name: "Échafaudage", desc: "Montage et démontage inclus" },
  { name: "Groupe électrogène", desc: "Puissances 5 à 100 kVA" },
  { name: "Niveleuse laser", desc: "Précision pour terrassement" },
  { name: "Compresseur & outillage", desc: "Perforation et finition" },
];

async function fetchTable(table, options = {}) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  let query = supabase.from(table).select(options.select ?? "*");

  if (options.order) {
    query = query.order(options.order.column, {
      ascending: options.order.ascending ?? true,
    });
  }

  const { data, error } = await query;
  if (error) {
    console.warn(`[supabase] ${table}:`, error.message);
    return null;
  }

  return data;
}

export async function getSiteSettings() {
  const rows = await fetchTable("site_settings");
  if (!rows?.length) return defaultSettings;

  const merged = { ...defaultSettings };
  for (const row of rows) {
    if (row.key && row.value !== undefined) {
      if (row.key === "experienceYears") {
        merged.experienceYears = parseInt(row.value, 10) || defaultSettings.experienceYears;
      } else {
        merged[row.key] = row.value;
      }
    }
  }
  return merged;
}

export async function getServices() {
  const rows = await fetchTable("services", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return fallbackServices;

  return rows.map((row) => ({
    id: row.slug ?? row.id,
    title: row.title,
    description: row.description,
    icon: row.icon ?? "🏗️",
  }));
}

export async function getMaterials() {
  const rows = await fetchTable("materials", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return fallbackMaterials;

  return rows.map((row) => ({
    name: row.name,
    category: row.category,
    description: row.description,
    image: row.image_url ?? row.image ?? "/images/chantier-fondations.jpg",
  }));
}

export async function getProjects() {
  const rows = await fetchTable("projects", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return fallbackProjects;

  return rows.map((row) => ({
    title: row.title,
    type: row.type,
    location: row.location,
    year: String(row.year ?? ""),
    description: row.description,
    image: row.image_url ?? row.image ?? "/images/hero.jpg",
  }));
}

export async function getGallery() {
  const rows = await fetchTable("gallery_items", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return fallbackGallery;

  return rows.map((row) => ({
    src: row.src ?? row.image_url,
    alt: row.alt ?? row.title ?? "Chantier ASBAT",
  }));
}

export async function getStats() {
  const rows = await fetchTable("stats", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return defaultStats;

  return rows.map((row) => ({
    value: row.value,
    suffix: row.suffix ?? "",
    label: row.label,
  }));
}

export async function getValues() {
  const rows = await fetchTable("company_values", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return fallbackValues;

  return rows.map((row) => ({
    title: row.title,
    description: row.description,
  }));
}

export async function getEquipment() {
  const rows = await fetchTable("equipment", {
    order: { column: "sort_order" },
  });

  if (!rows?.length) return defaultEquipment;

  return rows.map((row) => ({
    name: row.name,
    desc: row.description ?? row.desc,
  }));
}
