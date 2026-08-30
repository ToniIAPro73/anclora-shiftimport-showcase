import { useRef, useState } from 'react';

interface Props {
  onLoadExample: (source: string) => void;
  disabled: boolean;
}

export default function ImportPanel({ onLoadExample, disabled }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const simulateFilePick = () => {
    setNote('Selector de archivo simulado: en esta demo se carga el dataset sintético de ejemplo.');
    onLoadExample('archivo seleccionado (simulado)');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    setNote('Arrastre simulado: en esta demo se carga el dataset sintético de ejemplo.');
    onLoadExample('archivo arrastrado (simulado)');
  };

  return (
    <section className="panel container" aria-labelledby="import-title">
      <div className="panel-head">
        <h2 id="import-title">1 · Importar cuadrante</h2>
        <span className="sim-tag">Análisis simulado para demo</span>
      </div>

      <div
        className={`dropzone${dragOver ? ' dropzone--over' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        role="group"
        aria-label="Zona de importación simulada"
      >
        <svg className="dropzone-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 16V4m0 0 4 4m-4-4L8 8M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="dropzone-title">Arrastra aquí tu cuadrante</p>
        <p className="dropzone-sub">PDF, imagen, CSV o Excel — la lectura real no forma parte de esta demo.</p>
        <div className="dropzone-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onLoadExample('fichero de ejemplo')}
            disabled={disabled}
          >
            Usar fichero de ejemplo
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            Seleccionar archivo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="visually-hidden"
            aria-label="Seleccionar archivo (simulado)"
            accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.webp"
            onChange={simulateFilePick}
          />
        </div>
        <p className="dropzone-meta">Dataset incluido: cuadrante ficticio de 4 personas · septiembre 2026 · 120 turnos</p>
        {note && (
          <p className="dropzone-note" role="status">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
