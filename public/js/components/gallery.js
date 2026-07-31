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

  const seoAltTags = [
    "Consulta médica dermoestética C3linic en Terrassa",
    "Camilla de tratamiento dermoestético",
    "Christine Cano enfermera dermoestética"
  ];

  const itemsHTML = [...images, ...images]
    .map((filename, index) => {
      const src = GALLERY_BASE_PATH + encodeURIComponent(filename);
      const originalIndex = index % images.length;
      const altText = seoAltTags[originalIndex % seoAltTags.length];
      return `
        <div class="gallery-item" role="button" tabindex="0" data-index="${originalIndex}" data-src="${src}" aria-label="Ver foto ${originalIndex + 1}">
          <img src="${src}" alt="${altText}" loading="lazy">
        </div>
      `;
    })
    .join('');

  return `
    <section id="fotos" class="gallery-section">
      <div class="container">
        <div class="section-title animate-on-scroll">
          <span>Espacio</span>
          <h2>${title}</h2>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        <div class="gallery-marquee-wrapper">
          <div class="gallery-marquee-track">
            ${itemsHTML}
          </div>
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
