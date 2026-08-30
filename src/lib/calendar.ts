import { DAYS_IN_MONTH, MONTH } from '../data/demoData';

export interface CalendarCell {
  /** Día del mes (1..30) o null para celdas vacías de relleno. */
  day: number | null;
  date: string | null;
}

export const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const;

/** Construye la cuadrícula del mes (semana empezando en lunes). */
export function buildMonthGrid(): CalendarCell[][] {
  const first = new Date(`${MONTH}-01T00:00:00`);
  // getDay(): 0=domingo … 6=sábado → offset para semana que empieza en lunes
  const offset = (first.getDay() + 6) % 7;
  const cells: CalendarCell[] = [];
  for (let i = 0; i < offset; i += 1) cells.push({ day: null, date: null });
  for (let day = 1; day <= DAYS_IN_MONTH; day += 1) {
    cells.push({ day, date: `${MONTH}-${String(day).padStart(2, '0')}` });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, date: null });

  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function formatDateEs(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}
