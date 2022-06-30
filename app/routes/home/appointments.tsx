import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { getAllAppointments } from '~/api';
import { formatDate } from '~/helpers';

type LoaderData = {
  appointments: NonNullable<Awaited<ReturnType<typeof getAllAppointments>>['data']>;
};

export const loader: LoaderFunction = async () => {
  const { data: appointments, error } = await getAllAppointments();

  if (error || !appointments) throw new Error('Failed to load appointments');

  return json<LoaderData>({ appointments });
};

export default function Appointments() {
  const { appointments } = useLoaderData() as LoaderData;

  return (
    <div>
      <h1>Appointments</h1>

      <div className="flex gap-4">
        {appointments.map(a => (
          <div key={a.id} className="flex-1">
            <h2>{formatDate(a.date)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
