export function renderFooter(siteInfo, footerData) {
    if (!siteInfo || !footerData) return '';

    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <i class="fas fa-spa footer-icon"></i>
                    <h3>${siteInfo.brandName}</h3>
                    <p class="footer-description">${footerData.description}</p>
                </div>
                <div class="footer-links-legal">
                    <a href="legal.html">Aviso Legal</a> | 
                    <a href="privacidad.html">Política de Privacidad</a>
                </div>
                <div class="footer-bottom">
                    <p>${footerData.copyright}</p>
                </div>
            </div>
        </footer>
    `;
}