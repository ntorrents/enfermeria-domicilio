/**
 * Lazy loading de recursos no críticos (Font Awesome).
 * Se ejecuta al primer evento de interacción del usuario para no penalizar el FCP/LCP.
 */
let scriptsLoaded = false;

function loadLazyScripts() {
    if (scriptsLoaded) return;
    scriptsLoaded = true;

    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(event => {
        window.removeEventListener(event, loadLazyScripts);
    });

    const faStyle = document.createElement('link');
    faStyle.rel = 'stylesheet';
    faStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    faStyle.crossOrigin = 'anonymous';
    document.head.appendChild(faStyle);
}

['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(event => {
    window.addEventListener(event, loadLazyScripts, { passive: true, once: true });
});
