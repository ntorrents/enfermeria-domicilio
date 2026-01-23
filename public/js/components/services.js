export function renderServices(servicesData) {
    if (!servicesData) return '';

    const catalogHTML = servicesData.map(category => {
        const cardsHTML = category.treatments.map(treatment => `
            <article class="service-card">
                <div class="card-header">
                    <div class="service-icon-box">
                        <i class="${treatment.icon}"></i>
                    </div>
                    <span class="service-price-tag">${treatment.price}€</span>
                </div>
                
                <div class="card-body">
                    <h4>${treatment.title}</h4>
                    <p>${treatment.description}</p>
                    
                    <div class="card-meta">
                        <span><i class="far fa-clock"></i> ${treatment.duration}</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <a href="treatment-detail.html?id=${treatment.id}" class="btn btn-card">
                        Ver Detalles <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');

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