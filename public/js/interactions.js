import { showToast } from './utils/toast.js?v=202608011240';
import { buildTreatmentModalContent } from './components/services.js?v=202608011240';

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
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1200; // 1.2 segundos (más lento que el nativo)
                let start = null;

                // Función de aceleración y deceleración suave
                const easeInOutCubic = (t, b, c, d) => {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                };

                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        // Asegurar posición exacta al terminar
                        window.scrollTo(0, targetPosition);
                    }
                };
                
                requestAnimationFrame(animation);
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

  let lastActiveTabId = tabs.length > 0 ? tabs[0].getAttribute('data-tab') : null;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      lastActiveTabId = tabId;
      
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
      
      // Clear search when changing tabs
      const searchInput = section.querySelector('#services-search-input');
      if (searchInput && searchInput.value !== '') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });

  const searchContainer = section.querySelector('.services-search-container');
  const searchBtn = section.querySelector('.services-search-btn');
  const searchInput = section.querySelector('#services-search-input');

  if (searchContainer && searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchContainer.classList.toggle('is-active');
      if (searchContainer.classList.contains('is-active')) {
        searchInput.focus();
      } else {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }
    });

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      if (searchTerm !== '') {
        // Deselect all tabs to indicate global search
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        // Activate all panels for searching
        panels.forEach(p => {
          p.classList.add('active');
          p.setAttribute('aria-hidden', 'false');
        });
      } else {
        // Restore last active tab
        if (lastActiveTabId) {
          tabs.forEach(t => {
            const isActive = t.getAttribute('data-tab') === lastActiveTabId;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive.toString());
          });
          panels.forEach(p => {
            const isActive = p.id === `panel-${lastActiveTabId}`;
            p.classList.toggle('active', isActive);
            p.setAttribute('aria-hidden', (!isActive).toString());
          });
        }
      }

      // Filter all cards
      const allCards = section.querySelectorAll('.treatment-card');
      allCards.forEach(card => {
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

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

// --- Testimonios: ahora se manejan con CSS puro (marquee) ---
// (Lógica eliminada para usar @keyframes infinitos)

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
  const urls = Array.from(new Set([...items].map((el) => el.getAttribute('data-src'))));
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

// --- FAQ ---
function initializeFAQ() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            const isActive = item.classList.contains('is-active');
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('is-active');
                otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                const otherContent = otherItem.querySelector('.faq-content');
                if (otherContent) otherContent.style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('is-active');
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// --- SCROLL ANIMATIONS ---
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}

// --- EXPORTAR TODO JUNTO ---
export function initializeInteractions() {
    initializeMobileNavigation();
    initializeSmoothScroll();
    updateHeaderOnScroll();
    initializeContactForm();
    initializeServicesTabsAndModal();
    initializeGalleryLightbox();
    initializeCookieConsent();
    initializeFAQ();
    initializeScrollAnimations();
    
    // Ancla inicial
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}