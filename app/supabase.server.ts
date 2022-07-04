import { createClient } from '@supabase/supabase-js';
import type { Session, SupabaseClientOptions } from '@supabase/supabase-js';
import invariant from 'tiny-invariant';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_KEY: string;
      SESSION_SECRET: string;
    }
  }
}

invariant(
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY,
  'SUPABASE_URL and SUPABASE_SERVICE_KEY must be set',
);

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

const schemaTables = {
  barber: 'barber',
  appointment: 'appointment',
} as const;

export { Session, supabaseClient, schemaTables };
