[← Volver al índice](../README.md)

# Anclora ShiftImport — Visión general del producto

> Todos los datos mostrados en este documento son ficticios y se utilizan exclusivamente con fines de demostración profesional.

## El problema

Las personas que trabajan por turnos (sanidad, hostelería, logística, seguridad, industria, atención al cliente) reciben cada mes su cuadrante de trabajo en formatos que no controlan:

- un **PDF** generado por el sistema de planificación de la empresa;
- una **imagen** (captura de pantalla, foto del tablón de anuncios);
- una **hoja de cálculo** (Excel) o un **CSV** exportado de otro sistema.

Estos documentos están diseñados para la organización que los emite, no para la persona que los recibe. Si esa persona quiere tener sus turnos en su calendario personal —para planificar su vida, compartir disponibilidad o simplemente saber qué le toca mañana—, tiene que copiar turno a turno a mano.

Es un proceso:

- **lento**: un cuadrante mensual puede tener 25-31 filas;
- **propenso a errores**: copiar mal una hora de inicio tiene consecuencias reales;
- **repetitivo**: se hace todos los meses, con un documento distinto cada vez.

## Usuario objetivo

Persona trabajadora por turnos que:

- recibe su cuadrante como documento elaborado por terceros (su empresa o el sistema de planificación de la empresa);
- quiere ese horario en un calendario propio, claro y consultable;
- no quiere (ni debería tener que) volcar los datos a mano;
- valora que sus horarios no salgan de su dispositivo salvo que ella lo decida.

No es un producto pensado para el departamento de RR. HH. ni para quien genera los cuadrantes: está pensado para quien los **recibe**.

## Propuesta de valor

Anclora ShiftImport convierte el documento del cuadrante en turnos estructurados y listos para el calendario, con un principio rector:

> **Importar → revisar → calendario.** Nada se escribe sin revisión explícita del usuario.

En la práctica:

1. el usuario arrastra el archivo que le ha llegado;
2. la aplicación lo lee, extrae la información y la normaliza;
3. si algo es ambiguo, la aplicación **pregunta** en lugar de adivinar;
4. el usuario revisa una **vista previa editable** y corrige lo que haga falta;
5. al confirmar, los turnos aparecen en un calendario mensual con métricas.

El valor no está solo en ahorrar tiempo: está en la **confianza**. El usuario nunca descubre un turno incorrecto a posteriori porque la revisión forma parte del flujo, no es un paso opcional.

## Flujo principal

```text
1. Seleccionar archivo (PDF / imagen / CSV / Excel)
2. Elegir el mes y año al que corresponde el cuadrante
3. Detección y extracción automática
4. Preguntas asistidas si hay códigos o fechas ambiguas
5. Vista previa editable (editar o eliminar filas)
6. Confirmación
7. Calendario mensual/semanal con métricas de horas
```

A partir de ahí, la app ofrece un espacio de trabajo con calendario mensual y semanal, métricas agregadas, exportación de informes en PDF y, con sesión iniciada, persistencia remota por empleado y cuadrantes de equipo multi-persona.

## Qué no es

Anclora ShiftImport es deliberadamente un producto acotado. No es, ni pretende ser:

- **Un HRIS**: no gestiona expedientes, contratos, ausencias ni nóminas.
- **Un sistema de nómina**: no calcula salarios ni cotizaciones.
- **Un registro horario legal**: no es un sistema de fichaje ni cumple esa función regulatoria.
- **Un generador de cuadrantes**: no planifica ni asigna turnos; solo lee los que ya existen.
- **Un ERP**: no integra facturación, inventario ni procesos de back-office.

Esta delimitación es una decisión de producto, no una carencia: hacer una sola cosa —llevar el cuadrante del documento al calendario— con fiabilidad y control para el usuario.

## Estado del producto

- Flujo completo de importación con vista previa editable y confirmación.
- Estados de diagnóstico canónicos: la importación nunca falla en silencio (ver [ingestion-pipeline.md](ingestion-pipeline.md)).
- Modo invitado local-first funcional sin cuenta ni servidor (ver [privacy-and-security.md](privacy-and-security.md)).
- Backend multi-tenant opcional para sincronización remota por empleado (ver [architecture.md](architecture.md)).
