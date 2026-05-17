-- Exécuter dans Supabase → SQL Editor → Run
-- Corrige l'envoi du formulaire de contact (erreur RLS)

-- 1. Droits sur le schéma et la table
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert on public.contact_messages to anon;

-- 2. Politique d'insertion directe
drop policy if exists "Insertion contact anonyme" on public.contact_messages;

create policy "Insertion contact anonyme"
  on public.contact_messages
  as permissive
  for insert
  to anon, authenticated
  with check (true);

-- 3. Fonction RPC (contourne RLS si la politique ci-dessus ne suffit pas)
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
