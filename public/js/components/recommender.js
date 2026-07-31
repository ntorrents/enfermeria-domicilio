export function renderRecommender() {
    return `
        <section class="recommender-section">
            <div class="container" style="padding-top: 2rem;">
                <div class="section-title animate-on-scroll">
                    <span>Test de Piel</span>
                    <h2>¿Qué necesita tu piel?</h2>
                </div>

                <div class="recommender-container animate-on-scroll">
                    
                    <!-- Header y Progress -->
                    <div id="quizHeader" class="quiz-header" style="display: none;">
                        <div class="quiz-progress-text">Paso <span id="currentStepNum">1</span> de 3</div>
                        <div class="quiz-progress-bar">
                            <div id="quizProgressFill" class="quiz-progress-fill"></div>
                        </div>
                    </div>

                    <!-- PANTALLA INICIAL (STEP 0) -->
                    <div id="step-0" class="quiz-step active" style="text-align: center;">
                        <i class="fas fa-magic" style="font-size: 3rem; color: var(--accent); margin-bottom: 1.5rem;"></i>
                        <h3 class="quiz-question">Descubre tu tratamiento ideal</h3>
                        <p style="color: var(--text-main); margin-bottom: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                            Responde a 3 breves preguntas sobre tu piel y tus objetivos, y te recomendaremos los tratamientos dermoestéticos que mejor se adaptan a tus necesidades.
                        </p>
                        <button id="btnStartQuiz" class="btn btn-primary">Comenzar Test <i class="fas fa-arrow-right"></i></button>
                    </div>

                    <!-- PASO 1: ZONA -->
                    <div id="step-1" class="quiz-step">
                        <h3 class="quiz-question">1. ¿Qué zona quieres tratar?</h3>
                        <div class="quiz-options-grid">
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="facial">
                                <div class="quiz-option-content">
                                    <i class="fas fa-face-smile"></i>
                                    <span>Facial</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="corporal">
                                <div class="quiz-option-content">
                                    <i class="fas fa-child"></i>
                                    <span>Corporal</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_zone" value="capilar">
                                <div class="quiz-option-content">
                                    <i class="fas fa-user"></i>
                                    <span>Capilar</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- PASO 2: OBJETIVO (Opciones inyectadas por JS) -->
                    <div id="step-2" class="quiz-step">
                        <h3 class="quiz-question">2. ¿Cuál es tu preocupación principal?</h3>
                        <div id="q_goal_container" class="quiz-options-grid">
                            <!-- Opciones dinámicas -->
                        </div>
                    </div>

                    <!-- PASO 3: ESTADO PIEL -->
                    <div id="step-3" class="quiz-step">
                        <h3 class="quiz-question">3. ¿Cómo definirías el estado de tu piel?</h3>
                        <div class="quiz-options-grid">
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="sensible">
                                <div class="quiz-option-content">
                                    <i class="fas fa-feather"></i>
                                    <span>Sensible o reactiva</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="seca">
                                <div class="quiz-option-content">
                                    <i class="fas fa-droplet-slash"></i>
                                    <span>Seca / Apagada</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="mixta">
                                <div class="quiz-option-content">
                                    <i class="fas fa-droplet"></i>
                                    <span>Mixta / Grasa</span>
                                </div>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="q_state" value="madura">
                                <div class="quiz-option-content">
                                    <i class="fas fa-spa"></i>
                                    <span>Madura / Flacidez</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- PANTALLA DE CARGA -->
                    <div id="step-loading" class="quiz-step quiz-loading">
                        <div class="spinner"></div>
                        <h3 style="font-family: 'Playfair Display', serif; color: var(--primary);">Analizando tus respuestas...</h3>
                        <p style="color: var(--text-muted);">Buscando los mejores tratamientos para ti</p>
                    </div>

                    <!-- RESULTADOS -->
                    <div id="step-results" class="quiz-step">
                        <div class="results-header">
                            <h3>Tus Tratamientos Recomendados</h3>
                            <p style="color: var(--text-main);">Basado en tus respuestas, estas son las mejores opciones para ti:</p>
                        </div>
                        
                        <div id="resultsContainer" class="results-grid">
                            <!-- Inyectado por JS -->
                        </div>

                        <div style="text-align: center; margin-top: 2rem;">
                            <button id="btnRestartQuiz" class="btn btn-secondary"><i class="fas fa-redo"></i> Volver a hacer el test</button>
                        </div>
                    </div>

                    <!-- BOTONERA INFERIOR (Oculta al inicio y al final) -->
                    <div id="quizNav" class="quiz-navigation" style="display: none;">
                        <button id="btnPrev" class="btn btn-prev"><i class="fas fa-arrow-left"></i> Anterior</button>
                        <button id="btnNext" class="btn btn-primary">Siguiente <i class="fas fa-arrow-right"></i></button>
                    </div>

                </div>
            </div>
        </section>
    `;
}

export function initRecommenderLogic(servicesData) {
    if (typeof document === 'undefined') return;

    let currentStep = 0; // 0 = intro, 1..3 = quiz, 4 = loading, 5 = results
    const totalSteps = 3;
    
    // Respuestas
    const answers = {
        zone: '',
        goal: '',
        state: ''
    };

    // DOM Elements
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

    // Data para el paso 2 (Goals según Zona)
    const goalOptions = {
        facial: [
            { id: 'f_arrugas', label: 'Líneas de expresión / Arrugas', icon: 'fa-face-smile' },
            { id: 'f_manchas', label: 'Manchas / Falta de luminosidad', icon: 'fa-sun' },
            { id: 'f_marcas', label: 'Marcas de acné / Textura', icon: 'fa-wand-magic-sparkles' },
            { id: 'f_volumen', label: 'Pérdida de volumen / Armonización', icon: 'fa-syringe' },
            { id: 'f_ojeras', label: 'Ojeras / Mirada cansada', icon: 'fa-eye' }
        ],
        corporal: [
            { id: 'c_celulitis', label: 'Celulitis / Grasa localizada', icon: 'fa-person-running' },
            { id: 'c_flacidez', label: 'Flacidez / Recuperación', icon: 'fa-person-dress' },
            { id: 'c_estrias', label: 'Estrías / Cicatrices', icon: 'fa-band-aid' }
        ],
        capilar: [
            { id: 'h_caida', label: 'Caída del cabello / Poco volumen', icon: 'fa-user' }
        ]
    };

    // Dictionary para Mapear Respuestas (goal -> service IDs recomendados)
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
        // Ocultar todos
        document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
        
        // Setup visibilidad extra
        if (stepIndex === 0) {
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById(`step-0`).classList.add('active');
        } else if (stepIndex >= 1 && stepIndex <= 3) {
            quizHeader.style.display = 'block';
            quizNav.style.display = 'flex';
            document.getElementById(`step-${stepIndex}`).classList.add('active');
            
            // Actualizar progress
            stepNumText.textContent = stepIndex;
            progressFill.style.width = `${(stepIndex / totalSteps) * 100}%`;
            
            // Estado botón Prev
            btnPrev.style.visibility = stepIndex === 1 ? 'hidden' : 'visible';
            
            // Si vamos al paso 2, renderizar dinámicamente según zona
            if (stepIndex === 2) {
                renderGoalOptions(answers.zone);
            }
        } else if (stepIndex === 4) {
            // Loading
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById('step-loading').classList.add('active');
            
            setTimeout(() => {
                showStep(5);
            }, 1500); // 1.5s delay
        } else if (stepIndex === 5) {
            // Results
            quizHeader.style.display = 'none';
            quizNav.style.display = 'none';
            document.getElementById('step-results').classList.add('active');
            generateResults();
        }
        
        currentStep = stepIndex;
    }

    function renderGoalOptions(zone) {
        if (!zone || !goalOptions[zone]) return;
        
        const options = goalOptions[zone];
        goalContainer.innerHTML = options.map(opt => `
            <label class="quiz-option">
                <input type="radio" name="q_goal" value="${opt.id}" ${answers.goal === opt.id ? 'checked' : ''}>
                <div class="quiz-option-content">
                    <i class="fas ${opt.icon}"></i>
                    <span>${opt.label}</span>
                </div>
            </label>
        `).join('');

        // Re-attach listener
        document.querySelectorAll('input[name="q_goal"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                answers.goal = e.target.value;
            });
        });
    }

    function generateResults() {
        // 1. Obtener IDs recomendados
        let recommendedIds = recommendationMap[answers.goal] || [];
        
        // 2. Extraer los datos reales del JSON (servicesData)
        let matchedTreatments = [];
        servicesData.forEach(cat => {
            cat.treatments.forEach(t => {
                if (recommendedIds.includes(t.id)) {
                    matchedTreatments.push(t);
                }
            });
        });

        // Fallback genérico si algo falla
        if (matchedTreatments.length === 0) {
            matchedTreatments.push({
                id: 'consulta-gratuita',
                title: '1ª Consulta Informativa',
                price: 'GRATIS',
                duration: '60 min',
                description: 'La mejor opción para analizar tu piel en detalle y decidir juntas el camino a seguir.'
            });
        }

        // Limitar a máximo 3 resultados para no saturar
        matchedTreatments = matchedTreatments.slice(0, 3);

        // 3. Renderizar las tarjetas
        resultsContainer.innerHTML = matchedTreatments.map(t => `
            <div class="result-card">
                <div class="result-info">
                    <h4>${t.title}</h4>
                    <p class="result-desc">${t.description}</p>
                    <div class="result-meta">
                        <span><i class="far fa-clock"></i> ${t.duration}</span>
                        ${t.price === 'GRATIS' ? '' : `<span><i class="fas fa-shield-alt"></i> Recomendado para ti</span>`}
                    </div>
                </div>
                <div class="result-action">
                    <span class="result-price">${t.price === 'GRATIS' ? 'GRATIS' : `${t.price}€`}</span>
                    <a href="/contacto?servicio=${t.id}" class="btn btn-primary btn-sm">Reservar cita <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }

    // Listeners
    btnStart.addEventListener('click', () => showStep(1));
    
    btnNext.addEventListener('click', () => {
        // Validar respuesta antes de avanzar
        if (currentStep === 1 && !answers.zone) return alert("Por favor, selecciona una zona.");
        if (currentStep === 2 && !answers.goal) return alert("Por favor, selecciona una preocupación principal.");
        if (currentStep === 3 && !answers.state) return alert("Por favor, indica el estado de tu piel.");

        if (currentStep === 3) {
            showStep(4); // Go to loading
        } else {
            showStep(currentStep + 1);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) showStep(currentStep - 1);
    });

    btnRestart.addEventListener('click', () => {
        // Reset state
        answers.zone = '';
        answers.goal = '';
        answers.state = '';
        document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
        showStep(1);
    });

    // Grabar respuestas
    document.querySelectorAll('input[name="q_zone"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            answers.zone = e.target.value;
            // Si cambian de zona, borrar el goal porque las opciones cambiarán
            answers.goal = ''; 
        });
    });

    document.querySelectorAll('input[name="q_state"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            answers.state = e.target.value;
        });
    });

    // Iniciar con todo oculto excepto paso 0
    showStep(0);
}
