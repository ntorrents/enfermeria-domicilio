import { renderHeader } from './components/header.js?v=202608041548';
import { renderHero } from './components/hero.js?v=202608041548';
import { renderTestBanner } from './components/test-banner.js?v=202608041548';
import { renderAbout } from './components/about.js?v=202608041548';
import { renderServices } from './components/services.js?v=202608041548';
import { renderTestimonials } from './components/testimonials.js?v=202608041548';
import { renderGallery } from './components/gallery.js?v=202608041548';
import { renderGiftCard } from './components/giftcard.js?v=202608041548';
import { renderFAQ } from './components/faq.js?v=202608041548';
import { renderGiftCardForm, initGiftCardFormLogic } from './components/giftcard-form.js?v=202608041548';
import { renderRecommender, initRecommenderLogic } from './components/recommender.js?v=202608041548';
import { renderContact } from './components/contact.js?v=202608041548';
import { renderFooter } from './components/footer.js?v=202608041548';
import { renderPostCare, initPostCareTabs } from './components/postcare.js?v=202608041548';

// Importamos la Lógica de Interacción
import { initializeInteractions } from './interactions.js?v=202608041548';

async function loadConfig() {
    try {
        const [general, content, services] = await Promise.all([
            fetch('/config/general.json').then(res => res.json()),
            fetch('/config/content.json').then(res => res.json()),
            fetch('/config/services.json').then(res => res.json())
        ]);
        return { ...general, ...content, services };
    } catch (error) {
        console.error("Error cargando configuración:", error);
        return null;
    }
}

async function initApp() {
    const config = await loadConfig();
    if (!config) return;

    window.__SERVICES_CONFIG = config.services;

    // 0. Render Header
    const headerElement = document.getElementById('site-header');
    if (headerElement) {
        headerElement.innerHTML = renderHeader();
    }

    // 1. Renderizado Condicional por Ruta
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

    // 2. Renderizado Footer (va fuera del app-content normalmente, o reemplaza el existente)
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.outerHTML = renderFooter(config.siteInfo, config.footer);
    }

    // 3. Títulos y Metadatos
    document.title = config.siteInfo.title;

    // 4. Inicializar Lógica (Event Listeners, Menús, Scroll)
    initializeInteractions();

    // 5. Ocultar Loader
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
    
    console.log("✅ C3LINIC App Iniciada Correctamente");
}

// Arrancamos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
