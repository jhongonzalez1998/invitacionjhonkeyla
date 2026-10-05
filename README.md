# Confirmación para invitaciones físicas

Página independiente de la invitación digital. Un enlace general para todos. Incluye animación de entrada y selección; aceptar rellena el corazón en café y rechazar muestra una marca discreta, sin corazón negro. Solo se guarda al pulsar Confirmar y guardar respuesta.

## Crear la hoja nueva
Crea una hoja vacía para estas confirmaciones. En Extensiones → Apps Script pega el contenido de google/Conexion.gs. Ejecuta configurar y autoriza el acceso a esa hoja. Se crearán los encabezados automáticamente. No uses la hoja ni el script de la invitación digital.

En Configuración del proyecto → Propiedades de la secuencia de comandos, copia el valor RSVP_KEY. Mantenlo privado. Implementa como Aplicación web, ejecutar como tú y acceso Cualquier usuario. Conserva el enlace que termina en /exec.

## Vercel
Crea un repositorio NUEVO y sube el contenido de esta carpeta. Importa en Vercel, Framework Other. Antes de Deploy configura:
PHYSICAL_RSVP_URL: dirección /exec del script NUEVO.
PHYSICAL_RSVP_KEY: valor RSVP_KEY de sus propiedades.
No reemplaces las variables ni el proyecto de la invitación digital.

No se guardan respuestas hasta configurar estas variables y activar Apps Script. El formulario solo anuncia éxito cuando Google confirma el guardado. Prueba el flujo publicado antes de compartirlo.

## Campos de la hoja (A1:H1)
Fecha de respuesta | ID de invitación | Invitado o familia | ¿Asistirá? | Personas confirmadas | Nombres de los invitados | Restricciones alimentarias | Contacto

El contacto y las restricciones son opcionales. Si responde No, se guardan cero asistentes. La cantidad admite entre 1 y 100; es un límite técnico, no un cupo asignado. El mismo navegador actualiza su respuesta al reenviar; otra familia o dispositivo puede crear otra fila. El formulario conserva la fecha límite del ejemplo: 1 de noviembre.

La clave se configura en Vercel, nunca dentro del HTML ni en GitHub. El archivo de Apps Script incluido no contiene una clave real: la genera configurar dentro de tu cuenta.
