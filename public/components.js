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
                            <img src="img/christinephoto2.jpeg" alt="Dermoestética y cuidado de la piel" class="hero-img-main" onerror="this.src='https://via.placeholder.com/450x550'">
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
							<img src="./myphoto.jpeg" alt="${aboutMe.name}" class="about-photo" onerror="this.classList.add('img-error');">
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

    // 3. SERVICIOS (Tarjetas Grid)
    renderServices() {
        const { services } = this.config;

        const catalogHTML = services.map(category => {
            const cardsHTML = category.treatments.map(treatment => `
				<article class="service-card">
					<div class="card-header">
						<div class="service-icon-box">
							<i class="${treatment.icon}"></i>
						</div>
						<span class="service-price-tag">${treatment.price}€</span>
					</div>
					
					<div class="card-body">
						<h4>${treatment.title}</h4>
						<p>${treatment.description}</p>
						
						<div class="card-meta">
							<span><i class="far fa-clock"></i> ${treatment.duration}</span>
						</div>
					</div>
					
					<div class="card-footer">
						<a href="treatment-detail.html?id=${treatment.id}" class="btn btn-card">
							Ver Detalles <i class="fas fa-arrow-right"></i>
						</a>
					</div>
				</article>
			`).join('');

            return `
				<div class="service-category-group">
					<h3 class="category-title">${category.category}</h3>
					<div class="services-grid">
						${cardsHTML}
					</div>
				</div>
			`;
        }).join('');

        return `
			<section id="servicios" class="services-section-cards">
				<div class="container">
					<div class="section-title">
						<span>Nuestras Especialidades</span>
						<h2>Catálogo de Tratamientos</h2>
						<p>Soluciones personalizadas para tu bienestar y belleza.</p>
					</div>
					
					<div class="catalog-wrapper">
						${catalogHTML}
					</div>
				</div>
			</section>
		`;
    }

    // 4. TESTIMONIOS
    renderTestimonials() {
        const { testimonials } = this.config;
        if (!testimonials) return '';

        const cardsHTML = testimonials.map(t => `
			<div class="testimonial-card">
				<div class="testimonial-stars">
					${'<i class="fas fa-star"></i>'.repeat(t.rating)}
				</div>
				<p class="testimonial-text">"${t.text}"</p>
				<div class="testimonial-author">
					<div class="author-avatar">${t.name.charAt(0)}</div>
					<span>${t.name}</span>
				</div>
			</div>
		`).join('');

        return `
			<section id="testimonios" class="testimonials-section">
				<div class="container">
					<div class="section-title">
						<span>Lo que dicen mis pacientes</span>
						<h2>Testimonios</h2>
					</div>
					<div class="testimonials-grid">
						${cardsHTML}
					</div>
				</div>
			</section>
		`;
    }

    // 5. CONTACTO (Email y Formulario completo)
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
                        <div class="contact-info">
                            <div class="contact-info-header">
                                <h3>¿Hablamos?</h3>
                                <p class="contact-info-description">Reserva tu cita para una valoración personalizada.</p>
                            </div>
                            
                            <div class="contact-details-list">
                                <div class="contact-detail">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div><strong>${siteInfo.coverage}</strong></div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-phone-alt"></i>
                                    <div><strong>${siteInfo.phone}</strong></div>
                                </div>
                                <div class="contact-detail">
                                    <i class="fas fa-envelope"></i>
                                    <div><strong>${siteInfo.email}</strong></div>
                                </div>
                            </div>

                            <div class="contact-map">
                                <iframe src="${siteInfo.mapUrl}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                        
                        <div class="contact-form-wrapper">
                            <form id="contactForm" class="contact-form">
                                <div class="form-group">
                                    <label>Nombre Completo</label>
                                    <input type="text" name="user_name" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Teléfono</label>
                                    <input type="tel" name="user_phone" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Email (Opcional)</label>
                                    <input type="email" name="user_email" class="form-control" placeholder="nombre@ejemplo.com">
                                </div>
                                
                                <div class="form-group form-group-select">
                                    <label>Servicio de interés</label>
                                    <select name="service_interest" class="form-control" required>
                                        <option value="">Seleccione un servicio...</option>
                                        ${serviceOptions}
                                        <option value="consulta">Duda / Otra consulta</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Mensaje (Opcional)</label>
                                    <textarea name="message" class="form-control" rows="3"></textarea>
                                </div>

                                <div class="form-group form-checkbox">
                                    <label>
                                        <input type="checkbox" required>
                                        He leído y acepto la <a href="privacidad.html" target="_blank">Política de Privacidad</a>
                                    </label>
                                </div>
                                
                                <button type="submit" class="btn btn-primary contact-form-submit">
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
                        <i class="fas fa-spa footer-icon"></i>
                        <h3>${siteInfo.brandName}</h3>
                        <p class="footer-description">${footer.description}</p>
                    </div>
                    <div class="footer-links-legal">
                        <a href="legal.html">Aviso Legal</a> | 
                        <a href="privacidad.html">Política de Privacidad</a>
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
            ${this.renderTestimonials()}
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