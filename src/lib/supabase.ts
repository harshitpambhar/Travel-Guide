import { createClient } from '@supabase/supabase-js';

// Vite exposes env vars on import.meta.env with VITE_ prefix
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment/.env file.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
