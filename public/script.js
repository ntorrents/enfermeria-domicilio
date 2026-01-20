// Función para inicializar navegación móvil
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Función para inicializar el acordeón de servicios
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Cerrar todos los acordeones
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                item.querySelector('.accordion-content').style.maxHeight = '0px';
            });

            // Abrir el que se ha clickado (si no estaba ya abierto)
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
        });
    });
    
    // No abrir por defecto, esperar al manejo de ancla
}


// Función para inicializar scroll suave
function initializeSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cambiar estilo del header al hacer scroll y navegación activa
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(253, 252, 250, 0.85)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'rgba(253, 252, 250, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    updateActiveNavigation();
});

// Función para actualizar la navegación activa
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const headerHeight = document.querySelector('.header').offsetHeight;

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

// Función para inicializar el formulario de contacto
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Pre-seleccionar servicio si viene en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    if (serviceId) {
        const selectElement = contactForm.querySelector('select');
        if (selectElement) {
            selectElement.value = serviceId;
        }
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = contactForm.querySelector('input[type="text"]').value;
        const telefono = contactForm.querySelector('input[type="tel"]').value;
        const servicio = contactForm.querySelector('select').value;

        if (!nombre || !telefono || !servicio) {
            showNotification('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }
        if (typeof sendEmail === 'function' && EMAILJS_CONFIG.PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
            // Lógica de envío de EmailJS...
        } else {
            showNotification('Formulario enviado (simulación). EmailJS no configurado.', 'info');
        }
    });
}

// Sistema de notificaciones (simplificado para el ejemplo)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] Notificación: ${message}`);
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// Función para manejar el ancla en la URL al cargar la página
function handleAnchorLinkOnLoad() {
    const hash = window.location.hash;
    // Se usa un timeout para dar tiempo a que el contenido dinámico se renderice
    setTimeout(() => {
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Abrir el primer acordeón por defecto si no hay ancla o el ancla es de servicios
        const accordionHeader = document.querySelector('.accordion-header');
        if (accordionHeader && (!hash || hash === '#servicios')) {
           const firstContent = accordionHeader.nextElementSibling;
           accordionHeader.setAttribute('aria-expanded', 'true');
           firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }

    }, 300); // 300ms es un retraso prudencial
}


// Función para inicializar todas las funcionalidades
function initializeAllFeatures() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    initializeContactForm();
    initializeAccordion();
    updateActiveNavigation();
    handleAnchorLinkOnLoad(); // <-- AÑADIDO

    if (typeof initializeEmailJS === 'function') {
        initializeEmailJS();
    }
    console.log('Todas las funcionalidades han sido inicializadas.');
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    // El renderizado de la página llama a initializeAllFeatures
    if (typeof loadAndRenderPage !== 'function') {
        // Fallback si components.js no carga
         initializeAllFeatures();
    }
});
