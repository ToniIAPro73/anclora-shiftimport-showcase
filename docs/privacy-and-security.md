[← Volver al índice](../README.md)

# Privacidad y seguridad

> Todos los datos mostrados en este repositorio son ficticios y se utilizan exclusivamente con fines de demostración profesional.

Anclora ShiftImport maneja datos sensibles por naturaleza: los horarios de trabajo de una persona. Las decisiones de privacidad del producto parten de esa premisa.

## Local-first por defecto

La aplicación funciona en **modo invitado** sin cuenta, sin servidor y sin conexión:

- Todos los datos (turnos, preferencias, tipos de turno configurados, alias aprendidos) viven en el **almacenamiento local del navegador** del usuario.
- No hay registro obligatorio ni telemetría como condición de uso.
- Borrar los datos del navegador equivale a desinstalar: no queda copia en ningún servidor porque nunca salió del dispositivo.

## Los documentos no salen del dispositivo

El flujo de importación está diseñado para minimizar la exposición del documento original:

- **El OCR se ejecuta en el navegador** (Tesseract.js): las imágenes de cuadrantes se procesan en el dispositivo del usuario. El documento no se sube a ningún servidor para ser leído.
- **El archivo original no se persiste**: una vez extraído el contenido, la aplicación trabaja con los datos estructurados resultantes; el documento fuente no se guarda.
- **Minimización de datos**: solo se conserva lo que el calendario necesita (fechas, tipos de turno, horarios). No se almacena información del documento que no sea necesaria para el producto.

### La excepción acotada: fallback visual opcional

Existe un único camino en el que un documento puede procesarse fuera del dispositivo: el **fallback visual server-side**, para documentos que el pipeline determinista no consigue leer. Sus garantías:

- solo está disponible **con sesión activa** del usuario;
- el resultado llega siempre **marcado para revisión**, nunca se confirma automáticamente;
- sus fallos son diagnósticos no bloqueantes;
- nunca sustituye un resultado local usable.

Es una capacidad opt-in dentro de una experiencia opt-in (tener sesión), no el camino por defecto.

## Backend autenticado: aislamiento forzado en el servidor

Cuando el usuario decide usar la sincronización remota:

- El backend es **multi-tenant**: cada dato pertenece a una organización y a un empleado concretos.
- **El aislamiento lo fuerza el servidor**: toda operación de datos se valida contra el contexto de sesión en backend. El cliente nunca decide a qué organización o empleado accede; los identificadores enviados desde el navegador se verifican siempre del lado del servidor.
- Los roles (ADMIN, MANAGER, EMPLOYEE) acotan qué puede hacer cada miembro, y las operaciones sensibles están restringidas por rol.
- La autenticación se basa en sesiones por cookie gestionadas en el servidor; el cliente no maneja credenciales reutilizables.

## Migración local → remoto sin pérdida

La migración de datos locales a la cuenta es **one-shot y no destructiva**: copia los turnos locales al espacio remoto del empleado y **conserva la copia local**. Decidir probar la sincronización nunca pone en riesgo los datos existentes.

## Sobre este repositorio de demostración

Este repositorio es una versión reducida para portfolio y aplica una política estricta de contenido:

- **Datos sintéticos**: todos los ejemplos, capturas y fixtures son ficticios, generados para demostración. No contienen datos de personas reales ni cuadrantes reales.
- **Proceso de saneamiento**: antes de publicar cualquier material se revisa que no incluya nombres reales, identificadores, contactos, rutas internas ni configuración del entorno operativo.
- **Sin secretos**: el repositorio no contiene credenciales, claves, cadenas de conexión ni configuración sensible de ningún tipo.
- **Sin lógica propietaria**: las reglas internas de parsing (el núcleo diferencial del producto) no se incluyen; la documentación del pipeline es deliberadamente conceptual.

## Resumen de garantías

| Garantía | Cómo se cumple |
|---|---|
| Los datos no salen del dispositivo por defecto | Modo invitado local-first; OCR en el navegador |
| El documento original no se retiene | Solo se conservan los datos estructurados confirmados |
| Nada se escribe sin revisión | Vista previa editable y confirmación explícita |
| El aislamiento entre organizaciones es real | Validación de pertenencia en el servidor, no en el cliente |
| Probar la sincronización no arriesga datos | Migración one-shot que conserva la copia local |
