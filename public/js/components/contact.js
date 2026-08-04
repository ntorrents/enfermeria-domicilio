export function renderContact(siteInfo, servicesData) {
    if (!siteInfo || !servicesData) return '';

    // Leer parámetro de la URL
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const selectedService = urlParams.get('servicio');

    const visibleServices = servicesData.filter(cat => !cat.hidden && cat.category.toUpperCase() !== 'OCULTOS');

    const serviceOptions = visibleServices.map(category => {
        const options = category.treatments
            .filter(t => !t.hidden)
            .map(t => {
                const isSelected = selectedService === t.id ? 'selected' : '';
                return `<option value="${t.id}" ${isSelected}>${t.title}</option>`;
            })
            .join('');
        return `<optgroup label="${category.category}">${options}</optgroup>`;
    }).join('');

    return `
        <section id="contacto">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>Reserva tu cita</span>
                    <h2>Contacto</h2>
                </div>
                
                <div class="contact-container animate-on-scroll">
                    <div class="contact-info">
                        <div class="contact-info-header">
                            <h3>¿Hablamos?</h3>
                            <p class="contact-info-description">Reserva tu cita para una valoración personalizada.</p>
                        </div>
                        
                        <div class="contact-details-list">
                            <div class="contact-detail">
                                <div class="contact-icon">
                                    <svg width="1em" height="1em" viewBox="0 0 384 512" fill="currentColor"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                </div>
                                <div><strong>${siteInfo.coverage}</strong></div>
                            </div>
                            <div class="contact-detail">
                                <div class="contact-icon">
                                    <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                </div>
                                <div><strong>${siteInfo.phone}</strong></div>
                            </div>
                            <div class="contact-detail">
                                <div class="contact-icon">
                                    <svg width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                </div>
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
                                <label for="userPhone">Teléfono (Opcional)</label>
                                <input type="tel" id="userPhone" name="user_phone" class="form-control" placeholder="+34 600 000 000">
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
                                    He leído y acepto la <a href="/privacidad.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
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