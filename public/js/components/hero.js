// Exportamos solo la función renderHero
export function renderHero(heroData) {
    // Validamos que existan datos para evitar errores
    if (!heroData) return '';

    return `
        <section id="inicio" class="hero">
            <div class="container hero-content">
                <div class="hero-text">
                    <span class="badge">Dermoestética & Imagen Corporal</span>
                    <h1>${heroData.title}</h1>
                    <p>${heroData.subtitle}</p>
                    <div class="hero-actions">
                        <a href="#contacto" class="btn btn-primary">
                            ${heroData.primaryButton} <i class="fas fa-arrow-right"></i>
                        </a>
                        <a href="#servicios" class="btn btn-secondary">
                            ${heroData.secondaryButton}
                        </a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="hero-image-wrapper">
                        <picture>
                            <source srcset="../img/christine/christinephoto2-mobile.webp" media="(max-width: 768px)" type="image/webp">
                            <source srcset="../img/christine/christinephoto2.webp" type="image/webp">
                            <img 
                                src="img/christinephoto2.jpeg" 
                                alt="Dermoestética" 
                                class="hero-img-main" 
                                width="450" height="550" 
                                loading="eager" 
                                fetchpriority="high"
                            >
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    `;
}