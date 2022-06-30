import { supabaseClient } from '~/supabase.server';
import type { IBarber } from './types';

function getAllBarbers() {
  return supabaseClient.from<IBarber>('barbers').select('*').order('id', { ascending: true });
}

function getBarberById(id: string) {
  return supabaseClient.from<IBarber>('barbers').select('*').eq('id', id).single();
}

export { getAllBarbers, getBarberById };
