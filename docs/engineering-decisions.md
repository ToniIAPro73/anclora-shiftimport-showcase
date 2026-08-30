[← Volver al índice](../README.md)

# Decisiones de ingeniería

Este documento recoge las decisiones técnicas principales de Anclora ShiftImport y su motivación. El objetivo es explicar el *porqué*, no solo el *qué*.

## Stack base

### TypeScript 5.6 en modo estricto

Todo el proyecto compila con `strict`. En una aplicación cuyo núcleo transforma datos semiestructurados (texto extraído de PDFs, salidas de OCR, celdas heterogéneas) en estructuras tipadas, el sistema de tipos es la primera línea de defensa: los estados canónicos de importación, los diagnósticos y los modelos de turno son tipos discriminant que el compilador obliga a manejar por completo.

### Vite 5

Build rápido, configuración mínima y un gate de build (`tsc` + bundle) que sirve como validación principal en local y en CI. Para una app mayormente frontend sin SSR, Vite ofrece exactamente lo necesario sin carga adicional.

### React 18

Modelo de componentes con estado local y modales de flujo. No se usa un gestor de estado global: el estado principal vive en el componente raíz y se pasa por props, lo que mantiene el flujo de datos explícito y fácil de seguir en una app de este tamaño. Iconografía con `lucide-react` y tipografía DM Sans.

## Ingestión pura y separada de la UI

La capa de ingestión es un conjunto de **módulos puros**: funciones sin efectos laterales que reciben contenido extraído y devuelven resultados estructurados. No conocen React, ni el DOM, ni el almacenamiento.

Motivación:

- **Testabilidad**: la parte más frágil del sistema (interpretar documentos heterogéneos) se prueba con tests unitarios directos, sin arrancar la app ni un navegador.
- **Razonabilidad**: un pipeline puro se puede ejecutar, depurar y versionar de forma aislada.
- **Evolución**: añadir un formato o un perfil nuevo no toca la UI.

Los extractores (PDF.js, Tesseract.js, ExcelJS, parser CSV) son la única frontera con efectos; todo lo posterior a la extracción es puro.

## Validación antes de escritura (preview obligatoria)

Ningún camino del código persiste turnos sin pasar por la **vista previa editable** y la confirmación explícita del usuario. Es una decisión de producto convertida en invariante arquitectónico: la importación produce *propuestas*, nunca escrituras.

Consecuencia práctica: los errores de parsing se corrigen en la revisión, no a posteriori en el calendario.

## Registro de tipos de turno configurable

Los tipos de turno no están hardcodeados. Existe un registro con:

- **defaults neutros**: Regular, Libre, Vacaciones, Extras;
- **overrides del usuario**: puede añadir tipos, renombrarlos y definir horarios por defecto;
- **resolver de alias**: los códigos encontrados en documentos se resuelven primero contra alias personalizados, luego contra alias por defecto y por último contra el identificador o la etiqueta del tipo.

El asistente de importación alimenta este registro: cuando el usuario clasifica un código desconocido, la respuesta queda aprendida para futuras importaciones. Ninguna empresa ni convenio concreto es un caso especial en el código.

## i18n es/en con cobertura verificada por tests

La interfaz está internacionalizada (español e inglés). Existen tests que verifican la **cobertura de claves** entre idiomas: ninguna cadena puede existir en un idioma y faltar en otro sin que la suite falle. La i18n deja de ser una tarea de disciplina manual para ser un invariante comprobado.

## Errores como diagnósticos estructurados, no excepciones

La importación no comunica problemas lanzando excepciones hacia la UI. Todo resultado — incluidos los fallos — es un valor: un estado canónico (`READY`, `NEEDS_USER_INPUT`, `PARTIAL`, `BLOCKED`, `UNSUPPORTED`, `FAILED`) más una lista de diagnósticos estructurados con códigos y contexto para recuperación guiada.

Motivación:

- la UI siempre sabe qué pintar y qué acción ofrecer;
- "fallar bien" es testeable como cualquier otro comportamiento;
- la importación **nunca falla en silencio**: cero turnos nunca es "Correcto" y un código desconocido nunca se descarta sin avisar.

## Local-first con sincronización remota opcional

La persistencia por defecto es **local** (almacenamiento del navegador): la app es plenamente funcional sin cuenta ni servidor. Con sesión iniciada, la persistencia remota por empleado es opt-in, y la migración local → remoto es **one-shot y conserva la copia local** — el usuario nunca pierde sus datos por decidir probar la sincronización.

El backend (funciones serverless + PostgreSQL multi-tenant, esquema versionado con migraciones) existe para dar continuidad entre dispositivos y soporte de equipo, no como requisito. El aislamiento por organización lo fuerza siempre el servidor.

Detalle del modelo en [architecture.md](architecture.md) y de las garantías de datos en [privacy-and-security.md](privacy-and-security.md).

## Integración continua

Cada push ejecuta en CI:

1. **lint estricto** (`--max-warnings 0`: cero advertencias permitidas);
2. **type-check y build**;
3. **suite de tests** (Vitest sobre lógica de ingestión, componentes y API).

La promoción entre entornos requiere **aprobación humana**: ningún despliegue a entornos superiores es automático. La automatización valida; las personas deciden cuándo promocionar.

## Lo que se evitó deliberadamente

- **Gestor de estado global**: complejidad innecesaria para el flujo de datos actual.
- **Dependencias innecesarias**: el repo es ligero a propósito; cada dependencia (PDF.js, Tesseract.js, ExcelJS, jsPDF para informes) responde a una capacidad concreta del producto.
- **Lógica de parsing en componentes**: prohibido por arquitectura, no por convención.
