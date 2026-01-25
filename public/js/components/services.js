export function renderServices(servicesData) {
    if (!servicesData) return '';

    const catalogHTML = servicesData.map(category => {
        const cardsHTML = category.treatments.map(treatment => {
            
            // LÓGICA NUEVA: Detectar si es "Próximamente"
            const isComingSoon = treatment.comingSoon === true;

            // 1. Clase extra para la tarjeta
            let cardClass = isComingSoon ? 'service-card coming-soon' : 'service-card';
            if (treatment.id === 'consulta-gratuita') {
                cardClass += ' card-highlight'; // "card-highlight" es el nombre que usaremos en CSS para la consulta gratis
            }

            // 2. Texto del precio (Si es coming soon, ponemos texto, si no, el precio)
            // const priceLabel = isComingSoon ? 'Próximamente' : `${treatment.price}€`;
            let priceLabel;
            if (isComingSoon) {
                priceLabel = 'Próximamente';
            } else if (typeof treatment.price === 'string') {
                // Si en el JSON pone "GRATIS" (es texto), se muestra tal cual sin €
                priceLabel = treatment.price; 
            } else {
                // Si es un número (ej: 45), le añadimos el €
                priceLabel = `${treatment.price}€`;
            }

            // 3. Botón (Enlace o Texto plano)
            const buttonHTML = isComingSoon 
                ? `<span class="btn btn-card disabled">Disponible pronto</span>`
                : `<a href="../treatment-detail.html?id=${treatment.id}" class="btn btn-card">
                      Ver Detalles <i class="fas fa-arrow-right"></i>
                   </a>`;

            return `
            <article class="${cardClass}">
                <div class="card-header">
                    <div class="service-icon-box">
                        <i class="${treatment.icon}"></i>
                    </div>
                    <span class="service-price-tag">${priceLabel}</span>
                </div>
                
                <div class="card-body">
                    <h4>${treatment.title}</h4>
                    <p>${treatment.description || "Descripción disponible próximamente."}</p>
                    
                    <div class="card-meta">
                        <span><i class="far fa-clock"></i> ${treatment.duration}</span>
                    </div>
                </div>
                
                ${/* ESTO ESTÁ COMENTADO PARA OCULTAR EL BOTÓN Y LA LÍNEA
                <div class="card-footer">
                    ${buttonHTML}
                </div>
                */ ""}
            </article>
        `}).join('');

        return `
            <div class="service-category-group">
                <h3 class="category-title">${category.category}</h3>
                <div class="services-grid">
                    ${cardsHTML}
                </div>
            </div>
        `;
    }).join('');

    return `
        <section id="servicios" class="services-section-cards">
            <div class="container">
                <div class="section-title">
                    <span>Nuestras Especialidades</span>
                    <h2>Catálogo de Tratamientos</h2>
                    <p>Soluciones personalizadas para tu bienestar y belleza.</p>
                </div>
                
                <div class="catalog-wrapper">
                    ${catalogHTML}
                </div>
            </div>
        </section>
    `;
}