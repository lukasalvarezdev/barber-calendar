import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { Modal } from '~/components/modal';
import { getBarberById } from '~/api';
import invariant from 'tiny-invariant';

type LoaderData = { barber: NonNullable<Awaited<ReturnType<typeof getBarberById>>['data']> };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.barberId, 'invalid params');

  const { data: barber, error } = await getBarberById(params.barberId);

  if (error || !barber) throw new Error('Failed to load barbers');

  return json<LoaderData>({ barber });
};

export default function BarberPage() {
  const { barberId } = useParams();
  const { barber } = useLoaderData() as LoaderData;

  return (
    <Modal>
      <h1>Barber #{barberId}</h1>

      <p>El es {barber.name}</p>

      <img src={barber.imageUrl} alt={`${barber.name}'s`} className="max-w-max max-h-max" />
    </Modal>
  );
}
