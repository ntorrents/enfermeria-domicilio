import { t, getUI } from '../i18n.js?v=202609131710';

export function renderFAQ() {
    const faqs = getUI().faq?.items || [];

    const faqHTML = faqs.map((faq, index) => `
        <div class="faq-item animate-on-scroll">
            <button class="faq-header" aria-expanded="false" aria-controls="faq-content-${index}">
                <span>${faq.question}</span>
                <span class="faq-icon">+</span>
            </button>
            <div id="faq-content-${index}" class="faq-content">
                <div class="faq-content-inner">
                    <p>${faq.answer}</p>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <section id="faq" class="faq-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>07 / ${t('faq.eyebrow')}</span>
                    <h2>${t('faq.title')}</h2>
                </div>
                <div class="faq-container">
                    ${faqHTML}
                </div>
            </div>
        </section>
    `;
}
