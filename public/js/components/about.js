import { t } from '../i18n.js?v=202609131710';

export function renderAbout(aboutData) {
    if (!aboutData) return '';

    const educationHTML = aboutData.education
        .map(edu => `<li>${edu}</li>`)
        .join("");

    return `
        <section id="sobre-mi" class="about-section">
            <div class="container about-layout">
                <div class="about-image-column reveal parallax-slow">
                    <figure class="about-figure">
                        <img 
                            src="/img/christine/christine-portada.webp" 
                            alt="${aboutData.name}" 
                            class="about-photo" 
                            width="400" 
                            height="500" 
                            loading="lazy"
                            onerror="this.classList.add('img-error');"
                        >
                    </figure>
                </div>
                
                <div class="about-content-column reveal reveal-delay-2">
                    <div class="section-title">
                        <span>01 / ${t('about.eyebrow')}</span>
                        <h2>${t('about.title')}</h2>
                    </div>

                    <div class="about-header">
                        <h3>${aboutData.name}</h3>
                        <p class="about-subtitle">
                            ${aboutData.title} · ${t('about.collegiate')} ${aboutData.collegiateNumber}
                        </p>
                    </div>
                    
                    <blockquote class="about-philosophy">
                        <p>${aboutData.intro}</p>
                    </blockquote>
                    
                    <div class="about-credentials">
                        <h4>${t('about.educationTitle')}</h4>
                        <ul>${educationHTML}</ul>
                    </div>

                    <div class="about-clinic-info">
                         <div class="info-item">
                            <span>${aboutData.clinicAddress}</span>
                         </div>
                         <div class="info-item">
                            <span>${aboutData.clinicNote}</span>
                         </div>
                    </div>
                    
                    <a href="/contacto" class="btn btn-primary">${t('about.cta')}</a>
                </div>
            </div>
        </section>
    `;
}
