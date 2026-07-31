export function renderPostCare() {
    return `
        <section id="cuidados-post-tratamiento" class="postcare-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>Recomendaciones</span>
                    <h2>Cuidados en Casa</h2>
                </div>
                
                <div class="postcare-intro animate-on-scroll">
                    <div class="postcare-intro-content">
                        <p>
                            "El éxito de cualquier tratamiento dermoestético no termina en la consulta; continúa en casa con tus cuidados diarios. 
                            He preparado estas indicaciones para asegurarnos de que los resultados sean óptimos y tu piel se recupere de forma ideal. 
                            ¡Sigue estos consejos y disfruta de tu nueva luminosidad!"
                        </p>
                        <div class="postcare-author">
                            <strong>— Christine Cano</strong>
                            <span>Enfermera Dermoestética</span>
                        </div>
                    </div>
                </div>

                <div class="postcare-tabs-container animate-on-scroll">
                    <!-- Tab Buttons -->
                    <div class="postcare-tabs-header">
                        <button class="postcare-tab-btn active" data-target="postcare-facial">
                            <i class="fas fa-leaf"></i> Facial & Peeling
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-inyectables">
                            <i class="fas fa-syringe"></i> Inyectables
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-corporal">
                            <i class="fas fa-spa"></i> Corporal
                        </button>
                        <button class="postcare-tab-btn" data-target="postcare-capilar">
                            <i class="fas fa-spray-can"></i> Capilar
                        </button>
                    </div>

                    <!-- Tab Contents -->
                    <div class="postcare-tabs-content">
                        <!-- Facial & Peeling -->
                        <div id="postcare-facial" class="postcare-tab-panel active">
                            <h3>Cuidados para Facial & Peeling</h3>
                            <ul class="postcare-list">
                                <li><i class="fas fa-sun"></i> <strong>Protección Solar Estricta:</strong> Aplica FPS 50+ cada 2-3 horas y evita la exposición solar directa durante los próximos días.</li>
                                <li><i class="fas fa-tint"></i> <strong>Extra Hidratación:</strong> Tu piel puede sentirse tirante o seca. Usa cremas hidratantes reparadoras recomendadas.</li>
                                <li><i class="fas fa-ban"></i> <strong>Evitar Calor Extremo:</strong> No acudas a saunas, baños turcos ni realices ejercicio intenso que provoque mucha sudoración las primeras 48h.</li>
                                <li><i class="fas fa-hand-sparkles"></i> <strong>No Exfoliar:</strong> Evita el uso de exfoliantes, ácidos o retinoles hasta que la piel se haya recuperado completamente.</li>
                            </ul>
                        </div>

                        <!-- Inyectables -->
                        <div id="postcare-inyectables" class="postcare-tab-panel">
                            <h3>Cuidados para Inyectables (Ácido Hialurónico, Polinucleótidos)</h3>
                            <ul class="postcare-list">
                                <li><i class="fas fa-bed"></i> <strong>Reposo Relativo:</strong> Evita el ejercicio físico intenso y agacharte bruscamente durante las primeras 24 horas.</li>
                                <li><i class="fas fa-hand-paper"></i> <strong>No Tocar ni Presionar:</strong> No masajees ni presiones la zona tratada para evitar desplazar el producto.</li>
                                <li><i class="fas fa-snowflake"></i> <strong>Frío Local:</strong> Si notas inflamación, puedes aplicar frío local indirecto (envuelto en un paño) durante intervalos cortos.</li>
                                <li><i class="fas fa-wine-glass-alt"></i> <strong>Evitar Alcohol:</strong> Es recomendable no consumir alcohol las primeras 24h para reducir el riesgo de hematomas.</li>
                            </ul>
                        </div>

                        <!-- Corporal -->
                        <div id="postcare-corporal" class="postcare-tab-panel">
                            <h3>Cuidados para Tratamientos Corporales</h3>
                            <ul class="postcare-list">
                                <li><i class="fas fa-glass-water"></i> <strong>Aumentar la Ingesta de Agua:</strong> Bebe al menos 2 litros de agua al día para ayudar al drenaje linfático y eliminar toxinas.</li>
                                <li><i class="fas fa-walking"></i> <strong>Actividad Ligera:</strong> Caminar ayuda a activar la circulación y mejora los resultados de los tratamientos corporales.</li>
                                <li><i class="fas fa-pump-soap"></i> <strong>Hidratación Profunda:</strong> Mantén la piel del cuerpo muy bien hidratada con cremas reafirmantes o anticelulíticas si se te ha indicado.</li>
                                <li><i class="fas fa-bath"></i> <strong>Evitar Agua Muy Caliente:</strong> Duchas con agua templada y evitar baños muy calientes inmediatos.</li>
                            </ul>
                        </div>

                        <!-- Capilar -->
                        <div id="postcare-capilar" class="postcare-tab-panel">
                            <h3>Cuidados para Tratamientos Capilares</h3>
                            <ul class="postcare-list">
                                <li><i class="fas fa-shower"></i> <strong>Lavado Suave:</strong> Evita lavar el cabello en las primeras 12-24 horas tras el tratamiento. Luego usa un champú suave.</li>
                                <li><i class="fas fa-spray-can"></i> <strong>Productos Recomendados:</strong> Utiliza únicamente los productos tópicos pautados en consulta.</li>
                                <li><i class="fas fa-ban"></i> <strong>Sin Tratamientos Agresivos:</strong> Evita tintes, decoloraciones o herramientas de calor extremo (planchas) durante los primeros días.</li>
                                <li><i class="fas fa-hard-hat"></i> <strong>Proteger del Sol y Roce:</strong> Usa sombreros holgados si vas a estar al sol y evita rascar el cuero cabelludo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Lógica de Pestañas
export function initPostCareTabs() {
    const tabBtns = document.querySelectorAll('.postcare-tab-btn');
    const tabPanels = document.querySelectorAll('.postcare-tab-panel');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Eliminar active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Añadir active al clickado
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}
