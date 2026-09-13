import { t, FREE_PRICE_VALUES } from '../i18n.js?v=202609131730';

export function renderRecommender() {
    return `
        <section class="recommender-section">
            <div class="container" style="padding-top: 2rem;">
                <div class="section-title animate-on-scroll">
                    <span>${t('recommender.eyebrow')}</span>
                    <h2>${t('recommender.title')}</h2>
                </div>

                <div class="recommender-container animate-on-scroll">
                    <div id="quizHeader" class="quiz-header" style="display: none;">
                        <div class="quiz-progress-text">${t('recommender.stepOf')} <span id="currentStepNum">1</span> ${t('recommender.of')} 3</div>
                        <div class="quiz-progress-bar">
                            <div id="quizProgressFill" class="quiz-progress-fill"></div>
                        </div>
                    </div>

                    <div id="step-0" class="quiz-step active">
                        <i class="fas fa-magic" style="font-size: 1.5rem; color: var(--accent); margin-bottom: 1.25rem; display: inline-block;"></i>
                        <h3 class="quiz-question">${t('recommender.startTitle')}</h3>
                        <p style="color: var(--text-light); margin-bottom: 2rem; max-width: 36rem;">
                            ${t('recommender.startText')}
                        </p>
                        <button id="btnStartQuiz" class="btn btn-primary">${t('recommender.startCta')} <i class="fas fa-arrow-right"></i></button>
                    </div>

                    <div id="step-1" class="quiz-step">
                        <h3 class="quiz-question">${t('recommender.q1')}</h3>
                        <div class="quiz-options-grid">
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="facial">
                                <div class="quiz-option-content">
                                    <i class="fas fa-face-smile"></i>
                                    <span>${t('recommender.zoneFacial')}</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="corporal">
                                <div class="quiz-option-content">
                                    <i class="fas fa-child"></i>
                                    <span>${t('recommender.zoneBody')}</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="capilar">
                                <div class="quiz-option-content">
                                    <i class="fas fa-user"></i>
                                    <span>${t('recommender.zoneHair')}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div id="step-2" class="quiz-step">
                        <h3 class="quiz-question">${t('recommender.q2')}</h3>
                        <div id="q_goal_container" class="quiz-options-grid"></div>
                    </div>

                    <div id="step-3" class="quiz-step">
                        <h3 class="quiz-question">${t('recommender.q3')}</h3>
                        <div class="quiz-options-grid">
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="sensible">
                                <div class="quiz-option-content">
                                    <i class="fas fa-feather"></i>
                                    <span>${t('recommender.stateSensitive')}</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="seca">
                                <div class="quiz-option-content">
                                    <i class="fas fa-droplet-slash"></i>
                                    <span>${t('recommender.stateDry')}</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="mixta">
                                <div class="quiz-option-content">
                                    <i class="fas fa-droplet"></i>
                                    <span>${t('recommender.stateMixed')}</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="madura">
                                <div class="quiz-option-content">
                                    <i class="fas fa-spa"></i>
                                    <span>${t('recommender.stateMature')}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div id="step-loading" class="quiz-step quiz-loading">
                        <div class="spinner"></div>
                        <h3 style="font-family: var(--font-display); font-weight: 500; color: var(--primary);">${t('recommender.loadingTitle')}</h3>
                        <p style="color: var(--text-muted);">${t('recommender.loadingText')}</p>
                    </div>

                    <div id="step-results" class="quiz-step">
                        <div class="results-header">
                            <h3>${t('recommender.resultsHeading')}</h3>
                            <p style="color: var(--text-main);">${t('recommender.resultsSub')}</p>
                        </div>
                        <div id="resultsContainer" class="results-grid"></div>
                        <div style="text-align: left; margin-top: 1.5rem;">
                            <button id="btnRestartQuiz" class="btn btn-secondary"><i class="fas fa-redo"></i> ${t('recommender.restart')}</button>
                        </div>
                    </div>

                    <div id="quizNav" class="quiz-navigation" style="display: none;">
                        <button id="btnPrev" class="btn btn-prev"><i class="fas fa-arrow-left"></i> ${t('recommender.prev')}</button>
                        <button id="btnNext" class="btn btn-primary">${t('recommender.next')} <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function initRecommenderLogic(servicesData) {
    if (typeof document === 'undefined') return;

    let currentStep = 0;
    const totalSteps = 3;

    const savedAnswers = JSON.parse(localStorage.getItem('c3linic_quiz_answers') || '{}');
    const answers = {
        zone: savedAnswers.zone || '',
        goal: savedAnswers.goal || '',
        state: savedAnswers.state || ''
    };

    function saveToLocal() {
        localStorage.setItem('c3linic_quiz_answers', JSON.stringify(answers));
    }

    const quizHeader = document.getElementById('quizHeader');
    const quizNav = document.getElementById('quizNav');
    const stepNumText = document.getElementById('currentStepNum');
    const progressFill = document.getElementById('quizProgressFill');
    const btnStart = document.getElementById('btnStartQuiz');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');
    const btnRestart = document.getElementById('btnRestartQuiz');
    const goalContainer = document.getElementById('q_goal_container');
    const resultsContainer = document.getElementById('resultsContainer');

    const goalOptions = {
        facial: [
            { id: 'f_arrugas', icon: 'fa-face-smile' },
            { id: 'f_manchas', icon: 'fa-sun' },
            { id: 'f_marcas', icon: 'fa-wand-magic-sparkles' },
            { id: 'f_volumen', icon: 'fa-syringe' },
            { id: 'f_ojeras', icon: 'fa-eye' }
        ],
        corporal: [
            { id: 'c_celulitis', icon: 'fa-person-running' },
            { id: 'c_flacidez', icon: 'fa-person-dress' },
            { id: 'c_estrias', icon: 'fa-band-aid' }
        ],
        capilar: [
            { id: 'h_caida', icon: 'fa-user' }
        ]
    };

    const recommendationMap = {
        'f_arrugas': ['microneedling-facial', 'peeling-exfoliante-lifting', 'bioestimulacion-total'],
        'f_manchas': ['peeling-antimanchas', 'peeling-exfoliante-lifting', 'mesoterapia-facial'],
        'f_marcas': ['microneedling-facial', 'peeling-estrias-cicatrices'],
        'f_volumen': ['relleno-labios', 'relleno-menton-mandibula', 'relleno-pomulos', 'bioestimulacion-total'],
        'f_ojeras': ['mesoterapia-polinucleotidos', 'mesoterapia-facial'],
        'c_celulitis': ['mesoterapia-corporal', 'maderoterapia-drenaje-linfatico'],
        'c_flacidez': ['diatermia-postparto', 'microneedling-corporal', 'maderoterapia-drenaje-linfatico'],
        'c_estrias': ['peeling-estrias-cicatrices', 'diatermia-cicatrices-fibrosis', 'microneedling-corporal'],
        'h_caida': ['mesoterapia-capilar']
    };

    function showStep(stepIndex) {
        document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));

        if (window.innerWidth <= 768 && stepIndex > 0 && stepIndex < 5) {
            setTimeout(() => {
                const recommenderSection = document.querySelector('.recommender-section');
                if (recommenderSection) {
                    recommenderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        }

        if (stepIndex === 0) {
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById('step-0').classList.add('active');
        } else if (stepIndex >= 1 && stepIndex <= 3) {
            quizHeader.style.display = 'block';
            quizNav.style.display = 'flex';
            document.getElementById(`step-${stepIndex}`).classList.add('active');
            stepNumText.textContent = stepIndex;
            progressFill.style.width = `${(stepIndex / totalSteps) * 100}%`;
            btnPrev.style.visibility = stepIndex === 1 ? 'hidden' : 'visible';
            if (stepIndex === 2) renderGoalOptions(answers.zone);
        } else if (stepIndex === 4) {
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById('step-loading').classList.add('active');
            setTimeout(() => showStep(5), 1500);
        } else if (stepIndex === 5) {
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById('step-results').classList.add('active');
            generateResults();
        }

        currentStep = stepIndex;
    }

    function renderGoalOptions(zone) {
        if (!zone || !goalOptions[zone]) return;
        goalContainer.innerHTML = goalOptions[zone].map(opt => `
            <label class="quiz-option">
                <input type="radio" name="q_goal" value="${opt.id}" ${answers.goal === opt.id ? 'checked' : ''}>
                <div class="quiz-option-content">
                    <i class="fas ${opt.icon}"></i>
                    <span>${t('recommender.goals.' + opt.id)}</span>
                </div>
            </label>
        `).join('');

        document.querySelectorAll('input[name="q_goal"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                answers.goal = e.target.value;
            });
        });
    }

    function isFree(price) {
        return FREE_PRICE_VALUES.has(String(price));
    }

    function generateResults() {
        let recommendedIds = recommendationMap[answers.goal] || [];
        let matchedTreatments = [];
        servicesData.forEach(cat => {
            if (cat.hidden) return;
            cat.treatments.forEach(item => {
                if (recommendedIds.includes(item.id) && !item.hidden && !item.comingSoon) {
                    matchedTreatments.push(item);
                }
            });
        });

        if (matchedTreatments.length === 0) {
            matchedTreatments.push({
                id: 'consulta-gratuita',
                title: t('recommender.fallbackTitle'),
                price: 'GRATIS',
                duration: '60 min',
                description: t('recommender.fallbackDesc')
            });
        }

        matchedTreatments = matchedTreatments.slice(0, 4);

        resultsContainer.innerHTML = matchedTreatments.map(item => `
            <div class="result-card">
                <div class="result-info">
                    <h4>${item.title}</h4>
                    <p class="result-desc">${item.description}</p>
                    <div class="result-meta">
                        <span><i class="far fa-clock"></i> ${item.duration}</span>
                        ${isFree(item.price) ? '' : `<span><i class="fas fa-shield-alt"></i> ${t('recommender.recommendedBadge')}</span>`}
                    </div>
                </div>
                <div class="result-action">
                    <span class="result-price">${isFree(item.price) ? item.price : `${item.price}€`}</span>
                    <a href="/contacto?servicio=${item.id}" class="btn btn-primary btn-sm">${t('recommender.book')} <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }

    btnStart.addEventListener('click', () => showStep(1));

    btnNext.addEventListener('click', () => {
        if (currentStep === 1 && !answers.zone) return alert(t('recommender.alertZone'));
        if (currentStep === 2 && !answers.goal) return alert(t('recommender.alertGoal'));
        if (currentStep === 3 && !answers.state) return alert(t('recommender.alertState'));

        if (currentStep === 3) showStep(4);
        else showStep(currentStep + 1);
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) showStep(currentStep - 1);
    });

    btnRestart.addEventListener('click', () => {
        answers.zone = '';
        answers.goal = '';
        answers.state = '';
        saveToLocal();
        document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
        showStep(1);
    });

    document.querySelectorAll('input[name="q_zone"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            answers.zone = e.target.value;
            answers.goal = '';
            saveToLocal();
        });
    });

    document.querySelectorAll('input[name="q_state"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            answers.state = e.target.value;
            saveToLocal();
        });
    });

    if (answers.zone) {
        const zoneInput = document.querySelector(`input[name="q_zone"][value="${answers.zone}"]`);
        if (zoneInput) zoneInput.checked = true;
    }
    if (answers.state) {
        const stateInput = document.querySelector(`input[name="q_state"][value="${answers.state}"]`);
        if (stateInput) stateInput.checked = true;
    }

    showStep(0);
}
