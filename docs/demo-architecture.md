[← Volver al índice](../README.md)

# Arquitectura de la demo interactiva

Este documento describe la demo ejecutable incluida en este repositorio (`src/`, Vite + React + TypeScript). Es una pieza **independiente y autocontenida**: no comparte código con la aplicación operativa y no reproduce su lógica interna.

## Qué es

- Una **SPA estática** (Vite + React 18 + TypeScript estricto) sin backend, sin variables de entorno y sin servicios externos.
- Un recorrido de producto **guiado por estado**: introducción → importación simulada → procesamiento simulado → vista previa editable → calendario mensual → resumen.
- Los datos proceden de un **dataset sintético empaquetado** (`src/data/`), derivado de los ejemplos ficticios del repositorio (`examples/synthetic/`): 4 empleados inventados, mes ficticio (septiembre de 2026), códigos M/T/N/L/V y una fila con código desconocido (`XX`) marcada para revisión.

## Qué está simulado explícitamente

- **La lectura del documento**: la zona de arrastre y el selector de archivos no parsean nada; cargan el dataset de ejemplo predefinido.
- **El procesamiento**: la barra de progreso y las etapas («leyendo documento → detectando turnos → normalizando») son temporizadores de UI, no trabajo real.
- Toda la interfaz lo indica con la etiqueta «Análisis simulado para demo».

## Qué NO representa

- El parser, el OCR, la normalización, el matching ni la deduplicación de la aplicación real: ninguna de esas capacidades existe en esta demo.
- Persistencia, sincronización, autenticación ni multi-tenancy: el estado vive solo en memoria durante la sesión.
- Datos de producción: todos los nombres, fechas y cuadrantes son ficticios.

## Estructura

```text
src/
├── main.tsx              # entrada React
├── App.tsx               # máquina de estados del flujo (idle → processing → preview → calendar)
├── components/           # Header, Intro, ImportPanel, ProcessingPanel, PreviewTable, CalendarView, Footer
├── data/                 # dataset sintético (demoData.ts + copias de los ejemplos del repo)
├── lib/                  # utilidades de calendario (cuadrícula mensual, formato de fechas)
└── styles/               # CSS manual, responsive (tabla → tarjetas, calendario adaptativo)
```

## Comandos

```bash
npm install
npm run dev        # desarrollo
npm run build      # type-check + build de producción en dist/
npm run preview    # servir el build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Para la arquitectura conceptual del producto (que esta demo ilustra pero no implementa), ver [architecture.md](architecture.md).
