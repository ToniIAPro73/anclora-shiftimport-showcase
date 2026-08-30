import { useEffect, useState } from 'react';

const STAGES = [
  'Leyendo documento…',
  'Detectando turnos…',
  'Normalizando fechas y códigos…',
];

interface Props {
  source: string;
  onDone: () => void;
}

export default function ProcessingPanel({ source, onDone }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < STAGES.length) {
      const t = window.setTimeout(() => setStage((s) => s + 1), 900);
      return () => window.clearTimeout(t);
    }
    const done = window.setTimeout(onDone, 350);
    return () => window.clearTimeout(done);
  }, [stage, onDone]);

  const progress = Math.min(100, Math.round((stage / STAGES.length) * 100));

  return (
    <section className="panel container" aria-labelledby="processing-title" aria-live="polite">
      <div className="panel-head">
        <h2 id="processing-title">2 · Procesando documento</h2>
        <span className="sim-tag">Análisis simulado para demo</span>
      </div>
      <div className="processing">
        <p className="processing-source">
          Origen: <strong>{source}</strong>
        </p>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del análisis simulado"
        >
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <ol className="processing-stages">
          {STAGES.map((label, i) => (
            <li
              key={label}
              className={
                i < stage ? 'stage stage--done' : i === stage ? 'stage stage--active' : 'stage'
              }
            >
              <span className="stage-dot" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
