-- Add password_hash column to public.users and restrict column visibility

alter table if exists public.users
  add column if not exists password_hash text;

-- Optional: protect the password_hash column from client roles
do $$
begin
  -- These may fail if roles don't exist in non-Supabase environments; ignore errors
  begin
    revoke select (password_hash) on table public.users from anon, authenticated;
  exception when others then null; end;
  begin
    grant select (password_hash) on table public.users to service_role;
  exception when others then null; end;
end $$;


