import { t } from '../i18n.js?v=202608051425';

export function renderHero(heroData) {
    if (!heroData) return '';

    return `
        <section id="inicio" class="hero">
            <div class="container hero-content">
                <div class="hero-text">
                    <span class="badge">${t('hero.badge')}</span>
                    <h1>${heroData.title}</h1>
                    <p>${heroData.subtitle}</p>
                    <div class="hero-actions">
                        <a href="#servicios" class="btn btn-primary">
                            ${heroData.primaryButton} <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor" style="vertical-align: -0.125em; margin-left: 4px;" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                        </a>
                        <a href="/contacto" class="btn btn-secondary">
                            ${heroData.secondaryButton}
                        </a>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="hero-image-wrapper">
                        <img 
                            src="/img/christine/christine-portada.webp" 
                            alt="${t('hero.alt')}" 
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
