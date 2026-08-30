const STEPS = [
  {
    n: '1',
    title: 'Importa el cuadrante',
    text: 'PDF, imagen, CSV u Excel: el documento se lee y se convierte en turnos estructurados.',
  },
  {
    n: '2',
    title: 'Revisa y corrige',
    text: 'Vista previa editable antes de escribir nada. Los códigos desconocidos se marcan para revisión.',
  },
  {
    n: '3',
    title: 'Confirma en el calendario',
    text: 'Solo lo revisado llega a tu calendario mensual, con resumen por tipo de turno.',
  },
];

export default function Intro() {
  return (
    <section className="intro container" aria-labelledby="intro-title">
      <div className="intro-copy">
        <p className="eyebrow">Flujo de importación de cuadrantes</p>
        <h1 id="intro-title">Del documento al calendario, sin copiar turnos a mano</h1>
        <p className="intro-lead">
          Esta demo interactiva reproduce el flujo de producto de Anclora ShiftImport con un
          cuadrante ficticio de septiembre de 2026. El análisis del documento está simulado:
          no hay parsing real en esta versión de portfolio.
        </p>
      </div>
      <ol className="intro-steps">
        {STEPS.map((s) => (
          <li key={s.n} className="intro-step">
            <span className="intro-step-n" aria-hidden="true">
              {s.n}
            </span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
