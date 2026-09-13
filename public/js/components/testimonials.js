import { t } from '../i18n.js?v=202609131710';

export function renderTestimonials(testimonialsData) {
    if (!testimonialsData || testimonialsData.length === 0) return '';

    const originalCardsHTML = testimonialsData.map(item => {
        const textClass = item.text.length > 180 ? 'testimonial-text testimonial-text--long' : 'testimonial-text';
        return `
        <div class="testimonial-card">
            <p class="${textClass}">"${item.text}"</p>
            <div class="testimonial-author">
                <span class="author-name">${item.name}</span>
                <span class="author-stars">${'★'.repeat(item.rating)}</span>
            </div>
        </div>
        `;
    }).join('');

    const cardsHTML = originalCardsHTML + originalCardsHTML;

    return `
        <section id="testimonios" class="testimonials-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>04 / ${t('testimonials.eyebrow')}</span>
                    <h2>${t('testimonials.title')}</h2>
                    <div class="google-reviews-badge">
                        <span><strong>5 / 5</strong> ${t('testimonials.onGoogle')}</span>
                    </div>
                </div>

                <div class="testimonials-marquee-wrapper" style="position: relative;">
                    <button class="mobile-slider-btn prev" onclick="const el=document.querySelector('.testimonials-marquee-track'); el.scrollBy({left: -el.clientWidth, behavior: 'smooth'})" aria-label="${t('testimonials.prev')}"><i class="fas fa-chevron-left"></i></button>
                    <div class="testimonials-marquee-track">
                        ${cardsHTML}
                    </div>
                    <button class="mobile-slider-btn next" onclick="const el=document.querySelector('.testimonials-marquee-track'); el.scrollBy({left: el.clientWidth, behavior: 'smooth'})" aria-label="${t('testimonials.next')}"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </section>
    `;
}
