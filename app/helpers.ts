export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('es-CO').format(new Date(date));
}
