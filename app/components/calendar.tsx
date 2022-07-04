import * as React from 'react';
import { useCalendarState } from '@react-stately/calendar';
import type { CalendarState } from '@react-stately/calendar';
import { useCalendar, useCalendarCell, useCalendarGrid } from '@react-aria/calendar';
import { createCalendar, getWeeksInMonth, parseAbsoluteToLocal } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import type { CalendarDate } from '@internationalized/date';
import { UilAngleLeft, UilAngleRight, UilCalender } from '@iconscout/react-unicons';
import { useOnClickOutside } from '~/helpers';

function Calendar({
  onChange,
  date,
  className,
}: {
  onChange: (date: Date) => void;
  date: Date;
  className?: string;
}) {
  const contRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const state = useCalendarState({
    locale: 'nb',
    createCalendar,
    onChange: (date: DateValue) => {
      onChange(date.toDate('Europe/Oslo'));
      setIsOpen(false);
    },
    defaultValue: parseAbsoluteToLocal(date.toISOString()),
  });
  const ref = React.useRef(null);
  const {
    calendarProps,
    prevButtonProps: { onPress: onPrevPress, isDisabled, ...prevButtonProps },
    nextButtonProps: { onPress: onNextPress, isDisabled: e, ...nextButtonProps },
    title,
  } = useCalendar({}, state);
  useOnClickOutside(contRef, () => setIsOpen(false));

  return (
    <>
      {() => (
        <div className={`relative max-w-max ${className || ''}`} ref={contRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-gray-50 rounded-sm p-1"
          >
            <UilCalender />
          </button>

          {isOpen && (
            <div
              {...calendarProps}
              ref={ref}
              className="bg-white p-2 rounded-md border border-gray-100 max-w-max absolute top-9 left-0 z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  {...prevButtonProps}
                  onClick={e => {
                    onPrevPress?.(e as any);
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-100 rounded-sm"
                >
                  <UilAngleLeft />
                </button>
                <p className="font-medium">{title}</p>
                <button
                  {...nextButtonProps}
                  onClick={e => {
                    onNextPress?.(e as any);
                  }}
                  className="w-6 h-6 flex items-center justify-center border border-gray-100 rounded-sm"
                >
                  <UilAngleRight />
                </button>
              </div>
              <CalendarGrid state={state} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function CalendarGrid({ state }: { state: CalendarState }) {
  let { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, 'en');

  return (
    <div>
      <table {...gridProps}>
        <thead {...headerProps}>
          <tr>
            {weekDays.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...new Array(weeksInMonth).keys()].map(weekIndex => (
            <tr key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex)
                .map((date, i) =>
                  date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />,
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalendarCell({ state, date }: { state: CalendarState; date: CalendarDate }) {
  let ref = React.useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`m-1 rounded-sm font-medium text-sm flex items-center justify-center w-7 h-7 ${
          isSelected ? 'bg-primary-600 text-white' : ''
        } ${isDisabled ? 'text-gray-500' : ''} ${isUnavailable ? 'unavailable' : ''}`}
      >
        {formattedDate}
      </div>
    </td>
  );
}

export { Calendar };
