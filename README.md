# desarrollo_web_Manuel_Ortiz

La aplicación esta dividida en 4 .html: index, agregar-actividad, listado y estadistica y 2 .js, en particular, scripts está asociado a index y formulario está asociado a agregar-actividad

# Actividades Recreativas Web App
## Características

- **Formulario de Actividades:**  
  Permite al usuario informar una nueva actividad. El formulario está dividido en secciones (Información del lugar, Datos del organizador, Información de la actividad).  
  Incluye validaciones en JavaScript, por ejemplo:
  - El campo de correo electrónico se valida con expresiones regulares.
  - La fecha de término se establece como mínimo 3 horas posterior a la fecha de inicio.
  - Se pueden agregar hasta 5 imágenes.

- **Listado de Actividades:**  
  Muestra las últimas actividades registradas en una tabla. Al hacer clic en una fila se despliega la información completa junto con una galería de imágenes, y se ofrecen opciones para volver al listado o a la portada.

- **Estadísticas y Gráficos:**  
  Gráficos que visualizan la distribución de las actividades en distintos periodos del día y meses del año.

## Tecnologías Utilizadas

- **HTML5 & CSS3:**  
  Para la estructura y estilos de la aplicación.

- **JavaScript:**  
  Lógica de validación, manipulación del DOM y generación dinámica de contenido.

## Instalación y Configuración

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/actividades-recreativas.git
