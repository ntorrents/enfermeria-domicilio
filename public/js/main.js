// Importamos Componentes
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
import { renderServices } from './components/services.js';
import { renderTestimonials } from './components/testimonials.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';

// Importamos la Lógica de Interacción
import { initializeInteractions } from './interactions.js';

async function loadConfig() {
    try {
        // Carga paralela de los 3 archivos JSON
        const [general, content, services] = await Promise.all([
            fetch('./config/general.json').then(res => res.json()),
            fetch('./config/content.json').then(res => res.json()),
            fetch('./config/services.json').then(res => res.json())
        ]);
        
        // Fusionamos todo en un solo objeto config
        return { ...general, ...content, services };
    } catch (error) {
        console.error("Error cargando configuración:", error);
        return null;
    }
}

async function initApp() {
    // Solo se ejecuta en la página principal
    if (!document.getElementById('app-content')) {
        return;
    }

    const config = await loadConfig();
    if (!config) return; // Si falla la carga, paramos

    const appContainer = document.getElementById('app-content');
    
    // 1. Renderizado Estático (HTML)
    appContainer.innerHTML = [
        renderHero(config.hero),
        renderAbout(config.aboutMe),
        renderServices(config.services),
        renderTestimonials(config.testimonials),
        renderContact(config.siteInfo, config.services)
    ].join('');

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
