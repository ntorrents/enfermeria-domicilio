export function renderContact(siteInfo, servicesData) {
    if (!siteInfo || !servicesData) return '';

    const serviceOptions = servicesData.map(category => {
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
                            <iframe 
                                title="Mapa de ubicación"
                                src="${siteInfo.mapUrl}" 
                                width="100%" 
                                height="250" 
                                style="border:0;" 
                                allowfullscreen="" 
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                    
                    <div class="contact-form-wrapper">
                        <form id="contactForm" class="contact-form">
                            <div class="form-group">
                                <label for="userName">Nombre Completo</label>
                                <input type="text" id="userName" name="user_name" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="userPhone">Teléfono</label>
                                <input type="tel" id="userPhone" name="user_phone" class="form-control" required>
                            </div>

                            <div class="form-group">
                                <label for="userEmail">Email (Opcional)</label>
                                <input type="email" id="userEmail" name="user_email" class="form-control" placeholder="nombre@ejemplo.com">
                            </div>
                            
                            <div class="form-group form-group-select">
                                <label for="serviceInterest">Servicio de interés</label>
                                <select id="serviceInterest" name="service_interest" class="form-control" required>
                                    <option value="">Seleccione un servicio...</option>
                                    ${serviceOptions}
                                    <option value="consulta">Duda / Otra consulta</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="message">Mensaje (Opcional)</label>
                                <textarea id="message" name="message" class="form-control" rows="3"></textarea>
                            </div>

                            <div class="form-group form-checkbox">
                                <label>
                                    <input type="checkbox" required>
                                    He leído y acepto la <a href="privacidad.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
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