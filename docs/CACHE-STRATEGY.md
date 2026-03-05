# Estrategia de invalidación de caché

## Resumen

- **Cache busting**: En cada deploy, un script inyecta un `BUILD_ID` único en todas las URLs de assets (CSS, JS, imágenes) de los HTML. Así, cada despliegue genera URLs distintas y el navegador no sirve versión antigua desde caché.
- **Cabeceras Cache-Control**: Configuradas en `vercel.json`: HTML sin caché a largo plazo; assets con hash/versión con caché inmutable.
- **Service Worker**: No hay Service Worker en el proyecto; no es necesario ningún cambio en este aspecto.

---

## 1. Cache busting (versionado de archivos)

### Cómo funciona

- **Proyecto**: Sitio estático (sin Vite/Webpack). Los archivos están en `public/` con nombres fijos (`main.js`, `base.css`, etc.).
- **Solución**: En lugar de renombrar archivos a `[name].[hash].ext` (que requeriría un bundler), se usa un **query string** `?v=BUILD_ID` en todas las URLs de assets. Cada deploy tiene un `BUILD_ID` distinto, así que la URL cambia y el navegador pide el recurso de nuevo.

### Script: `scripts/inject-cache-version.js`

- **Cuándo se ejecuta**: En el **build de Vercel** (ver `buildCommand` en `vercel.json`).
- **Qué hace**:
  - Obtiene `BUILD_ID` de `VERCEL_GIT_COMMIT_SHA` (en Vercel) o, si no existe, de `VERCEL_GIT_COMMIT_REF` o de un timestamp.
  - Recorre los HTML en `public/`: `index.html`, `404.html`, `legal.html`, `privacidad.html`, `treatment-detail.html`.
  - En cada archivo, sustituye/añade `?v=BUILD_ID` en:
    - `href` de CSS locales (`./css/*.css`)
    - `src` de JS locales (`./js/*.js`, `./emailjs-config.js`)
    - `href`/`src` de imágenes locales (`./img/...`, `img/...`)
    - `srcset` de `<picture>` (cada URL de imagen).
- **Salida**: Los mismos HTML sobrescritos en `public/` con las URLs ya versionadas. El deploy sirve esos HTML.

### En el repositorio

- Los HTML se mantienen con `?v=2.0` (o similar) como valor por defecto. El script **solo se ejecuta en el build** y los reemplaza por `?v=BUILD_ID`. No es necesario subir los HTML ya “inyectados” al repo.

### Comando para probar en local

```bash
# Opcional: simular BUILD_ID
set VERCEL_GIT_COMMIT_SHA=test123   # Windows CMD
export VERCEL_GIT_COMMIT_SHA=test123   # Bash

node scripts/inject-cache-version.js
```

---

## 2. Cabeceras Cache-Control (Vercel)

Configuración en **`vercel.json`** → `headers`:

| Recurso        | Source (patrón)              | Cache-Control |
|----------------|------------------------------|----------------|
| HTML (raíz)    | `/`                          | `public, max-age=0, must-revalidate` |
| HTML (resto)   | `/(.*).(html|htm)`           | `public, max-age=0, must-revalidate` |
| JS, CSS        | `/(.*).(js|css)`             | `public, max-age=31536000, immutable` |
| Imágenes/fuentes | `/(.*).(jpg|jpeg|gif|png|webp|svg|ico|woff|woff2)` | `public, max-age=31536000, immutable` |
| JSON de config | `/config/(.*).json`          | `public, max-age=0, must-revalidate` |

- **HTML**: Siempre se revalida (max-age=0, must-revalidate), así en cada visita el navegador puede obtener el `index.html` nuevo con las URLs `?v=NUEVO_BUILD_ID`.
- **Assets con versión**: Como la URL cambia en cada deploy (`?v=BUILD_ID`), se puede cachear a largo plazo (1 año) e `immutable` sin riesgo de servir versión vieja.
- **Config JSON**: Se revalida siempre para que cambios en `config/*.json` se reflejen sin depender del BUILD_ID en el HTML.

---

## 3. Service Worker (PWA)

- **Estado**: No hay Service Worker registrado en el proyecto (no existe `sw.js`, `service-worker.js`, ni registro con `navigator.serviceWorker`).
- **Acción**: Ninguna. Si en el futuro se añade un SW, conviene:
  - Incluir el `BUILD_ID` (o versión) en la clave de caché o en la URL del SW.
  - En `install`/`activate`, usar `skipWaiting()` y `clients.claim()` si se quiere que la nueva versión pase a activa en cuanto esté instalada, y así evitar que usuarios queden con caché antigua del SW.

---

## Archivos modificados / creados

| Archivo | Cambio |
|---------|--------|
| `scripts/inject-cache-version.js` | **Nuevo**. Script que inyecta `BUILD_ID` en URLs de assets en los HTML. |
| `vercel.json` | Añadido `buildCommand`, `$schema` y `headers` con la política de Cache-Control anterior. |
| `docs/CACHE-STRATEGY.md` | **Nuevo**. Este documento. |

No se modifican los HTML en el repo para el cache busting: se dejan con `?v=2.0` y el build en Vercel los reescribe con `?v=BUILD_ID`.
