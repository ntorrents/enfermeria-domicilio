/**
 * Tratamientos que tienen packs de sesiones (1, 3 y/o 5).
 * - Bioestimulación: ambos (solo 1 y 3, ver abajo)
 * - Diatermia: ambos (1, 3 y 5)
 * - Microneedling: ambos (1, 3 y 5)
 * - Mesoterapia: SOLO corporal (1, 3 y 5)
 */
const TREATMENT_IDS_WITH_PACKS = [
  'bioestimulacion-exosomas',
  'bioestimulacion-total',
  'diatermia-cicatrices-fibrosis',
  'diatermia-postparto',
  'microneedling-facial',
  'microneedling-corporal',
  'mesoterapia-corporal'
];

/**
 * Tratamientos que solo tienen Pack 3 (no Pack 5).
 * Añade aquí el id del tratamiento si en el futuro quieres ocultar Pack 5
 * (o solo mostrar 1 y 3, o solo 1 y 5, etc.; para otros casos habría que
 * ampliar la lógica más abajo).
 */
const TREATMENT_IDS_PACK3_ONLY = [
  'bioestimulacion-exosomas',
  'bioestimulacion-total'
];

/**
 * Calcula el precio mostrado según tipo de venta.
 * - single: 1 sesión
 * - pack3: 3ª al 50% → total = 2.5 sesiones
 * - pack5: 4+1 gratis → total = 4 sesiones
 */
function getDisplayPrice(price, packType) {
  if (typeof price !== 'number') return null;
  switch (packType) {
    case 'pack3': return Math.round(price * 2.5);
    case 'pack5': return price * 4;
    default: return price;
  }
}

function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function renderServices(servicesData) {
  if (!servicesData || !Array.isArray(servicesData)) return '';

  const tabsHTML = servicesData
    .map((category, index) => {
      const slug = slugify(category.category);
      const isFirst = index === 0;
      return `
        <button type="button" class="services-tab ${isFirst ? 'active' : ''}" data-tab="${slug}" aria-selected="${isFirst}">
          ${escapeHTML(category.category)}
        </button>
      `;
    })
    .join('');

  const panelsHTML = servicesData
    .map((category, index) => {
      const slug = slugify(category.category);
      const isFirst = index === 0;
      const cardsHTML = category.treatments.map((t) => renderTreatmentCard(t)).join('');
      return `
        <div class="services-panel ${isFirst ? 'active' : ''}" id="panel-${slug}" role="tabpanel" aria-hidden="${!isFirst}">
          <div class="services-grid">
            ${cardsHTML}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <section id="servicios" class="services-section-cards">
      <div class="container">
        <div class="section-title">
          <span>Nuestras Especialidades</span>
          <h2>Catálogo de Tratamientos</h2>
          <p>Soluciones personalizadas para tu bienestar y belleza.</p>
        </div>

        <div class="services-tabs-wrapper" role="tablist" aria-label="Categorías de tratamientos">
          <div class="services-tabs">
            ${tabsHTML}
          </div>
        </div>

        <div class="services-panels">
          ${panelsHTML}
        </div>
      </div>

      <div id="treatment-modal" class="treatment-modal" role="dialog" aria-modal="true" aria-labelledby="treatment-modal-title" hidden>
        <div class="treatment-modal-overlay"></div>
        <div class="treatment-modal-dialog">
          <button type="button" class="treatment-modal-close" aria-label="Cerrar">
            <i class="fas fa-times"></i>
          </button>
          <div id="treatment-modal-body" class="treatment-modal-body"></div>
        </div>
      </div>
    </section>
  `;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function renderTreatmentCard(treatment) {
  const isComingSoon = treatment.comingSoon === true;
  const hasPacks = TREATMENT_IDS_WITH_PACKS.includes(treatment.id);
  const priceNum = typeof treatment.price === 'number' ? treatment.price : null;

  let cardClass = 'service-card treatment-card';
  if (isComingSoon) cardClass += ' coming-soon';
  if (treatment.id === 'consulta-gratuita') cardClass += ' card-highlight';

  let priceBlock;
  if (isComingSoon) {
    priceBlock = '<span class="service-price-tag service-price-tag--soon">Próximamente</span>';
  } else if (typeof treatment.price === 'string') {
    priceBlock = `<span class="service-price-tag">${escapeHTML(treatment.price)}</span>`;
  } else if (hasPacks && priceNum !== null) {
    const single = getDisplayPrice(priceNum, 'single');
    const pack3 = getDisplayPrice(priceNum, 'pack3');
    const pack5 = getDisplayPrice(priceNum, 'pack5');
    const onlyPack3 = TREATMENT_IDS_PACK3_ONLY.includes(treatment.id);
    const pack5Button = onlyPack3 ? '' : `
          <button type="button" class="pack-option" data-pack="pack5" data-total="${pack5}">
            <span class="pack-option-title">Pack 5 sesiones</span>
            <span class="pack-option-detail">5ª gratis</span>
            <span class="pack-option-price">${pack5}€ total</span>
          </button>`;
    priceBlock = `
      <div class="pack-box">
        <p class="pack-box-title">Packs</p>
        <div class="pack-selector" role="group" aria-label="Elegir sesión suelta o pack">
          <button type="button" class="pack-option active" data-pack="single" data-total="${single}">
            <span class="pack-option-title">1 sesión</span>
            <span class="pack-option-price">${single}€</span>
          </button>
          <button type="button" class="pack-option" data-pack="pack3" data-total="${pack3}">
            <span class="pack-option-title">Pack 3 sesiones</span>
            <span class="pack-option-detail">3ª al 50%</span>
            <span class="pack-option-price">${pack3}€ total</span>
          </button>
          ${pack5Button}
        </div>
        <p class="pack-price-display"><strong>${single}€</strong> por esta sesión</p>
      </div>
    `;
  } else if (priceNum !== null) {
    priceBlock = `<span class="service-price-tag">${priceNum}€</span>`;
  } else {
    priceBlock = '';
  }

  const description = escapeHTML(treatment.description || 'Descripción disponible próximamente.');
  const metaHTML = treatment.duration
    ? `<div class="card-meta"><span><i class="far fa-clock"></i> ${escapeHTML(treatment.duration)}</span></div>`
    : '';

  const verMasHTML = isComingSoon
    ? '<span class="btn btn-card disabled">Disponible pronto</span>'
    : `<button type="button" class="btn btn-card btn-ver-mas" data-treatment-id="${escapeHTML(treatment.id)}">Ver más <i class="fas fa-arrow-right"></i></button>`;

  return `
    <article class="${cardClass}" data-treatment-id="${escapeHTML(treatment.id)}">
      <div class="card-header">
        <div class="service-icon-box">
          <i class="${escapeHTML(treatment.icon)}"></i>
        </div>
        ${priceNum !== null && hasPacks ? '' : priceBlock}
      </div>
      <div class="card-body">
        <h4>${escapeHTML(treatment.title)}</h4>
        <p>${description}</p>
        ${metaHTML}
        ${hasPacks && priceNum !== null ? priceBlock : ''}
        <div class="card-footer">${verMasHTML}</div>
      </div>
    </article>
  `;
}

/**
 * Construye el HTML del contenido del modal de detalle (para uso desde interactions.js).
 * Mantiene la info de services.json por si se quiere ampliar después.
 */
export function buildTreatmentModalContent(treatment) {
  if (!treatment || !treatment.detail) return '';

  const d = treatment.detail;
  let detailsListHTML = '';
  const excludeTitles = ['Beneficios Clave', 'Sesiones', 'Resultados'];
  if (d.details && d.details.length > 0) {
    detailsListHTML = d.details
      .filter((item) => !excludeTitles.includes(item.title))
      .map((item) => {
        let text = item.text;
        if (item.icon && item.icon.includes('fa-euro-sign')) text = `${treatment.price}€ por sesión.`;
        if (item.icon && item.icon.includes('fa-clock')) text = treatment.duration;
        return `
          <div class="detail-item">
            <i class="${escapeHTML(item.icon)}"></i>
            <div class="detail-item-content">
              <h4>${escapeHTML(item.title)}</h4>
              <p>${escapeHTML(text || '')}</p>
            </div>
          </div>
        `;
      })
      .join('');
  }

  const reserveHref = `index.html?service=${encodeURIComponent(treatment.id)}#contacto`;
  return `
    <h2 id="treatment-modal-title" class="treatment-modal-title">${escapeHTML(treatment.title)}</h2>
    ${d.description ? `<p class="treatment-modal-description">${escapeHTML(d.description)}</p>` : ''}
    <div class="details-list">${detailsListHTML}</div>
    <a href="${reserveHref}" class="btn btn-primary btn-block">Reservar este tratamiento</a>
  `;
}

export { TREATMENT_IDS_WITH_PACKS, getDisplayPrice };
