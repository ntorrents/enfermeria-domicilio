export function renderGiftCard() {
    return `
    <section id="tarjeta-regalo" class="giftcard-section">
        <div class="container giftcard-container">
            <div class="giftcard-content">
                <div class="giftcard-text">
                    <span class="badge badge--gift">Regala Bienestar</span>
                    <h2>La Experiencia C3LINIC</h2>
                    <p class="giftcard-subtitle">Más que un tratamiento, un momento de cuidado y desconexión.</p>
                    
                    <p class="giftcard-desc">
                        Sorprende a esa persona especial con nuestra <strong>Tarjeta Regalo</strong>. 
                        Una elegante caja física que incluye una invitación personalizada para disfrutar de cualquiera 
                        de nuestros tratamientos dermoestéticos. El regalo perfecto para quienes valoran el cuidado 
                        personal, la salud de su piel y un servicio exclusivo.
                    </p>
                    
                    <ul class="giftcard-features">
                        <li><i class="fas fa-box-open"></i> Estuche regalo físico con tarjeta dedicatoria personalizada</li>
                        <li><i class="fas fa-hand-holding-heart"></i> Diagnóstico dermoestético inicial para adaptar el tratamiento a su piel</li>
                        <li><i class="fas fa-calendar-alt"></i> Total flexibilidad: canjeable por el tratamiento deseado o importe abierto</li>
                    </ul>
                    
                    <a href="/tarjeta-regalo" class="btn btn-primary giftcard-btn">Solicitar Tarjeta Regalo <i class="fas fa-gift"></i></a>
                </div>
                
                <div class="giftcard-gallery giftcard-gallery--2-items">
                    <div class="gift-img-wrapper img-1">
                        <img src="img/giftcard-1.jpeg" alt="Caja Regalo Exterior" loading="lazy">
                    </div>
                    <div class="gift-img-wrapper img-2">
                        <img src="img/giftcard-2.jpeg" alt="Detalles de la tarjeta" loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}
