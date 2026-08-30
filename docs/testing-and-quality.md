[← Volver al índice](../README.md)

# Testing y calidad

La parte más frágil de Anclora ShiftImport es la interpretación de documentos heterogéneos. La estrategia de calidad está diseñada alrededor de ese riesgo: mucha cobertura unitaria sobre la lógica de ingestión, tests de componentes para los flujos de revisión, E2E para los recorridos completos y gates automáticos que impiden que nada degradado avance.

## Niveles de testing

### Unitarios y de componentes: Vitest + Testing Library

- **Vitest 4** con `jsdom` y Testing Library para React.
- La suite abarca **decenas de archivos de test** entre frontend y API, con énfasis en:
  - **Lógica de ingestión**: normalización, detección de estructura, construcción de turnos, análisis de calidad, estados canónicos y diagnósticos. Al ser módulos puros, se prueban directamente, sin navegador ni UI.
  - **Componentes**: flujos de los modales (importación, edición de turno, perfiles de formato), comportamiento del calendario, selector de empleado y navegación.
  - **API**: capa de acceso a datos con aislamiento por organización verificado contra un cliente SQL simulado, y comportamiento de los endpoints autenticados.
- Los fixtures son **siempre sintéticos**: nunca se usan cuadrantes reales en los tests.

### E2E: Playwright en paquete independiente

- Los tests de aceptación viven en un **paquete separado** con su propia configuración, desacoplados del build de la app.
- **Seed y teardown automáticos**: cada ejecución prepara su propio estado (organización, usuarios, empleados) y lo limpia al terminar; los escenarios no dependen de datos preexistentes ni dejan residuos.
- **Matriz de escenarios**: los recorridos cubren las combinaciones relevantes de la experiencia — modo invitado frente a sesión iniciada, importación directa frente a importación con preguntas asistidas, y los distintos estados canónicos de importación.
- Se ejecutan contra la aplicación servida en local con el backend de desarrollo, reproduciendo el flujo real de extremo a extremo.

## Gates de calidad

| Gate | Qué verifica | Dónde |
|---|---|---|
| ESLint 9 (flat) estricto | Cero advertencias permitidas (`--max-warnings 0`) | Local + CI |
| `tsc` + build | Tipado estricto y compilación de producción | Local + CI |
| Vitest | Suite unitaria y de componentes | Local + CI |
| Playwright | Aceptación E2E | Entorno dedicado |

El lint con cero advertencias es una decisión deliberada: las advertencias que se toleran se acumulan, así que no se tolera ninguna.

## Integración continua

Cada push ejecuta en CI la secuencia completa: **lint → type-check/build → tests**. Un fallo en cualquier gate bloquea la integración.

La **promoción entre entornos** (desarrollo → staging → producción) requiere aprobación humana explícita. La automatización garantiza que el código es válido; la decisión de cuándo avanza sigue siendo de una persona.

## Ejecución en local

Antes de integrar cualquier cambio, la validación de referencia en local reproduce los gates de CI:

- lint estricto;
- type-check y build de producción;
- suite completa de tests.

La regla práctica es simple: ningún trabajo se considera terminado con tests en rojo o con la implementación a medias, y ninguna afirmación de "funciona" se hace sin haber ejecutado la verificación correspondiente.

## Invariantes verificados por la suite

Más allá de la cobertura general, la suite codifica reglas de producto como tests:

- la importación **nunca falla en silencio**: todo resultado termina en un estado canónico;
- **cero turnos** extraídos nunca se reporta como "Correcto";
- un **código de turno desconocido** nunca se descarta sin avisar;
- el **mes/año seleccionado por el usuario es autoritativo**: un conflicto produce un estado bloqueante con elección explícita;
- la **vista previa** permite editar y eliminar filas antes de confirmar, y nada se persiste sin confirmación;
- la **cobertura de claves i18n** entre español e inglés es completa;
- el **aislamiento multi-tenant** se fuerza en el servidor: no hay acceso a datos de otra organización por ningún camino de la API.

## Filosofía

La calidad aquí no es una métrica de cobertura: es la propiedad de que **los fallos sean visibles, explicables y recuperables**. Un parser que lee documentos del mundo real va a encontrar entradas que no entiende; el trabajo de la ingeniería es que eso se traduzca en una buena pregunta al usuario, no en un dato incorrecto silencioso.
