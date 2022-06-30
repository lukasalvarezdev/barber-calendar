import { createClient } from '@supabase/supabase-js';
import type { Session, SupabaseClientOptions } from '@supabase/supabase-js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_KEY: string;
      SESSION_SECRET: string;
    }
  }
}

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is required');
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('SUPABASE_SERVICE_KEY is required');
}

/**
 * See more: https://supabase.com/docs/reference/javascript/initializing#with-additional-parameters
 */
const options: SupabaseClientOptions = {
  schema: 'public',
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
};

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  options,
);

export { Session, supabaseClient };
