import { showToast } from './utils/toast.js';

// --- Navegación Móvil ---
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        // Clonamos para limpiar eventos viejos
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        newToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            newToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !newToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            }
        });
    }
}

// --- Scroll Suave ---
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Header Activo ---
function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(253, 252, 250, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'rgba(253, 252, 250, 0.5)';
            header.style.boxShadow = 'none';
        }
        updateActiveNavigation();
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// --- Formulario (Con tu lógica EmailJS) ---
function initializeContactForm() {
    const originalForm = document.getElementById('contactForm');
    if (!originalForm) return;

    // Clonamos para evitar duplicados
    const newForm = originalForm.cloneNode(true);
    originalForm.parentNode.replaceChild(newForm, originalForm);

    // Pre-selección desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    if (serviceId) {
        const select = newForm.querySelector('select');
        if (select) select.value = serviceId;
    }

    newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtenemos los datos de forma robusta
        const formData = {
            nombre: newForm.querySelector('[name="user_name"]')?.value,
            telefono: newForm.querySelector('[name="user_phone"]')?.value,
            email: newForm.querySelector('[name="user_email"]')?.value || 'No indicado',
            servicio: newForm.querySelector('select')?.value,
            mensaje: newForm.querySelector('textarea')?.value
        };

        if (!formData.nombre || !formData.telefono) {
            showToast('Datos incompletos', 'Por favor, rellena nombre y teléfono.', 'error');
            return;
        }

        const btn = newForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        if (typeof sendEmail === 'function') {
            sendEmail(formData)
                .then(() => {
                    showToast('¡Enviado!', 'Te contactaremos pronto.', 'success');
                    newForm.reset();
                })
                .catch((err) => {
                    console.error(err);
                    showToast('Error', 'Hubo un problema al enviar.', 'error');
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        } else {
            // Fallback si EmailJS no cargó
            showToast('Demo', 'EmailJS no está listo.', 'info');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

// --- EXPORTAR TODO JUNTO ---
export function initializeInteractions() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    updateHeaderOnScroll();
    initializeContactForm();
    
    // Ancla inicial
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}