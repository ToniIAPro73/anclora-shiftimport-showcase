export type ShiftCode = 'M' | 'T' | 'N' | 'L' | 'V';

/** Código tal como aparece en la fila importada (incluye desconocidos). */
export type RowCode = ShiftCode | 'XX';

export type RowStatus = 'ok' | 'review' | 'resolved';

export interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface ShiftRow {
  id: string;
  employeeId: string;
  /** ISO date, p. ej. 2026-09-04 */
  date: string;
  code: RowCode;
  status: RowStatus;
}

export interface ShiftTypeInfo {
  code: ShiftCode;
  label: string;
  hours: string;
  color: string;
  textColor: string;
}

export const MONTH = '2026-09';
export const MONTH_LABEL = 'Septiembre 2026';
export const DAYS_IN_MONTH = 30;

export const SHIFT_TYPES: ShiftTypeInfo[] = [
  { code: 'M', label: 'Mañana', hours: '07:00–15:00', color: '#6AAD49', textColor: '#ffffff' },
  { code: 'T', label: 'Tarde', hours: '15:00–23:00', color: '#3E7CB1', textColor: '#ffffff' },
  { code: 'N', label: 'Noche', hours: '23:00–07:00', color: '#4B3F72', textColor: '#ffffff' },
  { code: 'L', label: 'Libre', hours: '—', color: '#E4E8EC', textColor: '#5B6470' },
  { code: 'V', label: 'Vacaciones', hours: '—', color: '#F2B134', textColor: '#5C4305' },
];

export const EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Laia Ferrer', role: 'Operaria de línea' },
  { id: 'emp-2', name: 'Marc Bosch', role: 'Técnico de mantenimiento' },
  { id: 'emp-3', name: 'Aitana Ruiz', role: 'Operaria de línea' },
  { id: 'emp-4', name: 'Pol Sanz', role: 'Coordinador de turno' },
];

/**
 * Patrones de rotación ficticios. El de `emp-1` reproduce los 15 primeros
 * días del dataset sintético del repositorio (examples/synthetic/sample-roster.csv)
 * y se prolonga con la misma rotación hasta completar el mes.
 */
const ROTATIONS: Record<string, RowCode[]> = {
  'emp-1': [
    'M', 'M', 'T', 'T', 'L', 'L', 'N', 'N', 'M', 'M', 'V', 'V', 'T', 'T', 'L',
    'M', 'M', 'T', 'T', 'L', 'L', 'N', 'N', 'M', 'M', 'L', 'T', 'T', 'N', 'N',
  ],
  'emp-2': [
    'N', 'N', 'M', 'M', 'L', 'L', 'T', 'T', 'N', 'N', 'L', 'XX', 'M', 'M', 'L',
    'T', 'T', 'N', 'N', 'L', 'M', 'M', 'T', 'T', 'L', 'L', 'V', 'V', 'M', 'M',
  ],
  'emp-3': [
    'T', 'T', 'L', 'M', 'M', 'N', 'N', 'L', 'T', 'T', 'M', 'M', 'L', 'N', 'N',
    'L', 'M', 'M', 'T', 'T', 'L', 'V', 'V', 'N', 'N', 'M', 'M', 'L', 'T', 'T',
  ],
  'emp-4': [
    'M', 'L', 'M', 'T', 'T', 'M', 'L', 'M', 'T', 'T', 'M', 'L', 'M', 'T', 'T',
    'M', 'L', 'M', 'T', 'T', 'M', 'L', 'M', 'T', 'T', 'M', 'L', 'M', 'L', 'M',
  ],
};

export function buildDemoRows(): ShiftRow[] {
  const rows: ShiftRow[] = [];
  for (const employee of EMPLOYEES) {
    const rotation = ROTATIONS[employee.id];
    for (let day = 1; day <= DAYS_IN_MONTH; day += 1) {
      const code = rotation[day - 1];
      rows.push({
        id: `${employee.id}-d${String(day).padStart(2, '0')}`,
        employeeId: employee.id,
        date: `${MONTH}-${String(day).padStart(2, '0')}`,
        code,
        status: code === 'XX' ? 'review' : 'ok',
      });
    }
  }
  return rows;
}

export function shiftTypeOf(code: RowCode): ShiftTypeInfo | undefined {
  return SHIFT_TYPES.find((t) => t.code === code);
}

export function employeeOf(id: string): Employee {
  const found = EMPLOYEES.find((e) => e.id === id);
  if (!found) throw new Error(`Empleado desconocido: ${id}`);
  return found;
}
