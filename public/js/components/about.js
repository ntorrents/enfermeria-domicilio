import { t } from '../i18n.js?v=202608051425';

export function renderAbout(aboutData) {
    if (!aboutData) return '';

    const educationHTML = aboutData.education
        .map(edu => `<li><i class="fas fa-check-circle"></i> ${edu}</li>`)
        .join("");

    return `
        <section id="sobre-mi" class="about-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>${t('about.eyebrow')}</span>
                    <h2>${t('about.title')}</h2>
                </div>
                
                <div class="about-layout">
                    <div class="about-image-column animate-on-scroll">
                        <img 
                            src="/img/christine/myphoto.webp" 
                            alt="${aboutData.name}" 
                            class="about-photo" 
                            width="400" 
                            height="500" 
                            loading="lazy"
                            onerror="this.classList.add('img-error');"
                        >
                    </div>
                    
                    <div class="about-content-column animate-on-scroll">
                        <div class="about-header">
                            <h3>${aboutData.name}</h3>
                            <p class="about-subtitle">
                                ${aboutData.title} (${t('about.collegiate')} ${aboutData.collegiateNumber})
                            </p>
                        </div>
                        
                        <div class="about-philosophy">
                             <p>${aboutData.intro}</p>
                        </div>
                        
                        <div class="about-credentials">
                            <h4>${t('about.educationTitle')}</h4>
                            <ul>
                                ${educationHTML}
                            </ul>
                        </div>

                        <div class="about-clinic-info">
                             <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${aboutData.clinicAddress}</span>
                             </div>
                             <div class="info-item">
                                <i class="fas fa-info-circle"></i>
                                <span>${aboutData.clinicNote}</span>
                             </div>
                        </div>
                        
                        <a href="/contacto" class="btn btn-primary">${t('about.cta')}</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
