import { useMemo } from 'react';
import {
  EMPLOYEES,
  MONTH_LABEL,
  SHIFT_TYPES,
  employeeOf,
  shiftTypeOf,
  type ShiftRow,
} from '../data/demoData';
import { WEEKDAYS, buildMonthGrid } from '../lib/calendar';

interface Props {
  rows: ShiftRow[];
  onReset: () => void;
}

export default function CalendarView({ rows, onReset }: Props) {
  const weeks = useMemo(() => buildMonthGrid(), []);
  const byDate = useMemo(() => {
    const map = new Map<string, ShiftRow[]>();
    for (const row of rows) {
      const list = map.get(row.date) ?? [];
      list.push(row);
      map.set(row.date, list);
    }
    return map;
  }, [rows]);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    for (const row of rows) c.set(row.code, (c.get(row.code) ?? 0) + 1);
    return c;
  }, [rows]);

  const resolved = rows.filter((r) => r.status === 'resolved').length;
  const pending = rows.filter((r) => r.status === 'review').length;
  const workDays = rows.filter((r) => r.code === 'M' || r.code === 'T' || r.code === 'N').length;

  return (
    <section className="panel container" aria-labelledby="calendar-title">
      <div className="panel-head">
        <h2 id="calendar-title">4 · Calendario de {MONTH_LABEL}</h2>
        <span className="confirmed-pill">
          <span className="confirmed-dot" aria-hidden="true" /> Revisado y confirmado
        </span>
      </div>

      <ul className="legend" aria-label="Leyenda de tipos de turno">
        {SHIFT_TYPES.map((t) => (
          <li key={t.code}>
            <span className="chip" style={{ background: t.color, color: t.textColor }}>
              {t.code}
            </span>
            {t.label}
          </li>
        ))}
      </ul>

      <div className="calendar" role="grid" aria-label={`Calendario mensual de ${MONTH_LABEL}`}>
        <div className="calendar-weekdays" role="row">
          {WEEKDAYS.map((d) => (
            <div key={d} className="calendar-weekday" role="columnheader">
              {d}
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="calendar-week" role="row">
            {week.map((cell, ci) => (
              <div
                key={ci}
                className={cell.day === null ? 'calendar-cell calendar-cell--empty' : 'calendar-cell'}
                role="gridcell"
                aria-label={cell.date ?? undefined}
              >
                {cell.day !== null && cell.date && (
                  <>
                    <span className="calendar-day">{cell.day}</span>
                    <div className="calendar-shifts">
                      {(byDate.get(cell.date) ?? []).map((row) => {
                        const type = shiftTypeOf(row.code);
                        const emp = employeeOf(row.employeeId);
                        return (
                          <div className="cal-row" key={row.id} title={`${emp.name} · ${type?.label ?? 'Desconocido'}`}>
                            <span className="cal-emp" aria-hidden="true">
                              {emp.name.split(' ').map((p) => p[0]).join('')}
                            </span>
                            <span
                              className="chip"
                              style={{ background: type?.color ?? '#C0392B', color: type?.textColor ?? '#fff' }}
                            >
                              {row.code}
                            </span>
                            <span className="visually-hidden">
                              {emp.name}: {type?.label ?? 'código desconocido'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="summary" aria-labelledby="summary-title">
        <h3 id="summary-title">Resumen de la importación</h3>
        <div className="summary-grid">
          {SHIFT_TYPES.map((t) => (
            <div key={t.code} className="summary-card">
              <span className="chip chip--lg" style={{ background: t.color, color: t.textColor }}>
                {t.code}
              </span>
              <div>
                <p className="summary-num">{counts.get(t.code) ?? 0}</p>
                <p className="summary-label">{t.label}</p>
              </div>
            </div>
          ))}
          <div className="summary-card summary-card--meta">
            <p className="summary-num">{EMPLOYEES.length}</p>
            <p className="summary-label">Personas</p>
          </div>
          <div className="summary-card summary-card--meta">
            <p className="summary-num">{workDays}</p>
            <p className="summary-label">Días trabajados</p>
          </div>
          <div className="summary-card summary-card--meta">
            <p className="summary-num">{resolved}</p>
            <p className="summary-label">Revisiones resueltas</p>
          </div>
          <div className="summary-card summary-card--meta">
            <p className="summary-num">{pending}</p>
            <p className="summary-label">Pendientes</p>
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={onReset}>
          Reiniciar demo
        </button>
      </div>
    </section>
  );
}
