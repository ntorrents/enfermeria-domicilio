import { t, getUI } from '../i18n.js?v=202609131730';

function renderItems(items) {
    return (items || []).map(item => `
        <li>
            <i class="${item.icon}" aria-hidden="true"></i>
            <div class="postcare-item-body">
                <strong>${item.title}</strong>
                <p>${item.text}</p>
            </div>
        </li>
    `).join('');
}

export function renderPostCare() {
    const p = getUI().postcare || {};
    return `
        <section id="cuidados-post-tratamiento" class="postcare-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>${t('postcare.eyebrow')}</span>
                    <h2>${t('postcare.title')}</h2>
                </div>
                
                <div class="postcare-intro animate-on-scroll">
                    <div class="postcare-intro-content">
                        <p>${p.quote || ''}</p>
                        <div class="postcare-author">
                            <strong>— Christine Cano</strong>
                            <span>${t('postcare.authorRole')}</span>
                        </div>
                    </div>
                </div>

                <div class="postcare-tabs-container animate-on-scroll">
                    <div class="postcare-tabs-header">
                        <button class="postcare-tab-btn active" data-target="postcare-facial">
                            <i class="fas fa-leaf"></i> ${t('postcare.tabFacial')}
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-inyectables">
                            <i class="fas fa-syringe"></i> ${t('postcare.tabInjectables')}
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-corporal">
                            <i class="fas fa-spa"></i> ${t('postcare.tabBody')}
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-capilar">
                            <i class="fas fa-spray-can"></i> ${t('postcare.tabHair')}
                        </button>
                    </div>

                    <div class="postcare-tabs-content">
                        <div id="postcare-facial" class="postcare-tab-panel active">
                            <h3>${t('postcare.facialTitle')}</h3>
                            <ul class="postcare-list">${renderItems(p.facialItems)}</ul>
                        </div>
                        <div id="postcare-inyectables" class="postcare-tab-panel">
                            <h3>${t('postcare.injectablesTitle')}</h3>
                            <ul class="postcare-list">${renderItems(p.injectablesItems)}</ul>
                        </div>
                        <div id="postcare-corporal" class="postcare-tab-panel">
                            <h3>${t('postcare.bodyTitle')}</h3>
                            <ul class="postcare-list">${renderItems(p.bodyItems)}</ul>
                        </div>
                        <div id="postcare-capilar" class="postcare-tab-panel">
                            <h3>${t('postcare.hairTitle')}</h3>
                            <ul class="postcare-list">${renderItems(p.hairItems)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function initPostCareTabs() {
    const tabBtns = document.querySelectorAll('.postcare-tab-btn');
    const tabPanels = document.querySelectorAll('.postcare-tab-panel');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}
