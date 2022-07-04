import { supabaseClient } from '~/supabase.server';
import type { IAppointment, IBarber } from './types';

function getAllBarbers() {
  return supabaseClient.from<IBarber>('barber').select('*').order('id', { ascending: true });
}

function getBarberById(id: string) {
  return supabaseClient.from<IBarber>('barber').select('*').eq('id', id).single();
}

function getAllAppointments() {
  return supabaseClient
    .from<IAppointment>('appointment')
    .select('*')
    .order('id', { ascending: true });
}

export { getAllBarbers, getBarberById, getAllAppointments };
