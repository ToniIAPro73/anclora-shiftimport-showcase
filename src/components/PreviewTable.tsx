import { useMemo, useState } from 'react';
import {
  EMPLOYEES,
  SHIFT_TYPES,
  employeeOf,
  shiftTypeOf,
  type RowCode,
  type ShiftRow,
} from '../data/demoData';
import { formatDateEs } from '../lib/calendar';

interface Props {
  rows: ShiftRow[];
  onChangeCode: (rowId: string, code: RowCode) => void;
  onConfirm: () => void;
}

const STATUS_LABEL: Record<ShiftRow['status'], string> = {
  ok: 'Detectado',
  review: 'Revisar',
  resolved: 'Corregido',
};

export default function PreviewTable({ rows, onChangeCode, onConfirm }: Props) {
  const [filter, setFilter] = useState<string>('all');

  const visible = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.employeeId === filter)),
    [rows, filter],
  );
  const pending = rows.filter((r) => r.status === 'review').length;
  const resolved = rows.filter((r) => r.status === 'resolved').length;

  return (
    <section className="panel container" aria-labelledby="preview-title">
      <div className="panel-head">
        <h2 id="preview-title">3 · Vista previa editable</h2>
        <span className="sim-tag">Análisis simulado para demo</span>
      </div>

      <div className="preview-toolbar">
        <p className="preview-count">
          {rows.length} turnos detectados ·{' '}
          <strong className={pending > 0 ? 'text-warn' : 'text-ok'}>
            {pending > 0 ? `${pending} por revisar` : 'todo revisado'}
          </strong>
          {resolved > 0 && <> · {resolved} corregido{resolved === 1 ? '' : 's'}</>}
        </p>
        <label className="field">
          <span className="field-label">Empleado</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            {EMPLOYEES.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap" tabIndex={0} aria-label="Tabla de turnos detectados, con scroll">
        <table className="preview-table">
          <thead>
            <tr>
              <th scope="col">Empleado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Código</th>
              <th scope="col">Horario</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const emp = employeeOf(row.employeeId);
              const type = shiftTypeOf(row.code);
              return (
                <tr key={row.id} className={row.status === 'review' ? 'row--review' : undefined}>
                  <td data-th="Empleado">
                    <span className="emp-name">{emp.name}</span>
                    <span className="emp-role">{emp.role}</span>
                  </td>
                  <td data-th="Fecha">{formatDateEs(row.date)}</td>
                  <td data-th="Código">
                    <label className="visually-hidden" htmlFor={`code-${row.id}`}>
                      Código de turno para {emp.name} el {formatDateEs(row.date)}
                    </label>
                    <select
                      id={`code-${row.id}`}
                      className={row.status === 'review' ? 'code-select code-select--review' : 'code-select'}
                      value={row.code}
                      onChange={(e) => onChangeCode(row.id, e.target.value as RowCode)}
                    >
                      <option value="XX">?? Desconocido</option>
                      {SHIFT_TYPES.map((t) => (
                        <option key={t.code} value={t.code}>
                          {t.code} · {t.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td data-th="Horario">{type ? type.hours : '—'}</td>
                  <td data-th="Estado">
                    <span className={`status-pill status-pill--${row.status}`}>
                      {STATUS_LABEL[row.status]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="preview-actions">
        {pending > 0 && (
          <p className="preview-hint" role="status">
            Resuelve {pending === 1 ? 'el código marcado' : `los ${pending} códigos marcados`} como
            «Revisar» antes de confirmar: nada llega al calendario sin revisión.
          </p>
        )}
        <button type="button" className="btn btn-primary" onClick={onConfirm} disabled={pending > 0}>
          Confirmar y ver calendario
        </button>
      </div>
    </section>
  );
}
