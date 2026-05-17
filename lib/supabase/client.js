import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/env";

let browserClient;

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  if (!browserClient) {
    browserClient = createClient(config.url, config.anonKey);
  }

  return browserClient;
}
