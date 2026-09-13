import { t, getLang } from '../i18n.js?v=202608051425';

export function renderFooter(siteInfo, footerData) {
    if (!siteInfo || !footerData) return '';

    const isCa = getLang() === 'ca';
    const legalHref = isCa ? '/legal-ca.html' : '/legal.html';
    const privacyHref = isCa ? '/privacidad-ca.html' : '/privacidad.html';

    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <img 
                        src="/img/Logo C3 svg.svg" 
                        alt="Logo C3linic" 
                        class="logo-img-footer" 
                        width="100" height="100" 
                        loading="eager" 
                    >
                    <h3 style="font-weight: 400; font-family: 'Codec Pro', sans-serif;">C<b style="font-weight: 700;">3</b>LINIC</h3>
                    <p class="footer-description">${footerData.description}</p>
                </div>
                <div class="footer-links-legal">
                    <a href="${legalHref}">${t('footer.legal')}</a> | 
                    <a href="${privacyHref}">${t('footer.privacy')}</a>
                </div>
                <div class="footer-bottom">
                    <p>${footerData.copyright}</p>
                    <p style="margin-top: 0.8rem; font-size: 0.75rem; color: var(--text-muted); opacity: 0.8;">
                        ${t('footer.developedBy')} <a href="https://www.baseclinica.com" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted); font-weight: 500; text-decoration: underline; text-underline-offset: 3px;"><i class="fas fa-laptop-medical" style="margin-right: 4px; font-size: 0.7rem;"></i>Base Clinica</a>
                    </p>
                </div>
            </div>
        </footer>
    `;
}
