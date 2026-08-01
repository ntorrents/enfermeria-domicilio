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
                        <a href="/contacto" class="btn btn-primary">
                            ${heroData.primaryButton} <svg width="1em" height="1em" viewBox="0 0 448 512" fill="currentColor" style="vertical-align: -0.125em; margin-left: 4px;" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                        </a>
                        <a href="#servicios" class="btn btn-secondary">
                            ${heroData.secondaryButton}
                        </a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="hero-image-wrapper">
                        <img 
                            src="/img/christine/christine-portada.webp" 
                            alt="Dermoestética Christine Cano" 
                            class="hero-img-main" 
                            width="450" height="550" 
                            loading="eager" 
                            fetchpriority="high"
                        >
                    </div>
                </div>
            </div>
        </section>
    `;
}