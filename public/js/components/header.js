import { t, getLang, setLang } from '../i18n.js?v=202609131710';

export function renderHeader() {
    const lang = getLang();
    const recommenderLabel = t('header.recommender').replace(/✨\s*/g, '');

    return `
        <nav class="nav container">
            <div class="nav-brand">
                <a href="/" class="nav-brand-link">
                    <img src="/img/Logo C3 svg.svg" alt="Logo C3linic" class="logo-img-header"
                        width="48" height="48" loading="eager" fetchpriority="high">
                    <span class="brand-wordmark">C<b>3</b>LINIC</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item has-dropdown">
                    <a href="/#servicios" class="nav-link">${t('header.services')}</a>
                    <ul class="dropdown-menu">
                        <li><a href="/#servicios">${t('header.treatments')}</a></li>
                        <li><a href="/tarjeta-regalo">${t('header.giftCard')}</a></li>
                        <li><a href="/cuidados-post-tratamiento">${t('header.postCare')}</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="/recomendador" class="nav-link">${recommenderLabel}</a></li>
                <li class="nav-item">
                    <a href="/contacto" class="btn btn-secondary btn-sm nav-btn">${t('header.contact')}</a>
                </li>
                <li class="nav-item lang-switcher-item">
                    <div class="lang-switcher" role="group" aria-label="Idioma / Llengua">
                        <button type="button" class="lang-btn ${lang === 'ca' ? 'active' : ''}" data-lang="ca" aria-pressed="${lang === 'ca'}" title="Català">CA</button>
                        <span class="lang-sep">/</span>
                        <button type="button" class="lang-btn ${lang === 'es' ? 'active' : ''}" data-lang="es" aria-pressed="${lang === 'es'}" title="Castellano">ES</button>
                    </div>
                </li>
            </ul>
            <div class="nav-toggle" role="button" tabindex="0" aria-label="${t('header.openMenu')}">
                <span></span><span></span><span></span>
            </div>
        </nav>
    `;
}

export function initLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && lang !== getLang()) setLang(lang);
        });
    });
}
