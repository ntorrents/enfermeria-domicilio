// Sistema de Componentes Moderno y Renovado (Versión Dermoestética)
class EnfermeriaComponents {
	constructor(config) {
		this.config = config;
	}

	// 1. HERO MODERNO
	renderHero() {
		const { hero } = this.config;
		return `
            <section id="inicio" class="hero">
                <div class="container hero-content">
                    <div class="hero-text">
                        <span class="badge">Dermoestética & Imagen Corporal</span>
                        <h1>${hero.title}</h1>
                        <p>${hero.subtitle}</p>
                        <div class="hero-actions">
                            <a href="#contacto" class="btn btn-primary">
                                ${hero.primaryButton} <i class="fas fa-arrow-right"></i>
                            </a>
                            <a href="#servicios" class="btn btn-secondary">
                                ${hero.secondaryButton}
                            </a>
                        </div>
                    </div>
                    
                    <div class="hero-visual">
                        <div class="hero-image-wrapper">
                            <!-- Nueva imagen para la portada -->
                            <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" alt="Dermoestética y cuidado de la piel" class="hero-img-main" onerror="this.src='https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'">
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// 2. SOBRE MÍ
	renderAboutMe() {
		const { aboutMe } = this.config;
		const educationHTML = aboutMe.education
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
							<img src="./myphoto.jpeg" alt="${aboutMe.name}" class="about-photo"  onerror="this.style.display='none'">
						</div>
						
						<div class="about-content-column">
							<div class="about-header">
								<h3>${aboutMe.name}</h3>
								<p class="about-subtitle">
									${aboutMe.title} (Colegiada Nº ${aboutMe.collegiateNumber})
								</p>
							</div>
							
							<div class="about-philosophy">
								 <p>${aboutMe.intro}</p>
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
									<span>${aboutMe.clinicAddress}</span>
								 </div>
								 <div class="info-item">
									<i class="fas fa-info-circle"></i>
									<span>${aboutMe.clinicNote}</span>
								 </div>
							</div>
							
							<a href="#contacto" class="btn btn-primary">Reservar una Cita</a>
						</div>
					</div>
				</div>
			</section>
		`;
	}

    // 3. SERVICIOS 
    renderServices() {
        const { services } = this.config;
        const accordionHTML = services.map((category, index) => {
            const treatmentsHTML = category.treatments.map(treatment => `
                <div class="treatment-item">
                    <div class="treatment-icon"><i class="${treatment.icon}"></i></div>
                    <div class="treatment-content">
                        <h4>${treatment.title}</h4>
                        <p>${treatment.description}</p>
                    </div>
                    <div class="treatment-action">
                        <button class="btn btn-primary btn-small" onclick="selectService('${treatment.id}')">
                            Me Interesa
                        </button>
                        <a href="treatment-detail.html?id=${treatment.id}" class="btn btn-secondary btn-small">
                            Más Info
                        </a>
                    </div>
                </div>
            `).join('');

            return `
                <div class="accordion-item">
                    <button class="accordion-header" aria-expanded="${index === 0 ? 'true' : 'false'}">
                        ${category.category}
                        <i class="fas fa-chevron-down accordion-icon"></i>
                    </button>
                    <div class="accordion-content" ${index === 0 ? '' : 'style="max-height: 0;"'}>
                        <div class="treatments-list">
                            ${treatmentsHTML}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <section id="servicios" class="services-section">
                <div class="container">
                    <div class="section-title">
                        <span>Catálogo</span>
                        <h2>Nuestros Servicios</h2>
                        <p>Descubre nuestras especialidades para realzar tu belleza de forma segura y profesional.</p>
                    </div>
                    <div class="accordion-container">
                        ${accordionHTML}
                    </div>
                </div>
            </section>
        `;
    }

	// 4. PACKS (Eliminado)
	renderPacks() {
		return '';
	}

	// 5. CONTACTO
	renderContact() {
		const { siteInfo, services } = this.config;

		const serviceOptions = services.map(category => {
			const options = category.treatments
				.map(t => `<option value="${t.id}">${t.title}</option>`)
				.join('');
			return `<optgroup label="${category.category}">${options}</optgroup>`;
		}).join('');

		return `
            <section id="contacto">
                <div class="container">
                    <div class="section-title">
                        <span>Reserva tu cita</span>
                        <h2>Contacto</h2>
                    </div>
                    
                    <div class="contact-container">
                        <!-- Lado Izquierdo: Info -->
                        <div class="contact-info">
                            <div>
                                <h3>¿Hablamos?</h3>
                                <p style="color: rgba(255,255,255,0.8);">Reserva tu cita para una valoración personalizada en mi consulta de Terrassa.</p>
                            </div>
                            
                            <div class="contact-details-list">
                                <div class="contact-detail">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <div style="font-size: 0.8rem; opacity: 0.7;">Dirección</div>
                                        <strong>${siteInfo.coverage}</strong>
                                    </div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-phone-alt"></i>
                                    <div>
                                        <div style="font-size: 0.8rem; opacity: 0.7;">Teléfono</div>
                                        <strong>${siteInfo.phone}</strong>
                                    </div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <div style="font-size: 0.8rem; opacity: 0.7;">Email</div>
                                        <strong>${siteInfo.email}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Lado Derecho: Formulario -->
                        <div class="contact-form-wrapper">
                            <form class="contact-form">
                                <div class="form-group">
                                    <label>Nombre Completo</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Teléfono</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Servicio de interés</label>
                                    <select class="form-control" required>
                                        <option value="">Seleccione un servicio...</option>
                                        ${serviceOptions}
                                        <option value="consulta">Duda / Otra consulta</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Mensaje (Opcional)</label>
                                    <textarea class="form-control" rows="3"></textarea>
                                </div>
                                
                                <button type="submit" class="btn btn-primary" style="width: 100%;">
                                    Solicitar Cita
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// 6. FOOTER
	renderFooter() {
		const { siteInfo, footer } = this.config;
		return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <i class="fas fa-spa" style="font-size: 2.5rem; color: rgba(255,255,255,0.2); margin-bottom: 1rem;"></i>
                        <h3>${siteInfo.brandName}</h3>
                        <p style="max-width: 500px; margin: 0 auto; color: rgba(255,255,255,0.7);">${footer.description}</p>
                    </div>
                    <div class="footer-bottom">
                        <p>${footer.copyright}</p>
                    </div>
                </div>
            </footer>
        `;
	}

	// RENDER MASTER
	renderPage() {
		const main = document.querySelector("main");
		let contentContainer = document.getElementById("app-content");
		if (!contentContainer) {
			contentContainer = document.createElement("div");
			contentContainer.id = "app-content";
			main.appendChild(contentContainer);
		}

		contentContainer.innerHTML = `
            ${this.renderHero()}
            ${this.renderAboutMe()}
            ${this.renderServices()}
            ${this.renderContact()}
        `;

		const footer = document.querySelector("footer");
		if (footer) footer.outerHTML = this.renderFooter();

		document.title = this.config.siteInfo.title;
		const brandSpan = document.querySelector(".nav-brand span");
		if (brandSpan) brandSpan.textContent = this.config.siteInfo.brandName;

		const loader = document.querySelector(".loading-screen");
		if (loader) loader.style.display = "none";
	}
}

async function loadAndRenderPage() {
	try {
		const response = await fetch("./config.json");
		const config = await response.json();
		const app = new EnfermeriaComponents(config);
		app.renderPage();
		setTimeout(() => {
			if (typeof initializeAllFeatures === "function") initializeAllFeatures();
		}, 100);
	} catch (error) {
		console.error("Error:", error);
	}
}
window.EnfermeriaComponents = EnfermeriaComponents;
window.loadAndRenderPage = loadAndRenderPage;
