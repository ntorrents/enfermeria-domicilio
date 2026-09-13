import { t } from '../i18n.js?v=202609131730';

export function renderHero(heroData) {
    if (!heroData) return '';

    return `
        <section id="inicio" class="hero hero--marble">
            <div class="hero-media" aria-hidden="true">
                <img
                    src="/img/hero-marble-terracotta.webp"
                    alt=""
                    class="hero-media-img"
                    width="1600"
                    height="703"
                    loading="eager"
                    fetchpriority="high"
                >
                <div class="hero-media-overlay"></div>
            </div>
            <div class="container hero-content">
                <div class="hero-text">
                    <p class="hero-kicker reveal">${t('hero.badge')}</p>
                    <p class="hero-brand-name brand-wordmark reveal reveal-delay-1">C<b>3</b>LINIC</p>
                    <h1 class="reveal reveal-delay-2">${heroData.title}</h1>
                    <p class="hero-lead reveal reveal-delay-3">${heroData.subtitle}</p>
                    <div class="hero-actions reveal reveal-delay-4">
                        <a href="#servicios" class="btn btn-primary btn-hero">
                            ${heroData.primaryButton}
                        </a>
                        <a href="/contacto" class="hero-text-link">
                            ${heroData.secondaryButton}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
