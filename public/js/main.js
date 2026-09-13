import { renderHeader, initLangSwitcher } from './components/header.js?v=202608051425';
import { renderHero } from './components/hero.js?v=202608051425';
import { renderTestBanner } from './components/test-banner.js?v=202608051425';
import { renderAbout } from './components/about.js?v=202608051425';
import { renderServices } from './components/services.js?v=202608051425';
import { renderTestimonials } from './components/testimonials.js?v=202608051425';
import { renderGallery } from './components/gallery.js?v=202608051425';
import { renderGiftCard } from './components/giftcard.js?v=202608051425';
import { renderFAQ } from './components/faq.js?v=202608051425';
import { renderGiftCardForm, initGiftCardFormLogic } from './components/giftcard-form.js?v=202608051425';
import { renderRecommender, initRecommenderLogic } from './components/recommender.js?v=202608051425';
import { renderContact } from './components/contact.js?v=202608051425';
import { renderFooter } from './components/footer.js?v=202608051425';
import { renderPostCare, initPostCareTabs } from './components/postcare.js?v=202608051425';
import { initializeInteractions } from './interactions.js?v=202608051425';
import { detectLang, loadUI, configUrl, t } from './i18n.js?v=202608051425';

async function loadConfig(lang) {
    try {
        const [general, content, services] = await Promise.all([
            fetch(configUrl('general.json', lang)).then(res => res.json()),
            fetch(configUrl('content.json', lang)).then(res => res.json()),
            fetch(configUrl('services.json', lang)).then(res => res.json())
        ]);
        return { ...general, ...content, services };
    } catch (error) {
        console.error("Error cargando configuración:", error);
        return null;
    }
}

function applyMetaAndCookies() {
    const title = t('meta.homeTitle');
    if (title && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
        document.title = title;
    }
    const desc = t('meta.homeDescription');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && desc) metaDesc.setAttribute('content', desc);

    const cookieText = document.querySelector('#cookieBanner p');
    if (cookieText) {
        cookieText.innerHTML = `${t('cookies.text')} <a href="/privacidad.html">${t('cookies.privacy')}</a>.`;
    }
    const cookieBtn = document.querySelector('#acceptCookies');
    if (cookieBtn) cookieBtn.textContent = t('cookies.accept');
    const wa = document.querySelector('.whatsapp-float');
    if (wa) wa.setAttribute('aria-label', t('whatsapp'));
}

async function initApp() {
    const lang = detectLang();
    await loadUI(lang);

    const config = await loadConfig(lang);
    if (!config) return;

    window.__SERVICES_CONFIG = config.services;

    const headerElement = document.getElementById('site-header');
    if (headerElement) {
        headerElement.innerHTML = renderHeader();
        initLangSwitcher();
    }

    const appContainer = document.getElementById('app-content');
    if (appContainer) {
        const path = window.location.pathname;

        if (path === '/' || path === '/index.html') {
            appContainer.innerHTML = [
                renderHero(config.hero),
                renderTestBanner(),
                renderAbout(config.aboutMe),
                renderServices(config.services),
                renderTestimonials(config.testimonials),
                renderGallery(config.gallery),
                renderGiftCard(),
                renderFAQ()
            ].join('');
        } else if (path.startsWith('/contacto')) {
            appContainer.innerHTML = renderContact(config.siteInfo, config.services);
        } else if (path.startsWith('/cuidados-post-tratamiento')) {
            appContainer.innerHTML = renderPostCare();
            setTimeout(initPostCareTabs, 100);
        } else if (path.startsWith('/tarjeta-regalo')) {
            appContainer.innerHTML = renderGiftCardForm(config.services);
            setTimeout(() => initGiftCardFormLogic(config.services), 100);
        } else if (path.startsWith('/recomendador')) {
            appContainer.innerHTML = renderRecommender();
            setTimeout(() => initRecommenderLogic(config.services), 100);
        }
    }

    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.outerHTML = renderFooter(config.siteInfo, config.footer);
    }

    if (config.siteInfo?.title) {
        document.title = config.siteInfo.title;
    }

    applyMetaAndCookies();
    initializeInteractions();

    const loader = document.querySelector('.loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }

    console.log("✅ C3LINIC App Iniciada Correctamente");
}

document.addEventListener('DOMContentLoaded', initApp);
