import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { getAllBarbers } from '~/api';

type LoaderData = { barbers: NonNullable<Awaited<ReturnType<typeof getAllBarbers>>['data']> };

export const loader: LoaderFunction = async () => {
  const { data: barbers, error } = await getAllBarbers();

  if (error || !barbers) throw new Error('Failed to load barbers');

  return json<LoaderData>({ barbers });
};

export default function Index() {
  const { barbers } = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="flex gap-4">
        {barbers.map(b => (
          <div key={b.id} className="flex-1">
            <h2>{b.name}</h2>

            <img src={b.imageUrl} alt={`${b.name}'s`} className="max-w-max max-h-max" />
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
