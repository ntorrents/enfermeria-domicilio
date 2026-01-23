export function renderAbout(aboutData) {
    if (!aboutData) return '';

    const educationHTML = aboutData.education
        .map(edu => `<li><i class="fas fa-check-circle"></i> ${edu}</li>`)
        .join("");

    return `
        <section id="sobre-mi" class="about-section">
            <div class="container">
                <div class="section-title">
                    <span>Tu Especialista de Confianza</span>
                    <h2>Conoce a Christine</h2>
                </div>
                
                <div class="about-layout">
                    <div class="about-image-column">
                        <img 
                            src="../img/christine/myphoto.jpeg" 
                            alt="${aboutData.name}" 
                            class="about-photo" 
                            width="400" 
                            height="500" 
                            loading="lazy"
                            onerror="this.classList.add('img-error');"
                        >
                    </div>
                    
                    <div class="about-content-column">
                        <div class="about-header">
                            <h3>${aboutData.name}</h3>
                            <p class="about-subtitle">
                                ${aboutData.title} (Colegiada Nº ${aboutData.collegiateNumber})
                            </p>
                        </div>
                        
                        <div class="about-philosophy">
                             <p>${aboutData.intro}</p>
                        </div>
                        
                        <div class="about-credentials">
                            <h4>Mi Formación</h4>
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
                        
                        <a href="#contacto" class="btn btn-primary">Reservar una Cita</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}