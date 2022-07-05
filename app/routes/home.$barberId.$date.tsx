import type { LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.date, 'invalid params');

  /* param.date format should be YYYY-MM-DD */
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  invariant(dateRegex.test(params.date), 'invalid date format, should be YYYY-MM-DD');
  invariant(!isNaN(new Date(params.date).getTime()), 'invalid date');

  return { ok: true };
};

const hours = Array.from({ length: 12 }, (_, i) => i);

export default function SingleDatePage() {
  return (
    <div className="page-wrapper">
      <h2 className="mb-4">Single Date Page</h2>

      <ul className="relative">
        <span className="absolute border-l border-gray-300 h-full left-16"></span>

        {hours.map(hour => (
          <li key={hour} className="flex items-center gap-2 mb-6">
            <p className="text-right text-sm text-gray-600 w-[50px]">
              {hour === 0 ? '12' : hour} AM
            </p>
            <div className="flex-1 border-b border-gray-300"></div>
          </li>
        ))}

        {hours.map(hour => (
          <li key={hour} className="flex items-center gap-2 mb-6">
            <p className="text-right text-sm text-gray-600 w-[50px]">
              {hour === 0 ? '12' : hour} PM
            </p>
            <div className="flex-1 border-b border-gray-300"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
