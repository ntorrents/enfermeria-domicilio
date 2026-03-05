/**
 * Cache busting: inyecta BUILD_ID en todas las URLs de assets locales en los HTML.
 * Ejecutar en el build de Vercel (Build Command) para que cada deploy tenga URLs únicas.
 * Solo usa módulos nativos de Node (fs, path) para no depender de npm install.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const HTML_FILES = ['index.html', '404.html', 'legal.html', 'privacidad.html', 'treatment-detail.html'];

// BUILD_ID: único por deploy. Vercel inyecta VERCEL_GIT_COMMIT_SHA; si no, timestamp.
const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  `t${Date.now()}`;

function injectVersion(html) {
  let out = html;

  // CSS locales: ./css/foo.css o ./css/foo.css?v=2.0 -> ?v=BUILD_ID
  out = out.replace(
    /(href|src)=["'](\.\/)?(css\/[^"']+?)(\?v=[^"']*)?["']/gi,
    (_, attr, slash, rest) => `${attr}="${slash || ''}${rest}?v=${BUILD_ID}"`
  );

  // JS locales: ./js/foo.js o ./emailjs-config.js
  out = out.replace(
    /(src)=["'](\.\/)?(js\/[^"']+?|emailjs-config\.js)(\?v=[^"']*)?["']/gi,
    (_, attr, slash, rest) => `${attr}="${slash || ''}${rest}?v=${BUILD_ID}"`
  );

  // Imágenes locales en href (preload) o src: img/... o ./img/...
  out = out.replace(
    /(href|src)=["'](\.\/)?(img\/[^"']+?)(\?v=[^"']*)?["']/gi,
    (_, attr, slash, rest) => `${attr}="${slash || ''}${rest}?v=${BUILD_ID}"`
  );

  // srcset (picture): img/foo.webp 1x, img/bar.webp 2x -> añadir ?v=BUILD_ID a cada URL
  out = out.replace(
    /srcset=["']([^"']+)["']/gi,
    (match, content) => {
      const newContent = content
        .split(',')
        .map(part => {
          const trimmed = part.trim();
          const urlMatch = trimmed.match(/^([^\s]+)(\s+[\d.]+x)?$/);
          if (urlMatch && (urlMatch[1].startsWith('img/') || urlMatch[1].startsWith('./img/'))) {
            const url = urlMatch[1].replace(/\?v=[^&]+$/, '');
            return `${url}?v=${BUILD_ID}${urlMatch[2] || ''}`;
          }
          return trimmed;
        })
        .join(', ');
      return `srcset="${newContent}"`;
    }
  );

  return out;
}

function main() {
  console.log(`[cache-version] BUILD_ID=${BUILD_ID}`);

  for (const file of HTML_FILES) {
    const filePath = path.join(PUBLIC_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`[cache-version] No existe: ${file}`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = injectVersion(content);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`[cache-version] Actualizado: ${file}`);
    }
  }

  console.log('[cache-version] Listo.');
}

main();
