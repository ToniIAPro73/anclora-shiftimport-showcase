[← Volver al índice](../README.md)

# Pipeline de ingestión — visión conceptual

> Todos los datos mostrados en este documento son ficticios y se utilizan exclusivamente con fines de demostración profesional.

Este documento describe el pipeline de ingestión a nivel conceptual: qué hace cada etapa y por qué existe. **No** describe las reglas internas de parsing (expresiones, umbrales, vocabularios ni heurísticas concretas), que son lógica propietaria y no forman parte de este repositorio.

## Principio rector

La importación **nunca falla en silencio**. Cada ejecución del pipeline termina en un estado canónico explícito, con diagnósticos estructurados que la UI convierte en orientación accionable para el usuario. El pipeline nunca escribe en el calendario: produce una propuesta que el usuario revisa y confirma.

## Formatos de entrada

| Formato | Lectura | Notas |
|---|---|---|
| PDF | Texto posicional con PDF.js | Se conserva la posición de cada fragmento de texto para reconstruir la estructura del documento |
| Imagen (PNG/JPG/JPEG/WebP) | OCR en el navegador (Tesseract.js, español) | El documento no sale del dispositivo |
| CSV | Parser propio con detección automática de delimitador | Estructura tabular sin layout posicional |
| Excel (xlsx/xls) | ExcelJS | Cuadrante individual u hoja de equipo multi-empleado (una hoja por persona) |
| Texto plano (.txt) | — | No soportado: el pipeline lo clasifica explícitamente como `UNSUPPORTED` |

## Etapas del pipeline

```text
1. Detección de formato
2. Extracción de contenido
3. Normalización
4. Detección del tipo de documento (perfiles declarativos)
5. Detección del contexto de calendario (mes/año)
6. Detección de filas
7. Construcción de turnos
8. Análisis de calidad
9. Preguntas asistidas (si hay ambigüedad)
10. Estado canónico + diagnósticos
11. Vista previa editable
12. Confirmación → calendario
```

### 1. Detección de formato

A partir del tipo y la extensión del archivo se elige el extractor adecuado. Los formatos fuera de la lista soportada no intentan parsearse: terminan directamente en `UNSUPPORTED` con un mensaje claro.

### 2. Extracción de contenido

Cada extractor convierte el documento en una representación intermedia común:

- **PDF**: fragmentos de texto con posición, lo que permite razonar sobre columnas y alineaciones del documento original.
- **Imagen**: texto reconocido por OCR, tratado con cautela adicional por su menor fiabilidad.
- **CSV / Excel**: filas y celdas tabulares, sin información posicional.

Que todos converjan en una representación común es lo que permite que el resto del pipeline sea mayoritariamente agnóstico al formato de origen.

### 3. Normalización

El contenido extraído se limpia y homogeneiza: espaciado, mayúsculas, variantes tipográficas y formatos de fecha/hora se llevan a formas canónicas. Las fechas se representan como `YYYY-MM-DD` y las horas como `HH:mm` en todo el sistema.

### 4. Detección del tipo de documento

Los cuadrantes reales tienen estructuras muy distintas según el sistema que los genera. El pipeline clasifica el documento contra **perfiles declarativos** que describen familias de estructuras conocidas (disposición de columnas, naturaleza de los códigos, orientación del calendario). El perfil elegido guía las etapas siguientes sin hardcodear un único formato.

### 5. Detección del contexto de calendario

El pipeline intenta inferir a qué mes y año pertenece el cuadrante. Regla de producto: **el mes/año elegido por el usuario es autoritativo**. Si el documento sugiere un periodo distinto al seleccionado, el resultado es un conflicto bloqueante (`MONTH_MISMATCH`) que exige una elección explícita — nunca una corrección silenciosa en ninguna dirección.

### 6. Detección de filas

Sobre la representación normalizada se identifican las filas candidatas: líneas que parecen corresponder a un día o a una persona del cuadrante, separadas de cabeceras, totales y ruido.

### 7. Construcción de turnos

Cada fila detectada se traduce a turnos estructurados: fecha, tipo de turno y, cuando aplica, horas de inicio y fin. Los códigos del documento se resuelven contra el **registro de tipos de turno** del usuario (defaults neutros: Regular, Libre, Vacaciones, Extras) incluyendo sus alias personalizados.

### 8. Análisis de calidad

Antes de presentar nada, el resultado se somete a un análisis de consistencia: número de días cubiertos frente a los esperados, huecos sospechosos, códigos no reconocidos, señales de baja confianza del OCR. Este análisis alimenta el estado final y los diagnósticos.

### 9. Preguntas asistidas

Cuando aparece un **código de turno desconocido**, el pipeline no lo descarta ni lo adivina: lo presenta al usuario para que lo clasifique (qué tipo es y, si aplica, qué horario tiene). La respuesta queda aprendida para futuras importaciones como alias del usuario.

### 10. Estados canónicos y diagnósticos

Todo resultado termina en exactamente uno de estos estados:

| Estado | Significado |
|---|---|
| `READY` | Importación completa y consistente, lista para revisar |
| `NEEDS_USER_INPUT` | Hay ambigüedades que requieren respuesta del usuario |
| `PARTIAL` | Parte del documento se leyó; parte no, y se indica cuál |
| `BLOCKED` | Un conflicto (p. ej. de mes/año) impide avanzar sin decisión |
| `UNSUPPORTED` | El formato o el documento no son procesables |
| `FAILED` | Error no recuperable, reportado con contexto |

Reglas innegociables: cero turnos extraídos **nunca** es "Correcto"; un código desconocido **nunca** se descarta sin avisar; ningún estado oculta información al usuario.

### 11. Vista previa editable

La propuesta resultante se muestra en una tabla editable: el usuario puede corregir valores, eliminar filas o descartar la importación entera. Esta etapa es la frontera entre lectura y escritura.

### 12. Confirmación

Solo al confirmar se materializan los turnos en el calendario. Las re-importaciones se gestionan de forma que el mismo cuadrante importado dos veces no genera duplicados silenciosos: el conflicto se detecta y se resuelve de forma explícita.

## Fallback visual opcional

Cuando el pipeline determinista no puede leer el documento (por ejemplo, un PDF escaneado sin capa de texto), existe un asistente visual server-side como último recurso. Sus garantías:

- solo disponible **con sesión activa**;
- el resultado llega siempre **marcado para revisión** (techo de confianza);
- sus fallos se reportan como **diagnósticos no bloqueantes**;
- **nunca sustituye** un resultado determinista usable.

## Qué no incluye este documento

A propósito, esta descripción omite las reglas concretas de interpretación de documentos: cómo se agrupan fragmentos en filas, cómo se reconocen columnas, qué umbrales separan un estado de otro o qué vocabulario reconoce cada perfil. Esas reglas son el núcleo propietario del producto y no se incluyen en este repositorio de demostración.
