/**
 * Galería / collage de fotos (ej. clínica).
 * Las imágenes se leen de config/content.json → gallery.images
 * y se sirven desde img/fotos-clinica/
 */
const GALLERY_BASE_PATH = 'img/fotos-clinica/';

export function renderGallery(galleryData) {
  if (!galleryData || !galleryData.images || galleryData.images.length === 0) return '';

  const images = galleryData.images;
  const title = galleryData.title || 'Fotos';
  const subtitle = galleryData.subtitle || '';

  const itemsHTML = images
    .map((filename, index) => {
      const src = GALLERY_BASE_PATH + encodeURIComponent(filename);
      const isLarge = index === 0 || (images.length >= 8 && index === 4);
      const sizeClass = isLarge ? 'gallery-item--large' : 'gallery-item--small';
      return `
        <div class="gallery-item ${sizeClass}" role="button" tabindex="0" data-index="${index}" data-src="${src}" aria-label="Ver foto ${index + 1}">
          <img src="${src}" alt="${title} ${index + 1}" loading="lazy">
        </div>
      `;
    })
    .join('');

  return `
    <section id="fotos" class="gallery-section">
      <div class="container">
        <div class="section-title">
          <span>Espacio</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="gallery-collage">
          ${itemsHTML}
        </div>
      </div>
      <div id="gallery-lightbox" class="gallery-lightbox" aria-hidden="true">
        <button type="button" class="gallery-lightbox-close" aria-label="Cerrar">
          <i class="fas fa-times"></i>
        </button>
        <button type="button" class="gallery-lightbox-prev" aria-label="Foto anterior">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="gallery-lightbox-image-wrap">
          <img id="gallery-lightbox-img" src="" alt="">
        </div>
        <button type="button" class="gallery-lightbox-next" aria-label="Siguiente foto">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  `;
}
