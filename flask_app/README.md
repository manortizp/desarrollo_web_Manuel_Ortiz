# desarrollo_web_Tu_Nombre

Aplicación desarrollada en **Python con Flask** para gestionar actividades recreativas. El proyecto sigue una estructura MVC, e incluye rutas Flask, plantillas HTML5, hojas de estilo CSS3, validaciones en JavaScript y persistencia de datos usando SQLAlchemy con una base de datos MySQL.

# Actividades Recreativas Web App

## Características

- **Portada:**
  Muestra un mensaje de bienvenida, un menú con enlaces a:
  - Agregar actividad (`/agregar`)
  - Ver listado de actividades (`/actividades`)
  - Estadísticas (pendiente)
  
  También presenta los últimos 5 eventos registrados en la base de datos con el formato definido en la Tarea 1.

- **Formulario de Actividades:**
  Permite informar una nueva actividad mediante un formulario dividido en secciones (ubicación, organizador, contenido). Incluye:
  - Validaciones en **JavaScript** (cliente) y **Python** (servidor).
  - Envío de datos a una ruta de Flask para validación e inserción en las tablas:
    `actividad`, `actividad_tema`, `contactar_por`, `foto`.
  - Manejo de múltiples temas y medios de contacto.
  - Subida y almacenamiento de archivos.

- **Listado de Actividades:**
  Página que muestra las actividades registradas en la base de datos, en una tabla paginada de 5 elementos por vista.
  Al hacer clic sobre una fila, se muestra el detalle completo de la actividad con los datos almacenados y sus imágenes asociadas.

- **Estadísticas:**
  Esta sección se implementará en una tarea futura.

## Tecnologías Utilizadas

- **Python 3 & Flask:**  
  Para la lógica del backend y definición de rutas.

- **MySQL + SQLAlchemy:**  
  Para persistencia de datos con mapeo objeto-relacional.

- **HTML5 & CSS3:**  
  Para la estructura y estilo de las páginas.

- **JavaScript:**  
  Para validaciones del formulario y mejoras interactivas.

## Estructura del Proyecto

