import { t } from '../i18n.js?v=202608051425';

export function renderGiftCard() {
    return `
    <section id="tarjeta-regalo" class="giftcard-section">
        <div class="container giftcard-container">
            <div class="giftcard-content">
                <div class="giftcard-text">
                    <span class="badge badge--gift">${t('giftcardHome.badge')}</span>
                    <h2>${t('giftcardHome.title')}</h2>
                    <p class="giftcard-subtitle">${t('giftcardHome.subtitle')}</p>
                    
                    <p class="giftcard-desc">
                        ${t('giftcardHome.desc')}
                    </p>
                    
                    <ul class="giftcard-features">
                        <li><i class="fas fa-box-open"></i> ${t('giftcardHome.feature1')}</li>
                        <li><i class="fas fa-hand-holding-heart"></i> ${t('giftcardHome.feature2')}</li>
                        <li><i class="fas fa-calendar-alt"></i> ${t('giftcardHome.feature3')}</li>
                    </ul>
                    
                    <a href="/tarjeta-regalo" class="btn btn-primary giftcard-btn">${t('giftcardHome.cta')} <i class="fas fa-gift"></i></a>
                </div>
                
                <div class="giftcard-gallery giftcard-gallery--2-items">
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
