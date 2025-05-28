import { createClient } from '@supabase/supabase-js';

// Read from environment variables using import.meta.env (Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add checks to ensure variables are loaded
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided as environment variables starting with VITE_');
}

export const supabase = createClient(supabaseUrl, supabaseKey); 