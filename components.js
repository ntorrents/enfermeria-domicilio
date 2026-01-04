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
                            <!-- Foto principal -->
                            <img src="./myphoto.jpeg" alt="Christine Cano Dermoestética" class="hero-img-main" onerror="this.src='https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'">
                            
                            <!-- Tarjetas flotantes decorativas -->
                            <div class="hero-floating-card card-top">
                                <div class="float-icon"><i class="fas fa-certificate"></i></div>
                                <div>
                                    <strong>Máster</strong>
                                    <div style="font-size:0.8rem; color:#666">NUS Agency BCN</div>
                                </div>
                            </div>
                            
                            <div class="hero-floating-card card-bottom">
                                <div class="float-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div>
                                    <strong>Terrassa</strong>
                                    <div style="font-size:0.8rem; color:#666">Consulta Privada</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// 2. SOBRE MÍ (Ajustado para Clínica)
	renderAboutMe() {
		const { aboutMe } = this.config;
		const educationHTML = aboutMe.education
			.map(
				(edu) =>
					`<div class="stat-item"><i class="fas fa-graduation-cap"></i><h3>${edu}</h3></div>`
			)
			.join("");

		return `
            <section id="sobre-mi" class="about-section">
                <div class="container">
                    <div class="section-title">
                        <span>Tu Especialista</span>
                        <h2>Sobre Mí</h2>
                    </div>
                    
                    <div class="about-grid">
                        <div class="about-text">
                            <h3>Hola, soy ${aboutMe.name}</h3>
                            <p style="font-size: 1.1rem; color: var(--primary); font-weight: 500; margin-bottom: 1.5rem;">
                                ${aboutMe.title} - Colegiada Nº ${aboutMe.collegiateNumber}
                            </p>
                            
                            <div class="highlight-box">
                                <p>"${aboutMe.intro}"</p>
                            </div>
                            
                            <div class="stats-grid">
                                ${educationHTML}
                            </div>
                            
                        </div>
                        
                        <!-- Tarjeta de Ubicación -->
                        <div class="location-card-wrapper">
                            <div class="feature-card location-card" style="border-left: 4px solid var(--accent);">
                                <div class="feature-icon"><i class="fas fa-clinic-medical"></i></div>
                                <h4>Mi Consulta</h4>
                                <p style="margin-bottom: 0.5rem; color: var(--text-main); font-weight: 500;">
                                    ${aboutMe.clinicAddress}
                                </p>
                                <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">${aboutMe.clinicNote}</p>
                                <a href="#contacto" class="btn btn-secondary" style="width: 100%; justify-content: center;">Pedir Cita</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// 3. FEATURES (Iconos Bonitos Solicitados)
	renderFeatures() {
		const { features } = this.config;
		const featuresHTML = features
			.map(
				(feature) => `
            <div class="feature-card text-center" style="padding: 1.5rem;">
                <div class="feature-icon" style="margin: 0 auto 1rem auto;"><i class="${feature.icon}"></i></div>
                <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">${feature.title}</h4>
                <p style="font-size: 0.85rem; margin-bottom: 0;">${feature.description}</p>
            </div>
        `
			)
			.join("");

		return `
            <section class="features-section" style="background-color: white; padding: 4rem 0;">
                <div class="container">
                     <div class="section-title" style="margin-bottom: 2rem;">
                        <span>Información Clave</span>
                        <h2>Detalles del Tratamiento</h2>
                    </div>
                    <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                        ${featuresHTML}
                    </div>
                </div>
            </section>
        `;
	}

	// 4. SERVICIOS (Con Placeholders)
	renderServices() {
		const { services } = this.config;
		const servicesHTML = services
			.map((service) => {
				// Lógica para servicios deshabilitados/próximamente
				if (service.disabled) {
					return `
                    <div class="service-item disabled" style="opacity: 0.7; background: #fcfcfc;">
                        <div class="service-body">
                            <div class="service-header">
                                <div class="service-icon" style="color: #ccc;">
                                    <i class="${service.icon}"></i>
                                </div>
                                <div class="service-price" style="color: #ccc; font-size: 0.9rem;">Pronto</div>
                            </div>
                            <h3 style="color: #999;">${service.title}</h3>
                            <p style="color: #aaa;">${service.description}</p>
                        </div>
                    </div>
                    `;
				}

				return `
                <div class="service-item">
                    <div class="service-body">
                        <div class="service-header">
                            <div class="service-icon">
                                <i class="${service.icon}"></i>
                            </div>
                            <div class="service-price">€${service.price}</div>
                        </div>
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                        
                        <div class="service-footer">
                            <button class="btn-link" onclick="selectService('${service.id}')">
                                Más Información <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
			})
			.join("");

		return `
            <section id="servicios" class="services-section">
                <div class="container">
                    <div class="section-title">
                        <span>Tratamientos</span>
                        <h2>Carta de Servicios</h2>
                        <p>Especialización en técnicas mínimamente invasivas</p>
                    </div>
                    <div class="services-grid">
                        ${servicesHTML}
                    </div>
                </div>
            </section>
        `;
	}

	// 5. PACKS (Visita Única vs Mensual)
	renderPacks() {
		const { packs } = this.config;
		const packsHTML = packs
			.map((pack) => {
				const isFeatured = pack.featured ? "featured" : "";
				const featuresHTML = pack.services
					.map((s) => `<li><i class="fas fa-check-circle"></i> ${s}</li>`)
					.join("");

				return `
                <div class="price-card ${isFeatured}">
                    <div class="price-header">
                        <h3>${pack.title}</h3>
                        <div class="price-amount">€${pack.price}</div>
                        ${
													pack.originalPrice
														? `<div style="text-decoration: line-through; opacity: 0.6; font-size: 0.9rem;">Antes €${pack.originalPrice}</div>`
														: ""
												}
                    </div>
                    <ul class="price-features">
                        ${featuresHTML}
                    </ul>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button class="btn ${
													pack.featured ? "btn-primary" : "btn-secondary"
												}" style="width: 100%;" onclick="selectService('${
					pack.id
				}')">
                            Seleccionar
                        </button>
                    </div>
                </div>
            `;
			})
			.join("");

		return `
            <section id="precios">
                <div class="container">
                    <div class="section-title">
                        <span>Tarifas</span>
                        <h2>Opciones de Visita</h2>
                    </div>
                    <div class="pricing-grid" style="justify-content: center; max-width: 800px; margin: 0 auto;">
                        ${packsHTML}
                    </div>
                </div>
            </section>
        `;
	}

	// 6. CONTACTO
	renderContact() {
		const { siteInfo, services, packs } = this.config;

		// Filtrar solo servicios activos para el select
		const serviceOptions = services
			.filter((s) => !s.disabled)
			.map((s) => `<option value="${s.id}">${s.title} (€${s.price})</option>`)
			.join("");

		const packOptions = packs
			.map((p) => `<option value="${p.id}">${p.title} (€${p.price})</option>`)
			.join("");

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
                                        <option value="">Seleccione...</option>
                                        <optgroup label="Tratamientos">${serviceOptions}</optgroup>
                                        <optgroup label="Packs">${packOptions}</optgroup>
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

	// 7. FOOTER
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
            ${this.renderFeatures()} <!-- Nueva sección insertada aquí -->
            ${this.renderAboutMe()}
            ${this.renderServices()}
            ${this.renderPacks()}
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
