import { showToast } from './utils/toast.js';
import { buildTreatmentModalContent } from './components/services.js';

// --- Navegación Móvil ---
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
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

// --- Formulario ---
function initializeContactForm() {
    const originalForm = document.getElementById('contactForm');
    if (!originalForm) return;

    const newForm = originalForm.cloneNode(true);
    originalForm.parentNode.replaceChild(newForm, originalForm);

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    if (serviceId) {
        const select = newForm.querySelector('select');
        if (select) select.value = serviceId;
    }

    newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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
            showToast('Demo', 'EmailJS no está listo.', 'info');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

// --- Servicios: Tabs + selector de packs + modal detalle ---
function initializeServicesTabsAndModal() {
  const section = document.getElementById('servicios');
  if (!section) return;

  const tabs = section.querySelectorAll('.services-tab');
  const panels = section.querySelectorAll('.services-panel');
  const modal = document.getElementById('treatment-modal');
  const modalBody = document.getElementById('treatment-modal-body');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => {
        const isActive = p.id === `panel-${tabId}`;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-hidden', !isActive);
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  section.querySelectorAll('.pack-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.treatment-card');
      if (!card) return;
      card.querySelectorAll('.pack-option').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const total = btn.getAttribute('data-total');
      const pack = btn.getAttribute('data-pack');
      const display = card.querySelector('.pack-price-display');
      if (display) {
        display.innerHTML = pack === 'single'
          ? `<strong>${total}€</strong> por esta sesión`
          : `<strong>${total}€</strong> total`;
      }
    });
  });

  const openModal = (treatmentId) => {
    const services = window.__SERVICES_CONFIG;
    if (!services || !Array.isArray(services)) return;
    let treatment = null;
    for (const cat of services) {
      treatment = cat.treatments.find((t) => t.id === treatmentId);
      if (treatment) break;
    }
    if (!treatment) return;
    if (modalBody) modalBody.innerHTML = buildTreatmentModalContent(treatment);
    if (modal) {
      modal.removeAttribute('hidden');
      modal.querySelector('.treatment-modal-close')?.focus();
    }
  };

  const closeModal = () => {
    if (modal) modal.setAttribute('hidden', '');
  };

  section.addEventListener('click', (e) => {
    const verMas = e.target.closest('.btn-ver-mas');
    if (verMas) {
      e.preventDefault();
      const id = verMas.getAttribute('data-treatment-id');
      if (id) openModal(id);
    }
  });

  modal?.querySelector('.treatment-modal-overlay')?.addEventListener('click', closeModal);
  modal?.querySelector('.treatment-modal-close')?.addEventListener('click', closeModal);

  modal?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// --- Testimonios: carrusel infinito en móvil ---
function initializeTestimonialsCarousel() {
  const section = document.getElementById('testimonios');
  if (!section) return;

  const wrapper = section.querySelector('.testimonials-carousel-wrapper');
  const track = section.querySelector('.testimonials-track');
  const prevBtn = section.querySelector('.testimonials-prev');
  const nextBtn = section.querySelector('.testimonials-next');
  const cards = track ? [...track.querySelectorAll('.testimonial-card')] : [];
  const n = cards.length;

  if (n === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function setTransform(index, noTransition = false) {
    if (!track) return;
    if (noTransition) track.style.transition = 'none';
    const percentPerSlide = 100 / n;
    track.style.transform = isMobile() ? `translateX(-${index * percentPerSlide}%)` : 'none';
    if (noTransition) {
      track.offsetHeight;
      track.style.transition = '';
    }
  }

  function goTo(index) {
    if (!isMobile()) return;
    currentIndex = ((index % n) + n) % n;
    setTransform(currentIndex);
  }

  function next() {
    if (!isMobile()) return;
    goTo(currentIndex + 1);
  }

  function prev() {
    if (!isMobile()) return;
    goTo(currentIndex - 1);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isMobile()) setTransform(currentIndex);
      else setTransform(0, true);
    }, 100);
  });

  if (isMobile()) setTransform(0);
}

// --- Galería: lightbox para ver fotos completas y pasar una a una ---
function initializeGalleryLightbox() {
  const section = document.getElementById('fotos');
  if (!section) return;

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const closeBtn = lightbox?.querySelector('.gallery-lightbox-close');
  const prevBtn = lightbox?.querySelector('.gallery-lightbox-prev');
  const nextBtn = lightbox?.querySelector('.gallery-lightbox-next');

  if (!lightbox || !lightboxImg) return;

  const items = section.querySelectorAll('.gallery-item[data-src]');
  const urls = [...items].map((el) => el.getAttribute('data-src'));
  const n = urls.length;
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = ((index % n) + n) % n;
    lightboxImg.src = urls[currentIndex];
  }

  function open(index) {
    currentIndex = ((index % n) + n) % n;
    lightboxImg.src = urls[currentIndex];
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  section.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item[data-index]');
    if (!item) return;
    const index = parseInt(item.getAttribute('data-index'), 10);
    open(index);
  });

  section.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const item = e.target.closest('.gallery-item[data-index]');
    if (!item) return;
    e.preventDefault();
    const index = parseInt(item.getAttribute('data-index'), 10);
    open(index);
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });
  nextBtn?.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
      e.preventDefault();
    }
    if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
      e.preventDefault();
    }
  });
}

// --- GESTIÓN DE COOKIES ---
function initializeCookieConsent() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Si no existe el banner o ya aceptó, salimos
    if (!banner || localStorage.getItem('cookiesAccepted') === 'true') {
        return;
    }

    // Mostrar el banner tras 1 segundo
    setTimeout(() => {
        banner.classList.add('show');
    }, 1000);

    // Al hacer click, guardamos y cerramos
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.classList.remove('show');
        });
    }
}

// --- EXPORTAR TODO JUNTO ---
export function initializeInteractions() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    updateHeaderOnScroll();
    initializeContactForm();
    initializeServicesTabsAndModal();
    initializeTestimonialsCarousel();
    initializeGalleryLightbox();
    initializeCookieConsent();
    
    // Ancla inicial
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}