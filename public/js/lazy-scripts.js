/**
 * Lazy loading de scripts de terceros (EmailJS)
 * Se ejecuta al primer evento de interacción del usuario para no penalizar el FCP/LCP.
 */
let scriptsLoaded = false;

function loadLazyScripts() {
    if (scriptsLoaded) return;
    scriptsLoaded = true;

    // Load EmailJS
    const emailJsScript = document.createElement('script');
    emailJsScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    emailJsScript.onload = () => {
        const configScript = document.createElement('script');
        configScript.src = "/emailjs-config.js?v=202608011245";
        document.body.appendChild(configScript);
    };
    document.body.appendChild(emailJsScript);

    // Limpiar event listeners una vez cargado
    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(event => {
        window.removeEventListener(event, loadLazyScripts);
    });

    // Cargar FontAwesome de forma asíncrona
    const faStyle = document.createElement('link');
    faStyle.rel = 'stylesheet';
    faStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faStyle.crossOrigin = 'anonymous';
    document.head.appendChild(faStyle);
}

// Iniciar a la primera interacción
['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(event => {
    window.addEventListener(event, loadLazyScripts, { passive: true, once: true });
});
