import * as React from 'react';

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('es-CO').format(new Date(date));
}

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler) {
  React.useEffect(() => {
    const listener = (event: PossibleEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function transformSingleDigit(digit: number): string {
  const digitLngth = digit.toString().length;

  if (digitLngth === 1) return `0${digit}`;
  return digit.toString();
}

export { useOnClickOutside, formatDate, transformSingleDigit };
