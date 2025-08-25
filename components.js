// Sistema de componentes para la página de enfermería
class EnfermeriaComponents {
	constructor(config) {
		this.config = config;
	}

	// Componente Hero
	renderHero() {
		const { hero } = this.config;
		return `
            <section id="inicio" class="hero">
                <div class="hero-content">
                    <h1>${hero.title}</h1>
                    <p class="hero-subtitle">${hero.subtitle}</p>
                    <div class="hero-buttons">
                        <a href="#contacto" class="btn btn-primary">${hero.primaryButton}</a>
                        <a href="#servicios" class="btn btn-secondary">${hero.secondaryButton}</a>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-visual">
                        <div class="medical-icons">
                            <div class="icon-float icon-1"><i class="fas fa-heartbeat"></i></div>
                            <div class="icon-float icon-2"><i class="fas fa-stethoscope"></i></div>
                            <div class="icon-float icon-3"><i class="fas fa-syringe"></i></div>
                            <div class="icon-float icon-4"><i class="fas fa-pills"></i></div>
                            <div class="icon-float icon-5"><i class="fas fa-thermometer-half"></i></div>
                            <div class="icon-float icon-6"><i class="fas fa-band-aid"></i></div>
                        </div>
                        <div class="hero-main-icon">
                            <i class="fas fa-user-nurse"></i>
                        </div>
                        <div class="hero-decoration">
                            <div class="decoration-circle circle-1"></div>
                            <div class="decoration-circle circle-2"></div>
                            <div class="decoration-circle circle-3"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// Componente Sobre Mí
	renderAboutMe() {
		const { aboutMe } = this.config;
		const educationList = aboutMe.education
			.map((item) => `<li>${item}</li>`)
			.join("");
		const zonesList = aboutMe.coverageZones
			.map((zone) => `<span class="zone">${zone}</span>`)
			.join("");

		return `
            <section id="sobre-mi" class="about-me">
                <div class="container">
                    <div class="about-me-content">
                        <div class="about-me-text">
                            <h2>Sobre Mí</h2>
                            <h3>${aboutMe.name} - ${aboutMe.title}</h3>
                            <p class="intro">${aboutMe.intro}</p>
                            
                            <div class="experience">
                                <h4><i class="fas fa-graduation-cap"></i> Formación y Experiencia</h4>
                                <ul>${educationList}</ul>
                            </div>
                            
                            <div class="coverage-area">
                                <h4><i class="fas fa-map-marker-alt"></i> Zonas de Cobertura</h4>
                                <p>Ofrezco mis servicios en las siguientes localidades y alrededores:</p>
                                <div class="zones">${zonesList}</div>
                                <p class="coverage-note">${aboutMe.coverageNote}</p>
                            </div>
                        </div>
                        <div class="about-me-image">
                            <div class="image-placeholder">
                                <div class="profile-photo">
                                    <img src="./myphoto.jpeg" alt="${aboutMe.name}" class="profile-img">
                                </div>
                                <p>${aboutMe.title}<br>Colegiada Nº ${aboutMe.collegiateNumber}</p>
                            </div>
                            <div class="certifications">
                                <div class="cert">
                                    <i class="fas fa-certificate"></i>
                                    <span>Colegio Oficial de Enfermería</span>
                                </div>
                                <div class="cert">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Seguro de Responsabilidad Civil</span>
                                </div>
                                <div class="cert">
                                    <i class="fas fa-heart"></i>
                                    <span>Compromiso con la Excelencia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
	}

	// Componente Features
	renderFeatures() {
		const { features } = this.config;
		const featuresHTML = features
			.map(
				(feature) => `
            <div class="feature">
                <i class="${feature.icon}"></i>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `
			)
			.join("");

		return `
            <section class="about">
                <div class="container">
                    <div class="about-content">
                        <h2>¿Por qué elegir este servicio?</h2>
                        <div class="features">${featuresHTML}</div>
                    </div>
                </div>
            </section>
        `;
	}

	// Componente Servicios
	renderServices() {
		const { services } = this.config;
		const servicesHTML = services
			.map(
				(service) => `
            <div class="service-card">
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-price">€${service.price}</div>
                <button class="btn btn-service" onclick="selectService('${service.id}')">
                    Solicitar Servicio
                </button>
            </div>
        `
			)
			.join("");

		return `
            <section id="servicios" class="services">
                <div class="container">
                    <h2>Nuestros Servicios</h2>
                    <div class="services-grid">${servicesHTML}</div>
                </div>
            </section>
        `;
	}

	// Componente Packs
	renderPacks() {
		const { packs } = this.config;
		const packsHTML = packs
			.map((pack) => {
				const servicesList = pack.services
					.map((service) => `<li>${service}</li>`)
					.join("");
				const featuredClass = pack.featured ? " featured" : "";

				return `
                <div class="pricing-card${featuredClass}">
                    <h3>${pack.title}</h3>
                    <div class="price">€${pack.price}</div>
                    <div class="price-original">€${pack.originalPrice}</div>
                    <ul>${servicesList}</ul>
                    <button class="btn btn-service" onclick="selectService('${pack.id}')">
                        Solicitar Servicio
                    </button>
                </div>
            `;
			})
			.join("");

		return `
            <section id="precios" class="pricing">
                <div class="container">
                    <h2>Packs - Ahorra con Nuestros Paquetes</h2>
                    <div class="pricing-grid">${packsHTML}</div>
                    <p class="pricing-note">* Los precios incluyen desplazamiento en un radio de 15km. Consulte tarifas para distancias mayores.</p>
                </div>
            </section>
        `;
	}

	// Componente Contacto
	renderContact() {
		const { siteInfo, services, packs } = this.config;

		// Generar opciones del select
		const serviceOptions = services
			.map(
				(service) =>
					`<option value="${service.id}">${service.title} (€${service.price})</option>`
			)
			.join("");

		const packOptions = packs
			.map(
				(pack) =>
					`<option value="${pack.id}">${pack.title} (€${pack.price})</option>`
			)
			.join("");

		return `
            <section id="contacto" class="contact">
                <div class="container">
                    <h2>Contacto</h2>
                    <div class="contact-content">
                        <div class="contact-info">
                            <h3>Información de Contacto</h3>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>${siteInfo.phone}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>${siteInfo.email}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${siteInfo.coverage}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-clock"></i>
                                <span>${siteInfo.schedule}</span>
                            </div>
                        </div>
                        <form class="contact-form">
                            <h3>Solicitar Información</h3>
                            <input type="text" placeholder="Nombre completo" required>
                            <input type="tel" placeholder="Teléfono" required>
                            <input type="email" placeholder="Email">
                            <select required>
                                <option value="">Seleccione una opción</option>
                                <optgroup label="Servicios Individuales">
                                    ${serviceOptions}
                                </optgroup>
                                <optgroup label="Varios Servicios">
                                    <option value="varios">Combinación de servicios</option>
                                </optgroup>
                                <optgroup label="Packs">
                                    ${packOptions}
                                </optgroup>
                                <option value="otro">Otro / Consulta personalizada</option>
                            </select>
                            <textarea placeholder="Mensaje o consulta específica"></textarea>
                            <button type="submit" class="btn btn-primary">Enviar Consulta</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
	}

	// Componente Footer
	renderFooter() {
		const { siteInfo, footer } = this.config;
		return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <i class="fas fa-heartbeat"></i>
                            <span>${siteInfo.brandName}</span>
                        </div>
                        <p>${footer.description}</p>
                    </div>
                    <div class="footer-bottom">
                        <p>${footer.copyright}</p>
                    </div>
                </div>
            </footer>
        `;
	}

	// Renderizar toda la página
	renderPage() {
		const mainContent = document.querySelector("main");
		if (mainContent) {
			mainContent.innerHTML = `
                ${this.renderHero()}
                ${this.renderAboutMe()}
                ${this.renderFeatures()}
                ${this.renderServices()}
                ${this.renderPacks()}
                ${this.renderContact()}
            `;
		}

		const footer = document.querySelector("footer");
		if (footer) {
			footer.outerHTML = this.renderFooter();
		}

		// Actualizar título de la página
		document.title = this.config.siteInfo.title;

		// Actualizar brand en el header
		const navBrand = document.querySelector(".nav-brand span");
		if (navBrand) {
			navBrand.textContent = this.config.siteInfo.brandName;
		}
	}
}

// Función para cargar y renderizar la página
async function loadAndRenderPage() {
	try {
		const response = await fetch("./config.json");
		const config = await response.json();
		const components = new EnfermeriaComponents(config);
		components.renderPage();

		// Reinicializar funcionalidades después del renderizado
		setTimeout(() => {
			if (typeof initializeAllFeatures === "function") {
				initializeAllFeatures();
			} else if (typeof updateActiveNavigation === "function") {
				updateActiveNavigation();
			}
		}, 100);

		console.log("Página cargada desde config.json");
	} catch (error) {
		console.error("Error cargando la configuración:", error);
		console.log("Usando contenido estático como fallback");
	}
}

// Exportar para uso global
window.EnfermeriaComponents = EnfermeriaComponents;
window.loadAndRenderPage = loadAndRenderPage;
