import { t } from '../i18n.js?v=202609131730';

export function renderGiftCard() {
    return `
    <section id="tarjeta-regalo" class="giftcard-section">
        <div class="container giftcard-container">
            <div class="giftcard-content">
                <div class="giftcard-text reveal">
                    <span class="badge badge--gift">06 / ${t('giftcardHome.badge')}</span>
                    <h2>${t('giftcardHome.title')}</h2>
                    <p class="giftcard-subtitle">${t('giftcardHome.subtitle')}</p>
                    
                    <p class="giftcard-desc">
                        ${t('giftcardHome.desc')}
                    </p>
                    
                    <ul class="giftcard-features">
                        <li>${t('giftcardHome.feature1')}</li>
                        <li>${t('giftcardHome.feature2')}</li>
                        <li>${t('giftcardHome.feature3')}</li>
                    </ul>
                    
                    <a href="/tarjeta-regalo" class="btn btn-primary giftcard-btn">${t('giftcardHome.cta')}</a>
                </div>
                
                <div class="giftcard-gallery giftcard-gallery--2-items reveal reveal-delay-2">
                    <div class="gift-img-wrapper img-1">
                        <img src="/img/giftcard-1.jpeg" alt="${t('giftcardHome.alt1')}" loading="lazy">
                    </div>
                    <div class="gift-img-wrapper img-2">
                        <img src="/img/giftcard-2.jpeg" alt="${t('giftcardHome.alt2')}" loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}
