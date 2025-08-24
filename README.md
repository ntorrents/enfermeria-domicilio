# Página Web de Enfermería a Domicilio

## 📋 Descripción
Esta es una página web profesional para servicios de enfermería a domicilio, diseñada específicamente para personas mayores y pacientes con movilidad reducida.

## 🎯 Sistema Modular - Fácil Edición

La página ahora utiliza un **sistema modular** que separa el contenido del código, haciendo que sea muy fácil de editar sin tocar HTML, CSS o JavaScript.

### 📝 Cómo Editar el Contenido

**¡Solo necesitas editar un archivo: `config.json`!**

Este archivo contiene toda la información de la página:

#### 🏠 Información General
```json
"siteInfo": {
  "title": "Título de la página",
  "brandName": "Nombre de tu marca",
  "phone": "Tu teléfono",
  "email": "Tu email",
  "schedule": "Tus horarios",
  "coverage": "Zona de cobertura"
}
```

#### 👩‍⚕️ Sección "Sobre Mí"
```json
"aboutMe": {
  "name": "Tu nombre",
  "title": "Tu título profesional",
  "collegiateNumber": "Tu número de colegiada",
  "intro": "Tu presentación personal",
  "education": ["Formación 1", "Formación 2", ...],
  "coverageZones": ["Zona 1", "Zona 2", ...]
}
```

#### 💉 Servicios
```json
"services": [
  {
    "id": "identificador-unico",
    "icon": "fas fa-icono",
    "title": "Nombre del servicio",
    "description": "Descripción del servicio",
    "price": 25
  }
]
```

#### 📦 Packs
```json
"packs": [
  {
    "id": "pack-basico",
    "title": "Pack Básico",
    "price": 35,
    "originalPrice": 45,
    "featured": false,
    "services": ["Servicio 1", "Servicio 2", ...]
  }
]
```

### ✏️ Ejemplos de Edición Común

#### Cambiar tu información personal:
1. Abre `config.json`
2. Busca la sección `"aboutMe"`
3. Cambia `"name"` por tu nombre real
4. Actualiza `"collegiateNumber"` con tu número
5. Modifica `"intro"` con tu presentación
6. Guarda el archivo

#### Añadir una nueva zona de cobertura:
1. En `config.json`, busca `"coverageZones"`
2. Añade la nueva zona: `"Nueva Localidad"`
3. Guarda el archivo

#### Cambiar precios:
1. Para servicios individuales: busca `"services"` y cambia el `"price"`
2. Para packs: busca `"packs"` y cambia `"price"` y `"originalPrice"`
3. Guarda el archivo

#### Añadir un nuevo servicio:
```json
{
  "id": "nuevo-servicio",
  "icon": "fas fa-stethoscope",
  "title": "Nuevo Servicio",
  "description": "Descripción del nuevo servicio",
  "price": 30
}
```

### 🔄 Cómo Ver los Cambios

1. Edita `config.json`
2. Guarda el archivo
3. Recarga la página en el navegador
4. ¡Los cambios aparecen automáticamente!

## 📁 Estructura de Archivos

```
├── index.html          # Estructura base (NO editar)
├── styles.css          # Estilos (NO editar)
├── script.js           # Funcionalidades (NO editar)
├── components.js       # Sistema de componentes (NO editar)
├── config.json         # ¡EDITA ESTE ARCHIVO!
└── README.md           # Este archivo de instrucciones
```

## 🚀 Cómo Usar

### Desarrollo Local
1. Abre una terminal en la carpeta del proyecto
2. Ejecuta: `python3 -m http.server 8000`
3. Abre tu navegador en: `http://localhost:8000`

### Subir a Internet
1. Sube todos los archivos a tu hosting
2. Asegúrate de que `config.json` esté en la misma carpeta que `index.html`
3. ¡Listo!

## ✨ Ventajas del Sistema Modular

- **Fácil edición**: Solo editas un archivo JSON
- **Sin errores**: No tocas código HTML/CSS/JS
- **Rápido**: Los cambios se ven inmediatamente
- **Mantenible**: Separación clara entre contenido y diseño
- **Escalable**: Fácil añadir nuevos servicios o secciones

## 🎨 Personalización Avanzada

### Cambiar Colores
Si quieres cambiar el color principal (#4d839e), edita `styles.css` y busca todas las apariciones de este color.

### Añadir Nuevas Secciones
1. Añade la nueva sección en `config.json`
2. Crea el componente en `components.js`
3. Añádelo al método `renderPage()`

## 🆘 Solución de Problemas

### La página no carga el contenido
- Verifica que `config.json` esté en la misma carpeta
- Comprueba que el JSON sea válido (usa un validador online)
- Revisa la consola del navegador (F12) para errores

### Los cambios no se ven
- Recarga la página con Ctrl+F5 (fuerza la recarga)
- Verifica que guardaste `config.json`
- Comprueba que no hay errores de sintaxis en el JSON

## 📞 Soporte

Si necesitas ayuda:
1. Revisa este README
2. Verifica que el JSON sea válido
3. Comprueba la consola del navegador
4. Haz una copia de seguridad antes de cambios importantes

---

**¡Ahora puedes editar tu página web fácilmente sin tocar código!** 🎉