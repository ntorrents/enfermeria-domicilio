/** Web3Forms — envío del formulario de contacto */
const WEB3FORMS_ACCESS_KEY = '97d04407-2eca-477c-a2d8-1f9db7098583';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * @param {{
 *   nombre: string,
 *   telefono?: string,
 *   email?: string,
 *   servicio?: string,
 *   mensaje?: string,
 * }}
 */
export async function sendContactForm(formData) {
    const emailRaw = (formData.email || '').trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw);
    // Web3Forms exige un email con formato válido; si el usuario no lo da, usamos el de la clínica
    const email = emailLooksValid ? emailRaw : 'contacto@c3linic.com';

    const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Nueva solicitud de cita — C3linic',
        from_name: 'Web C3linic',
        name: formData.nombre || '',
        email,
        replyto: emailLooksValid ? emailRaw : undefined,
        phone: formData.telefono || '',
        service: formData.servicio || '',
        message: [
            formData.mensaje || 'Sin mensaje adicional',
            '',
            `Teléfono: ${formData.telefono || 'No indicado'}`,
            `Servicio: ${formData.servicio || 'No indicado'}`,
            `Email visitante: ${emailLooksValid ? emailRaw : 'No indicado'}`,
        ].join('\n'),
    };

    // Quitar campos undefined
    Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined) delete payload[k];
    });

    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.message || 'Web3Forms error');
    }
    return data;
}
