import { t, getLang } from '../i18n.js?v=202609131730';

export function renderFooter(siteInfo, footerData) {
    if (!siteInfo || !footerData) return '';

    const isCa = getLang() === 'ca';
    const legalHref = isCa ? '/legal-ca.html' : '/legal.html';
    const privacyHref = isCa ? '/privacidad-ca.html' : '/privacidad.html';

    return `
        <footer class="footer">
            <div class="footer-media" aria-hidden="true">
                <img
                    src="/img/hero-marble-terracotta.webp"
                    alt=""
                    class="footer-media-img"
                    width="1600"
                    height="703"
                    loading="lazy"
                >
                <div class="footer-media-overlay"></div>
            </div>
            <div class="container footer-grid">
                <div class="footer-brand">
                    <img 
                        src="/img/Logo C3 svg.svg" 
                        alt="Logo C3linic" 
                        class="logo-img-footer" 
                        width="72" height="72" 
                        loading="eager" 
                    >
                    <h3 class="brand-wordmark footer-wordmark">C<b>3</b>LINIC</h3>
                    <p class="footer-description">${footerData.description}</p>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">${t('header.services')}</h4>
                    <ul class="footer-nav">
                        <li><a href="/#servicios">${t('header.treatments')}</a></li>
                        <li><a href="/tarjeta-regalo">${t('header.giftCard')}</a></li>
                        <li><a href="/cuidados-post-tratamiento">${t('header.postCare')}</a></li>
                        <li><a href="/recomendador">${t('header.recommender').replace(/✨\s*/g, '')}</a></li>
                        <li><a href="/contacto">${t('header.contact')}</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-col-title">${t('footer.legal')}</h4>
                    <ul class="footer-nav">
                        <li><a href="${legalHref}">${t('footer.legal')}</a></li>
                        <li><a href="${privacyHref}">${t('footer.privacy')}</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container footer-bottom-inner">
                    <p>${footerData.copyright}</p>
                    <p class="footer-credit">
                        ${t('footer.developedBy')} <a href="https://www.baseclinica.com" target="_blank" rel="noopener noreferrer">Base Clinica</a>
                    </p>
                </div>
            </div>
        </footer>
    `;
}
