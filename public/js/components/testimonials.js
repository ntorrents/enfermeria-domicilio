export function renderTestimonials(testimonialsData) {
    if (!testimonialsData || testimonialsData.length === 0) return '';

    const cardsHTML = testimonialsData.map(t => `
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
                <div class="testimonials-carousel-wrapper">
                    <button type="button" class="testimonials-arrow testimonials-prev" aria-label="Testimonio anterior">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="testimonials-slider">
                        <div class="testimonials-track">
                            ${cardsHTML}
                        </div>
                    </div>
                    <button type="button" class="testimonials-arrow testimonials-next" aria-label="Siguiente testimonio">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    `;
}