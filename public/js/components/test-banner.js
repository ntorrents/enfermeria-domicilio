export function renderTestBanner() {
    return `
        <section class="test-banner animate-on-scroll">
            <div class="container test-banner-container">
                <span class="badge test-banner-badge">¡NOVEDAD!</span>
                <h2>¿No sabes qué tratamiento es el ideal para ti?</h2>
                <p>Responde a unas breves preguntas y recibe una recomendación personalizada según las necesidades únicas de tu piel.</p>
                <a href="/recomendador" class="btn btn-primary test-banner-btn">
                    Hacer el Test ahora 
                    <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor" style="vertical-align: -0.125em; margin-left: 6px;" xmlns="http://www.w3.org/2000/svg"><path d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.7-53.3L160 80l-53.3-26.7L80 0 53.3 53.3 0 80l53.3 26.7L80 160zm352 128l-26.7 53.3L352 394.7l53.3 26.6L432 474.7l26.7-53.4L512 394.7l-53.3-26.6L432 288zm-54.9-54.9L121.7 488.5c-15.6 15.6-40.9 15.6-56.6 0L23.5 446.9c-15.6-15.6-15.6-40.9 0-56.6L278.9 134.9c15.6-15.6 40.9-15.6 56.6 0l41.6 41.6c15.6 15.6 15.6 40.9 0 56.6z"/></svg>
                </a>
            </div>
        </section>
    `;
}
