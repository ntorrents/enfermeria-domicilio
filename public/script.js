/* --- FUNCIONALIDADES GENERALES Y NAVEGACIÓN --- */

// Inicializar navegación móvil
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        // Eliminar listeners antiguos por si acaso
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);

        // Listener nuevo
        newToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            newToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
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

// Scroll suave para anclas
function initializeSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Estilo header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(253, 252, 250, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'rgba(253, 252, 250, 0.5)';
            header.style.boxShadow = 'none';
        }
    }
    updateActiveNavigation();
});

// Actualizar link activo en menú
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

/* --- SISTEMA DE NOTIFICACIONES TOAST --- */
function showToast(title, message, type = 'success') {
    // 1. Crear contenedor si no existe
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Crear el HTML de la notificación
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icono según el tipo
    let iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    if (type === 'info') iconClass = 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass} fa-lg"></i>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-msg">${message}</span>
        </div>
    `;

    // 3. Añadir al DOM
    container.appendChild(toast);

    // 4. Animación de entrada
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // 5. Autodestrucción
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 500);
    }, 5000);
}


/* --- FORMULARIO DE CONTACTO (Fix Duplicados) --- */
function initializeContactForm() {
    // Buscamos el formulario (por ID preferiblemente)
    const originalForm = document.getElementById('contactForm');

    // Si no existe, no hacemos nada
    if (!originalForm) return;

    // --- SOLUCIÓN DOBLE ENVÍO: Clonar el nodo para borrar listeners viejos ---
    const newForm = originalForm.cloneNode(true);
    originalForm.parentNode.replaceChild(newForm, originalForm);

    // Pre-seleccionar servicio desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    if (serviceId) {
        const selectElement = newForm.querySelector('select');
        if (selectElement) selectElement.value = serviceId;
    }

    // Listener de envío único
    newForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Recoger datos (usando name o fallback)
        const nombreInput = newForm.querySelector('input[name="user_name"]');
        const telefonoInput = newForm.querySelector('input[name="user_phone"]');
        const emailInput = newForm.querySelector('input[name="user_email"]');
        const servicioInput = newForm.querySelector('select');
        const mensajeInput = newForm.querySelector('textarea');

        const formData = {
            nombre: nombreInput ? nombreInput.value : '',
            telefono: telefonoInput ? telefonoInput.value : '',
            email: emailInput ? emailInput.value : 'No indicado',
            servicio: servicioInput ? servicioInput.value : '',
            mensaje: mensajeInput ? mensajeInput.value : ''
        };

        // Validación
        if (!formData.nombre || !formData.telefono) {
            showToast('Faltan datos', 'Por favor, indica tu nombre y teléfono.', 'error');
            return;
        }

        // Feedback visual en botón
        const btnSubmit = newForm.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerText;
        btnSubmit.innerText = 'Enviando...';
        btnSubmit.disabled = true;

        // Enviar con EmailJS
        if (typeof sendEmail === 'function') {
            sendEmail(formData)
                .then(() => {
                    // ÉXITO (Aquí estaba el undefined, ahora corregido)
                    showToast('¡Mensaje Enviado!', 'Gracias por contactar. Te responderemos muy pronto.', 'success');
                    newForm.reset();
                })
                .catch((error) => {
                    console.error('Error EmailJS:', error);
                    showToast('Error de Envío', 'Hubo un problema. Por favor contáctanos por WhatsApp.', 'error');
                })
                .finally(() => {
                    btnSubmit.innerText = originalText;
                    btnSubmit.disabled = false;
                });
        } else {
            // Modo simulación (si falla carga de emailjs)
            console.warn('EmailJS no cargado. Simulando éxito.');
            showToast('Modo Demo', 'El formulario funciona, pero EmailJS no está conectado.', 'info');
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }
    });
}

// Cargar ancla al inicio (si viene de otra página)
function handleAnchorLinkOnLoad() {
    const hash = window.location.hash;
    setTimeout(() => {
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }
    }, 300);
}

// --- INICIALIZADOR MAESTRO ---
function initializeAllFeatures() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    initializeContactForm();
    updateActiveNavigation();
    handleAnchorLinkOnLoad();

    if (typeof initializeEmailJS === 'function') {
        initializeEmailJS();
    }
    console.log('✅ Todas las funcionalidades inicializadas.');
}

// Ejecutar al cargar el DOM (solo si no lo hace components.js)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadAndRenderPage !== 'function') {
        initializeAllFeatures();
    }
});