import { t, DETAIL_EXCLUDE_TITLES } from '../i18n.js?v=202608051425';

/**
 * Tratamientos que tienen packs de sesiones (1, 3 y/o 5).
 * - Bioestimulación: ambos (solo 1 y 3, ver abajo)
 * - Diatermia: ambos (1, 3 y 5)
 * - Microneedling: ambos (1, 3 y 5)
 * - Mesoterapia: SOLO corporal (1, 3 y 5)
 */
const TREATMENT_IDS_WITH_PACKS = [
	"bioestimulacion-exosomas",
	"bioestimulacion-total",
	"diatermia-cicatrices-fibrosis",
	"diatermia-postparto",
	"microneedling-facial",
	"microneedling-corporal",
	"maderoterapia-drenaje-linfatico",
	"mesoterapia-polinucleotidos",
];

/**
 * Tratamientos que solo tienen Pack 3 (no Pack 5).
 * Añade aquí el id del tratamiento si en el futuro quieres ocultar Pack 5
 * (o solo mostrar 1 y 3, o solo 1 y 5, etc.; para otros casos habría que
 * ampliar la lógica más abajo).
 */
const TREATMENT_IDS_PACK3_ONLY = [
	"bioestimulacion-exosomas",
	"bioestimulacion-total",
];

/**
 * Calcula el precio mostrado según tipo de venta.
 * - single: 1 sesión
 * - pack3: 3ª al 50% → total = 2.5 sesiones
 * - pack5: 4+1 gratis → total = 4 sesiones
 */
function getDisplayPrice(price, packType) {
	if (typeof price !== "number") return null;
	switch (packType) {
		case "pack3":
			return Math.round(price * 2.5);
		case "pack5":
			return price * 4;
		default:
			return price;
	}
}

function escapeHTML(str) {
	if (!str) return "";
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
}

export function renderServices(servicesData) {
	if (!servicesData || !Array.isArray(servicesData)) return "";

	const visibleServices = servicesData.filter(cat => !cat.hidden);

	const tabsHTML = visibleServices
		.map((category, index) => {
			const slug = slugify(category.category);
			const isFirst = index === 0;
			return `
		<button type="button" role="tab" class="services-tab ${isFirst ? "active" : ""}" data-tab="${slug}" aria-selected="${isFirst}">
          ${escapeHTML(category.category)}
        </button>
      `;
		})
		.join("");

	const panelsHTML = visibleServices
		.map((category, index) => {
			const slug = slugify(category.category);
			const isFirst = index === 0;
			const cardsHTML = category.treatments
				.filter((t) => !t.hidden)
				.map((t) => renderTreatmentCard(t))
				.join("");
			return `
        <div class="services-panel ${isFirst ? "active" : ""}" id="panel-${slug}" role="tabpanel" aria-hidden="${!isFirst}">
          <div class="services-grid">
            ${cardsHTML}
          </div>
        </div>
      `;
		})
		.join("");

	return `
    <section id="servicios" class="services-section-cards">
      <div class="container">
        <div class="section-title animate-on-scroll">
          <span>${t('services.eyebrow')}</span>
          <h2>${t('services.title')}</h2>
          <p>${t('services.subtitle')}</p>
        </div>

        <div class="services-tabs-wrapper animate-on-scroll" aria-label="${t('services.tabsAria')}">
          <div class="services-tabs" role="tablist">
            ${tabsHTML}
          </div>
          <div class="services-search-container">
            <button type="button" class="services-search-btn" aria-label="${t('services.searchAria')}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <input type="text" id="services-search-input" class="services-search-input" placeholder="${t('services.searchPlaceholder')}" aria-label="${t('services.searchInputAria')}">
          </div>
        </div>

        <div class="services-panels">
          ${panelsHTML}
        </div>
      </div>

      <div id="treatment-modal" class="treatment-modal" role="dialog" aria-modal="true" aria-labelledby="treatment-modal-title" hidden>
        <div class="treatment-modal-overlay"></div>
        <div class="treatment-modal-dialog">
          <button type="button" class="treatment-modal-close" aria-label="${t('services.close')}">
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
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

function renderTreatmentCard(treatment) {
	const isComingSoon = treatment.comingSoon === true;
	const hasPacks = TREATMENT_IDS_WITH_PACKS.includes(treatment.id);
	const priceNum = typeof treatment.price === "number" ? treatment.price : null;

	let cardClass = "service-card treatment-card";
	if (isComingSoon) cardClass += " coming-soon";
	if (treatment.id === "consulta-gratuita") cardClass += " card-highlight";

	let priceBlock;
	if (isComingSoon) {
		priceBlock = `<span class="service-price-tag service-price-tag--soon">${t('services.comingSoon')}</span>`;
	} else if (typeof treatment.price === "string") {
		priceBlock = `<span class="service-price-tag">${escapeHTML(treatment.price)}</span>`;
	} else if (priceNum !== null) {
		priceBlock = `<span class="service-price-tag">${priceNum}€</span>`;
	} else {
		priceBlock = "";
	}

	const description = escapeHTML(treatment.description || "");
	const metaHTML = treatment.duration
		? `<div class="card-meta"><span><i class="far fa-clock"></i> ${escapeHTML(treatment.duration)}</span></div>`
		: "";

	const verMasHTML = isComingSoon
		? `<span class="btn btn-card disabled">${t('services.availableSoon')}</span>`
		: `<button type="button" class="btn btn-card btn-ver-mas" data-treatment-id="${escapeHTML(treatment.id)}">${t('services.seeMore')} <i class="fas fa-arrow-right"></i></button>`;

	const packBadge = hasPacks ? `<div class="pack-badge"><i class="fas fa-layer-group"></i> ${t('services.packsAvailable')}</div>` : "";

	return `
    <article class="${cardClass} animate-on-scroll" data-treatment-id="${escapeHTML(treatment.id)}">
      <div class="card-header">
        <div class="service-icon-box">
          <i class="${escapeHTML(treatment.icon)}"></i>
        </div>
        ${priceBlock}
      </div>
      <div class="card-body">
        <h4>${escapeHTML(treatment.title)}</h4>
        <p>${description}</p>
        ${metaHTML}
        ${packBadge}
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
	if (!treatment || !treatment.detail) return "";

	const d = treatment.detail;
	let detailsListHTML = "";
	if (d.details && d.details.length > 0) {
		detailsListHTML = d.details
			.filter((item) => !DETAIL_EXCLUDE_TITLES.has(item.title))
			.map((item) => {
				let text = item.text;
				if (item.icon && item.icon.includes("fa-euro-sign"))
					text = `${treatment.price}€ ${t('services.perSessionDot')}`;
				if (item.icon && item.icon.includes("fa-clock"))
					text = treatment.duration;
				return `
          <div class="detail-item detail-item-${escapeHTML(item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, ''))}">
            <i class="${escapeHTML(item.icon)}"></i>
            <div class="detail-item-content">
              <h4>${escapeHTML(item.title)}</h4>
              <p>${escapeHTML(text || "")}</p>
            </div>
          </div>
        `;
			})
			.join("");
	}

	let packsInfoHTML = "";
	const hasPacks = TREATMENT_IDS_WITH_PACKS.includes(treatment.id);
	const priceNum = typeof treatment.price === "number" ? treatment.price : null;

	if (hasPacks && priceNum !== null) {
		const single = getDisplayPrice(priceNum, "single");
		const pack3 = getDisplayPrice(priceNum, "pack3");
		const pack5 = getDisplayPrice(priceNum, "pack5");
		const onlyPack3 = TREATMENT_IDS_PACK3_ONLY.includes(treatment.id);

		packsInfoHTML = `
      <div class="modal-pack-info">
        <h3>${t('services.packsTitle')}</h3>
        <ul class="modal-pack-list">
          <li>
            <div class="modal-pack-item-info">
              <strong>${t('services.session1')}</strong>
            </div>
            <div class="modal-pack-item-price">${single}€</div>
          </li>
          <li>
            <div class="modal-pack-item-info">
              <strong>${t('services.pack3Strong')}</strong>
              <span>${t('services.pack3Note')}</span>
            </div>
            <div class="modal-pack-item-price">${pack3}€</div>
          </li>
          ${!onlyPack3 ? `
          <li>
            <div class="modal-pack-item-info">
              <strong>${t('services.pack5Strong')}</strong>
              <span>${t('services.pack5Note')}</span>
            </div>
            <div class="modal-pack-item-price">${pack5}€</div>
          </li>` : ""}
        </ul>
      </div>
    `;
	}

    const reserveHref = `/contacto?servicio=${treatment.id}`;
	return `
    <h2 id="treatment-modal-title" class="treatment-modal-title">${escapeHTML(treatment.title)}</h2>
    ${d.description ? `<p class="treatment-modal-description">${escapeHTML(d.description)}</p>` : ""}
    <div class="details-list">${detailsListHTML}</div>
    ${packsInfoHTML}
    <a href="${reserveHref}" class="btn btn-primary btn-block">${t('services.reserve')}</a>
  `;
}

export { TREATMENT_IDS_WITH_PACKS, getDisplayPrice };
