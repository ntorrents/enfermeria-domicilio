// Configuración de EmailJS
// IMPORTANTE: Después de crear tu cuenta en EmailJS, reemplaza estos valores

const EMAILJS_CONFIG = {
	// Tu Public Key de EmailJS (lo obtienes en https://dashboard.emailjs.com/admin/account)
	PUBLIC_KEY: "AQv4s6RNNOxAXksBi",

	// Tu Service ID (lo obtienes al configurar un servicio de email)
	SERVICE_ID: "service_x4htsjf",

	// Tu Template ID (lo obtienes al crear una plantilla)
	TEMPLATE_ID: "template_fyzv8r7",
};

// Función para inicializar EmailJS
function initializeEmailJS() {
	// Inicializar EmailJS con tu Public Key
	emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Función para enviar email
function sendEmail(formData) {
	// Mapeamos los datos para que coincidan con las variables de la plantilla {{variable}}
	const templateParams = {
		user_name: formData.user_name || formData.nombre,
		user_email: formData.user_email || formData.email || "No proporcionado",
		user_phone: formData.user_phone || formData.telefono,
		service_interest: formData.service_interest || formData.servicio,
		message: formData.message || formData.mensaje || "Sin mensaje adicional",
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
