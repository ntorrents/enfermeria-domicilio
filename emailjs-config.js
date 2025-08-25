// Configuración de EmailJS
// IMPORTANTE: Después de crear tu cuenta en EmailJS, reemplaza estos valores

const EMAILJS_CONFIG = {
	// Tu Public Key de EmailJS (lo obtienes en https://dashboard.emailjs.com/admin/account)
	PUBLIC_KEY: "AQv4s6RNNOxAXksBi",

	// Tu Service ID (lo obtienes al configurar un servicio de email)
	SERVICE_ID: "service_ldwy8nm",

	// Tu Template ID (lo obtienes al crear una plantilla)
	TEMPLATE_ID: "template_83h4coo",
};

// Función para inicializar EmailJS
function initializeEmailJS() {
	// Inicializar EmailJS con tu Public Key
	emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Función para enviar email
function sendEmail(formData) {
	const templateParams = {
		name: formData.nombre,
		email: formData.email || "No proporcionado",
		phone: formData.telefono,
		service: formData.servicio,
		message: formData.mensaje || "Sin mensaje adicional",
		time: new Date().toLocaleString("es-ES", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}),
	};

	return emailjs.send(
		EMAILJS_CONFIG.SERVICE_ID,
		EMAILJS_CONFIG.TEMPLATE_ID,
		templateParams
	);
}

// Exportar para uso global
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
window.initializeEmailJS = initializeEmailJS;
window.sendEmail = sendEmail;
