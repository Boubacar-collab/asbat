import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/env";

export function createSupabaseServerClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createClient(config.url, config.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
