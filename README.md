# C3linic - Dermoestética Avanzada

## 📋 Descripción
Landing page profesional para C3linic, centro de dermoestética avanzada dirigido por Christine Cano en Terrassa. Proyecto modular desarrollado en HTML, CSS y JS puro (Vanilla), altamente optimizado para rendimiento (Lighthouse) y SEO.

## 🏗️ Edición de Contenido
El contenido está totalmente separado del diseño. Para modificar textos, servicios o configuraciones, **solo debes editar los archivos JSON** que se encuentran en la carpeta `/config`:

* `config/general.json`: Información de contacto, redes sociales, horarios y configuración de integraciones (ej. EmailJS).
* `config/content.json`: Textos de las secciones principales de la web (Hero, Sobre mí, FAQ, Footer, etc.).
* `config/services.json`: Catálogo completo de tratamientos faciales y corporales, filtros, precios y tarjetas regalo.

## 📁 Estructura Principal de Archivos

├── index.html          # Estructura principal
├── config/             # Datos de la web en formato JSON
├── css/                # Estilos modulares (base, hero, services, etc.)
├── js/                 # Lógica en Javascript
│   ├── components/     # Scripts encargados de inyectar el JSON en cada sección
│   ├── utils/          # Herramientas globales (alertas Toast, etc.)
│   └── main.js         # Orquestador e inicializador
├── img/                # Imágenes de la web (optimizadas en WebP y SVG)
└── fonts/              # Tipografías locales (Codec Pro)


## 💻 Desarrollo Local
Para levantar el proyecto en tu ordenador, no es necesario instalar dependencias complejas (Node/NPM). Solo necesitas arrancar un servidor local en esta misma carpeta:

**Con Python:**
```bash
python3 -m http.server 8000