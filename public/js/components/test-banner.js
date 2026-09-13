import { t } from '../i18n.js?v=202609131710';

export function renderTestBanner() {
    return `
        <section class="test-banner reveal">
            <div class="container test-banner-container">
                <div class="test-banner-copy">
                    <span class="test-banner-index">03 / ${t('testBanner.badge')}</span>
                    <h2>${t('testBanner.title')}</h2>
                    <p>${t('testBanner.text')}</p>
                </div>
                <a href="/recomendador" class="btn btn-primary test-banner-btn">
                    ${t('testBanner.cta')}
                </a>
            </div>
        </section>
    `;
}
