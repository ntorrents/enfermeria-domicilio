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
    const payload = new FormData();
    payload.append('access_key', WEB3FORMS_ACCESS_KEY);
    payload.append('subject', 'Nueva solicitud de cita — C3linic');
    payload.append('from_name', 'Web C3linic');
    payload.append('name', formData.nombre || '');
    payload.append('email', formData.email || 'no-indicado@c3linic.local');
    payload.append('phone', formData.telefono || '');
    payload.append('service', formData.servicio || '');
    payload.append(
        'message',
        [
            formData.mensaje || 'Sin mensaje adicional',
            '',
            `Teléfono: ${formData.telefono || 'No indicado'}`,
            `Servicio: ${formData.servicio || 'No indicado'}`,
            `Email: ${formData.email || 'No indicado'}`,
        ].join('\n')
    );

    // Honeypot anti-spam (debe ir vacío)
    payload.append('botcheck', '');

    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: payload,
    });

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.message || 'Web3Forms error');
    }
    return data;
}
