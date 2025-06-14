# desarrollo_web_Manuel_Ortiz

Aplicación desarrollada en **Python con Flask** para gestionar actividades recreativas. El proyecto sigue una estructura MVC, e incluye rutas Flask, plantillas HTML5, hojas de estilo CSS3, validaciones en JavaScript y persistencia de datos usando SQLAlchemy con una base de datos MySQL.

# Actividades Recreativas Web App

## Características

- **Portada:**
  Muestra un mensaje de bienvenida, un menú con enlaces a:
  - Agregar actividad (`/agregar`)
  - Ver listado de actividades (`/actividades`)
  - Estadísticas (`/estadistica`)
  
  También presenta los últimos 5 eventos registrados en la base de datos con el formato definido en la Tarea 1.

- **Formulario para Agregar Actividades (/agregar):**
  Permite informar una nueva actividad mediante un formulario dividido en secciones (ubicación, organizador, contenido). Incluye:
  - Validaciones en **JavaScript** (cliente) y **Python** (servidor).
  - Envío de datos a una ruta de Flask para validación e inserción en las tablas:
    `actividad`, `actividad_tema`, `contactar_por`, `foto`.
  - Manejo de múltiples temas y medios de contacto.
  - Subida y almacenamiento de archivos.

- **Listado de Actividades (/listado):**
  Página que muestra las actividades registradas en la base de datos, en una tabla paginada de 5 elementos por vista.
  Al hacer clic sobre una fila, se muestra el detalle completo de la actividad con los datos almacenados y sus imágenes asociadas.
  En esta última versión se agregan comentarios de personas sobre la actividad, estos se almacenan con nombre, texto y fecha.

- **Estadísticas:**
 Página que muestra estadísticas sobre las actividades registradas.

Actualmente implementado el backend (/api/estadistica) que retorna:

- Actividades por día (línea de tiempo)
- Actividades por tipo (gráfico de torta)
- Actividades por franja horaria y mes (gráfico de barras)



## Tecnologías Utilizadas

- **Python 3 & Flask:**  
  Para la lógica del backend y definición de rutas.

- **MySQL + SQLAlchemy:**  
  Para persistencia de datos con mapeo objeto-relacional.

- **HTML5 & CSS3:**  
  Para la estructura y estilo de las páginas.

- **JavaScript:**  
  Para validaciones del formulario y mejoras interactivas.

- ** Highcharts:**
  Para mostrar gráficos sobre las características de las actividades.

## Instalación y ejecución

1. Crear y activar el entorno virtual dentro de flask_app:

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux / MacOS:
source venv/bin/activate
```

2. Instalar dependencias: 
```bash
pip install -r requirements.txt
```

3. Ejecutar flask:
```bash
flask run
```

## Estructura del Proyecto:
.
├── app.py                  # Lógica principal de la aplicación Flask
├── models.py               # Definición de modelos con SQLAlchemy
├── templates/              # Archivos HTML renderizados
│   ├── index.html
│   ├── agregar-actividad.html
│   ├── listado.html
│   └── estadistica.html
├── static/
│   └── uploads/            # Archivos subidos por los usuarios
└── README.md
