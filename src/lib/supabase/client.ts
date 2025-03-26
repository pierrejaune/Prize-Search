import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL or ANON KEY is missing. Please set these environment variables.'
  );
}

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
