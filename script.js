// Función para inicializar navegación móvil
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
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
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
    
    // Actualizar navegación activa
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
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Si estamos en la parte superior de la página, activar "inicio"
    if (window.scrollY < 100) {
        currentSection = 'inicio';
    }
    
    // Actualizar clases activas
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Función para inicializar el formulario de contacto
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const nombre = contactForm.querySelector('input[type="text"]').value;
    const telefono = contactForm.querySelector('input[type="tel"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const servicio = contactForm.querySelector('select').value;
    const mensaje = contactForm.querySelector('textarea').value;
    
    // Validación básica
    if (!nombre || !telefono || !servicio) {
        showNotification('Por favor, complete todos los campos obligatorios.', 'error');
        return;
    }
    
    // Validar formato de teléfono (básico)
    const telefonoRegex = /^[+]?[0-9\s-()]{9,}$/;
    if (!telefonoRegex.test(telefono)) {
        showNotification('Por favor, ingrese un número de teléfono válido.', 'error');
        return;
    }
    
    // Validar email si se proporciona
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingrese un email válido.', 'error');
            return;
        }
    }
    
    // Simular envío del formulario
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envío
    setTimeout(() => {
        showNotification('¡Gracias por su consulta! Nos pondremos en contacto con usted pronto.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                font-size: 1rem;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: #10b981;
                color: white;
            }
            
            .notification-error {
                background: #ef4444;
                color: white;
            }
            
            .notification-info {
                background: #3b82f6;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Configurar cierre automático
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Configurar botón de cierre
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Función para inicializar animaciones
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.feature, .service-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mejorar accesibilidad del teclado
document.addEventListener('keydown', (e) => {
    // Cerrar menú móvil con Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Función para inicializar validación en tiempo real
function initializeFormValidation() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover errores previos
    clearFieldError(e);
    
    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Ingrese un email válido');
        }
    }
    
    if (field.type === 'tel' && value) {
        const telefonoRegex = /^[+]?[0-9\s-()]{9,}$/;
        if (!telefonoRegex.test(value)) {
            showFieldError(field, 'Ingrese un teléfono válido');
        }
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Crear mensaje de error si no existe
    let errorMsg = field.parentNode.querySelector('.field-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'field-error';
        errorMsg.style.cssText = 'color: #ef4444; font-size: 0.9rem; margin-top: 0.25rem;';
        field.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '#e2e8f0';
    
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Función para seleccionar servicio y ir al formulario
function selectService(serviceValue) {
    // Hacer scroll al formulario de contacto
    const contactSection = document.querySelector('#contacto');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = contactSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Preseleccionar el servicio en el formulario después de un pequeño delay
    setTimeout(() => {
        const selectElement = document.querySelector('.contact-form select');
        if (selectElement) {
            selectElement.value = serviceValue;
            // Añadir efecto visual al formulario
            const form = document.querySelector('.contact-form');
            form.style.transform = 'scale(1.02)';
            form.style.boxShadow = '0 8px 25px rgba(77, 131, 158, 0.2)';
            
            setTimeout(() => {
                form.style.transform = 'scale(1)';
                form.style.boxShadow = '';
            }, 300);
        }
    }, 800);
}

// Función para inicializar todas las funcionalidades
function initializeAllFeatures() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    initializeContactForm();
    initializeFormValidation();
    initializeAnimations();
    updateActiveNavigation();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de Enfermería a Domicilio cargado correctamente');
    
    // Añadir clase para animaciones CSS
    document.body.classList.add('loaded');
    
    // Inicializar solo navegación móvil (el resto se inicializa después del contenido dinámico)
    initializeMobileNavigation();
});