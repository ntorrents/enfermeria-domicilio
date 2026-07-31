export function renderFAQ() {
    const faqs = [
        {
            question: "¿Cuánto duran los tratamientos?",
            answer: "La duración varía según el tratamiento, pero generalmente nuestras sesiones oscilan entre los 30 y 60 minutos. En tu primera consulta te detallaremos el tiempo estimado para tu caso específico."
        },
        {
            question: "¿Cómo es la primera cita de valoración?",
            answer: "Es una cita gratuita y sin compromiso donde analizaremos tu tipo de piel, escucharemos tus preocupaciones y objetivos. A partir de ahí, diseñaremos un plan de tratamiento totalmente personalizado para ti."
        },
        {
            question: "¿Los tratamientos son dolorosos?",
            answer: "La mayoría de nuestros tratamientos son indoloros o causan molestias mínimas. Siempre priorizamos tu comodidad y, si el tratamiento lo requiere, aplicamos crema anestésica tópica para asegurar que la experiencia sea lo más placentera posible."
        },
        {
            question: "¿Qué cuidados básicos debo tener tras un tratamiento?",
            answer: "Aunque depende del procedimiento, por lo general recomendamos evitar la exposición directa al sol, usar siempre protector solar SPF 50+, no aplicar maquillaje las primeras 24 horas y mantener la piel bien hidratada."
        }
    ];

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
                    <span>Resolvemos tus dudas</span>
                    <h2>Preguntas Frecuentes</h2>
                </div>
                <div class="faq-container">
                    ${faqHTML}
                </div>
            </div>
        </section>
    `;
}
