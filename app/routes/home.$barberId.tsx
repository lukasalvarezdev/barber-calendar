import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Modal } from "~/components/modal";
import { getBarberById } from "~/api";
import invariant from "tiny-invariant";

type LoaderData = {
  barber: NonNullable<Awaited<ReturnType<typeof getBarberById>>["data"]>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.barberId, "invalid params");

  const { data: barber, error } = await getBarberById(params.barberId);

  if (error || !barber) throw new Error("Failed to load barbers");

  return json<LoaderData>({ barber });
};

export default function BarberPage() {
  const { barberId } = useParams();
  const { barber } = useLoaderData() as LoaderData;
  const style = 'h-32 text-center flex items-center justify-center'

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <h1>Barber #{barberId}</h1>

      <p>El es {barber.name}</p>

      <img
        src={barber.imageUrl}
        alt={`${barber.name}'s`}
        className="w-1/3 mx-auto aspect-square"
      />

      <div>
        <h1>{`${barber.name}'s calendar`}</h1>
        <div className="grid grid-cols-7 grid-rows-1 text-center py-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="border">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5">
          {Array(31)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className={
                  index % 2 === 0
                    ? `bg-gray-100 ${style}` 
                    : `bg-gray-300 ${style}`
                }
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
