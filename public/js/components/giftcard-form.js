export function renderGiftCardForm(servicesData) {
    if (!servicesData) return '';

    // Filter valid treatments that have a price (numeric or string if we can parse it, but we know they are mostly numeric)
    const visibleServices = servicesData.filter(cat => !cat.hidden && cat.category.toUpperCase() !== 'OCULTOS');
    
    const treatmentOptions = visibleServices.map(category => {
        const options = category.treatments
            .filter(t => !t.hidden && t.price && t.price !== "GRATIS")
            .map(t => `<option value="${t.id}" data-price="${t.price}">${t.title} - ${t.price}€</option>`)
            .join('');
        return options ? `<optgroup label="${category.category}">${options}</optgroup>` : '';
    }).join('');

    return `
        <section class="giftcard-page-section">
            <div class="container">
                <div class="section-title animate-on-scroll">
                    <span>Regala Bienestar</span>
                    <h2>Configura tu Tarjeta Regalo</h2>
                </div>

                <div class="giftcard-layout">
                    <!-- Columna Izquierda (Galería + Form) -->
                    <div class="giftcard-left-column">
                        <!-- Galería de imágenes -->
                        <div class="giftcard-form-gallery-row animate-on-scroll">
                            <div class="gift-img-wrapper">
                                <img src="/img/giftcard-1.jpeg" alt="Caja Regalo Exterior" loading="lazy">
                            </div>
                            <div class="gift-img-wrapper">
                                <img src="/img/giftcard-2.jpeg" alt="Detalles de la tarjeta" loading="lazy">
                            </div>
                        </div>
                        
                        <!-- Formulario -->
                        <div class="giftcard-form-container animate-on-scroll">
                            <form id="giftcardForm">
                            <!-- BLOQUE 1: COMPRADOR -->
                            <div class="form-block">
                                <h3 class="form-block-title"><i class="fas fa-user"></i> Datos del Comprador</h3>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="buyerName">Nombre Completo *</label>
                                        <input type="text" id="buyerName" name="buyerName" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="buyerPhone">Teléfono *</label>
                                        <input type="tel" id="buyerPhone" name="buyerPhone" class="form-control" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="buyerEmail">Email *</label>
                                    <input type="email" id="buyerEmail" name="buyerEmail" class="form-control" required>
                                </div>
                            </div>

                            <!-- BLOQUE 2: DESTINATARIO Y ENVÍO -->
                            <div class="form-block">
                                <h3 class="form-block-title"><i class="fas fa-gift"></i> Datos del Destinatario</h3>
                                <div class="form-group">
                                    <label for="recipientName">Nombre del Destinatario *</label>
                                    <input type="text" id="recipientName" name="recipientName" class="form-control" required>
                                </div>
                                
                                <div class="form-group" style="margin-top: 1.5rem;">
                                    <label>Método de Envío *</label>
                                    <select id="shippingMethod" name="shippingMethod" class="form-control" aria-label="Método de envío" required>
                                        <option value="pickup">Recogida en Clínica (0,00€)</option>
                                        <option value="delivery">Envío a Domicilio en Cataluña (4,90€)</option>
                                    </select>
                                </div>

                                <div id="shippingAddressFields" style="display: none; margin-top: 1.5rem;">
                                    <div class="form-group">
                                        <label for="addressStreet">Calle y número *</label>
                                        <input type="text" id="addressStreet" name="addressStreet" class="form-control">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="addressDoor">Piso/Puerta</label>
                                            <input type="text" id="addressDoor" name="addressDoor" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="addressZip">Código Postal *</label>
                                            <input type="text" id="addressZip" name="addressZip" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="addressCity">Población *</label>
                                        <input type="text" id="addressCity" name="addressCity" class="form-control">
                                    </div>
                                </div>
                            </div>

                            <!-- BLOQUE 3: DEDICATORIA -->
                            <div class="form-block">
                                <h3 class="form-block-title"><i class="fas fa-pen-fancy"></i> Dedicatoria Personalizada</h3>
                                <div class="form-group">
                                    <label for="giftMessage">Mensaje para la tarjeta (Opcional, max 250 car.)</label>
                                    <textarea id="giftMessage" name="giftMessage" class="form-control" rows="3" maxlength="250" placeholder="Escribe unas palabras para esa persona especial..."></textarea>
                                </div>
                            </div>

                            <!-- BLOQUE 4: ELECCIÓN DEL REGALO -->
                            <div class="form-block">
                                <h3 class="form-block-title"><i class="fas fa-sparkles"></i> Elección del Regalo</h3>
                                
                                <div class="radio-cards-container">
                                    <label class="radio-card">
                                        <input type="radio" name="giftType" value="treatment" checked>
                                        <div class="radio-card-content">
                                            <i class="fas fa-spa"></i>
                                            <span>Tratamiento Específico</span>
                                        </div>
                                    </label>
                                    <label class="radio-card">
                                        <input type="radio" name="giftType" value="amount">
                                        <div class="radio-card-content">
                                            <i class="fas fa-euro-sign"></i>
                                            <span>Importe Libre</span>
                                        </div>
                                    </label>
                                </div>

                                <!-- Select de Tratamientos -->
                                <div id="treatmentSelection" class="form-group">
                                    <label for="selectedTreatment">Selecciona el tratamiento *</label>
                                    <select id="selectedTreatment" name="selectedTreatment" class="form-control">
                                        <option value="">Seleccione un tratamiento...</option>
                                        ${treatmentOptions}
                                    </select>
                                </div>

                                <!-- Select de Importe Libre -->
                                <div id="amountSelection" class="form-group" style="display: none;">
                                    <label for="selectedAmount">Selecciona el importe *</label>
                                    <select id="selectedAmount" name="selectedAmount" class="form-control">
                                        <option value="50">50 €</option>
                                        <option value="100">100 €</option>
                                        <option value="150">150 €</option>
                                        <option value="200">200 €</option>
                                        <option value="custom">Importe Personalizado</option>
                                    </select>
                                    
                                    <div id="customAmountInputWrapper" style="display: none; margin-top: 1rem;">
                                        <label for="customAmount">Importe en € *</label>
                                        <input type="number" id="customAmount" name="customAmount" class="form-control" min="20" step="5">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div> <!-- End left column -->

                    <!-- Resumen (Sidebar) -->
                    <div class="giftcard-summary animate-on-scroll">
                        <h3 class="summary-title">Resumen de tu pedido</h3>
                        
                        <div class="summary-line">
                            <span id="summaryGiftLabel">Regalo:</span>
                            <span id="summaryGiftPrice">0,00 €</span>
                        </div>
                        
                        <div class="summary-line">
                            <span id="summaryShippingLabel">Recogida en Clínica</span>
                            <span id="summaryShippingPrice">0,00 €</span>
                        </div>

                        <div class="summary-line total">
                            <span>Total</span>
                            <span id="summaryTotal">0,00 €</span>
                        </div>

                        <button type="submit" form="giftcardForm" class="btn btn-primary btn-confirm">
                            Confirmar y Realizar Pago <i class="fas fa-lock"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Bizum Modal -->
        <div id="bizumModal" class="bizum-modal-overlay">
            <div class="bizum-modal">
                <button class="bizum-modal-close" aria-label="Cerrar modal">&times;</button>
                <div class="bizum-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>Paso Final: Pago por Bizum</h3>
                <p>Tu tarjeta regalo casi está lista. Completa el pago de forma segura por Bizum.</p>
                
                <div class="bizum-details">
                    <div class="bizum-detail-row">
                        <span>Teléfono Bizum:</span>
                        <strong>+34 658 491 612</strong>
                    </div>
                    <div class="bizum-detail-row">
                        <span>Importe a enviar:</span>
                        <strong id="bizumTotalAmount">0,00 €</strong>
                    </div>
                    <div class="bizum-detail-row">
                        <span>Concepto obligatorio:</span>
                        <strong id="bizumConceptText">Regalo #REGALO-XXXX - [Nombre]</strong>
                    </div>
                </div>

                <button id="btnWhatsAppConfirm" class="btn btn-whatsapp">
                    Enviar comprobante por WhatsApp <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        </div>
    `;
}

// Lógica de UI interactiva
export function initGiftCardFormLogic(servicesData) {
    if (typeof document === 'undefined') return;

    const form = document.getElementById('giftcardForm');
    if (!form) return;

    // Elements
    const shippingMethod = document.getElementById('shippingMethod');
    const shippingAddressFields = document.getElementById('shippingAddressFields');
    const giftTypeRadios = document.getElementsByName('giftType');
    const treatmentSelection = document.getElementById('treatmentSelection');
    const amountSelection = document.getElementById('amountSelection');
    const selectedTreatment = document.getElementById('selectedTreatment');
    const selectedAmount = document.getElementById('selectedAmount');
    const customAmountInputWrapper = document.getElementById('customAmountInputWrapper');
    const customAmount = document.getElementById('customAmount');
    
    // Summary Elements
    const summaryGiftPrice = document.getElementById('summaryGiftPrice');
    const summaryShippingLabel = document.getElementById('summaryShippingLabel');
    const summaryShippingPrice = document.getElementById('summaryShippingPrice');
    const summaryTotal = document.getElementById('summaryTotal');

    // Modal Elements
    const bizumModal = document.getElementById('bizumModal');
    const modalClose = document.querySelector('.bizum-modal-close');
    const bizumTotalAmount = document.getElementById('bizumTotalAmount');
    const bizumConceptText = document.getElementById('bizumConceptText');
    const btnWhatsAppConfirm = document.getElementById('btnWhatsAppConfirm');

    let currentSubtotal = 0;
    let currentShipping = 0;
    let orderId = '';
    let buyerNameVal = '';
    let finalGiftName = '';

    // Helper: Update Summary
    function updateSummary() {
        // Shipping
        if (shippingMethod.value === 'delivery') {
            currentShipping = 4.90;
            summaryShippingLabel.textContent = "Envío a Domicilio";
            summaryShippingPrice.textContent = "4,90 €";
            
            // Required address fields
            document.getElementById('addressStreet').required = true;
            document.getElementById('addressZip').required = true;
            document.getElementById('addressCity').required = true;
        } else {
            currentShipping = 0;
            summaryShippingLabel.textContent = "Recogida en Clínica";
            summaryShippingPrice.textContent = "0,00 €";
            
            // Not required address fields
            document.getElementById('addressStreet').required = false;
            document.getElementById('addressZip').required = false;
            document.getElementById('addressCity').required = false;
        }

        // Subtotal logic
        const giftType = document.querySelector('input[name="giftType"]:checked').value;
        currentSubtotal = 0;
        finalGiftName = '';

        if (giftType === 'treatment') {
            const selectedOption = selectedTreatment.options[selectedTreatment.selectedIndex];
            if (selectedOption && selectedOption.value) {
                currentSubtotal = parseFloat(selectedOption.getAttribute('data-price')) || 0;
                finalGiftName = selectedOption.text;
            }
        } else if (giftType === 'amount') {
            if (selectedAmount.value === 'custom') {
                currentSubtotal = parseFloat(customAmount.value) || 0;
            } else {
                currentSubtotal = parseFloat(selectedAmount.value) || 0;
            }
            finalGiftName = `Tarjeta Regalo - ${currentSubtotal}€`;
        }

        summaryGiftPrice.textContent = `${currentSubtotal.toFixed(2).replace('.', ',')} €`;
        
        const total = currentSubtotal + currentShipping;
        summaryTotal.textContent = `${total.toFixed(2).replace('.', ',')} €`;
    }

    // Events: Shipping
    shippingMethod.addEventListener('change', () => {
        shippingAddressFields.style.display = shippingMethod.value === 'delivery' ? 'block' : 'none';
        updateSummary();
    });

    // Events: Gift Type
    giftTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'treatment') {
                treatmentSelection.style.display = 'block';
                amountSelection.style.display = 'none';
                selectedTreatment.required = true;
                selectedAmount.required = false;
                customAmount.required = false;
            } else {
                treatmentSelection.style.display = 'none';
                amountSelection.style.display = 'block';
                selectedTreatment.required = false;
                selectedAmount.required = true;
                if (selectedAmount.value === 'custom') customAmount.required = true;
            }
            updateSummary();
        });
    });

    // Events: Selectors
    selectedTreatment.addEventListener('change', updateSummary);
    selectedAmount.addEventListener('change', () => {
        if (selectedAmount.value === 'custom') {
            customAmountInputWrapper.style.display = 'block';
            customAmount.required = true;
        } else {
            customAmountInputWrapper.style.display = 'none';
            customAmount.required = false;
            customAmount.value = '';
        }
        updateSummary();
    });
    customAmount.addEventListener('input', updateSummary);

    // Initial Setup
    document.querySelector('input[name="giftType"][value="treatment"]').checked = true;
    selectedTreatment.required = true;
    updateSummary();

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate minimum price if custom
        if (currentSubtotal === 0) {
            alert("Por favor, selecciona un tratamiento válido o introduce un importe para la tarjeta.");
            return;
        }

        buyerNameVal = document.getElementById('buyerName').value.trim();
        orderId = `#REGALO-${Math.floor(1000 + Math.random() * 9000)}`;
        const totalStr = `${(currentSubtotal + currentShipping).toFixed(2).replace('.', ',')} €`;

        bizumTotalAmount.textContent = totalStr;
        bizumConceptText.textContent = `Regalo ${orderId} - ${buyerNameVal}`;
        
        // Open Modal
        bizumModal.classList.add('active');
    });

    // Modal Close
    modalClose.addEventListener('click', () => {
        bizumModal.classList.remove('active');
    });

    // WhatsApp Action
    btnWhatsAppConfirm.addEventListener('click', () => {
        const totalStr = `${(currentSubtotal + currentShipping).toFixed(2).replace('.', ',')} €`;
        const concept = `Regalo ${orderId} - ${buyerNameVal}`;
        
        const recipientName = document.getElementById('recipientName').value;
        const buyerPhone = document.getElementById('buyerPhone').value;
        const giftMessage = document.getElementById('giftMessage').value;
        
        let deliveryInfo = "Recogida en Clínica";
        if (shippingMethod.value === 'delivery') {
            const street = document.getElementById('addressStreet').value;
            const door = document.getElementById('addressDoor').value;
            const zip = document.getElementById('addressZip').value;
            const city = document.getElementById('addressCity').value;
            deliveryInfo = `Envío a domicilio: ${street}, ${door ? 'Pta '+door+', ' : ''}${zip} ${city}`;
        }

        const waText = `¡Hola! Acabo de hacer el pago por Bizum para una Tarjeta Regalo.
        
*Código Pedido:* ${orderId}
*Concepto Bizum:* ${concept}
*Importe Total:* ${totalStr}

*Datos del Regalo:*
- Comprador: ${buyerNameVal} (${buyerPhone})
- Destinatario: ${recipientName}
- Opción: ${finalGiftName}
- Envío: ${deliveryInfo}
${giftMessage ? `\n*Dedicatoria:* "${giftMessage}"` : ''}

Os paso el justificante ahora mismo.`;

        const waUrl = `https://wa.me/34658491612?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
    });
}
