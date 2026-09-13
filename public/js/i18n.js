const STORAGE_KEY = 'c3linic_lang';
const SUPPORTED = ['es', 'ca'];

let currentLang = null;
let uiStrings = {};

export function detectLang() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (SUPPORTED.includes(stored)) return stored;
	} catch (_) { /* ignore */ }
	const nav = (navigator.language || '').toLowerCase();
	if (nav.startsWith('es')) return 'es';
	// Per defecte català (Terrassa / Catalunya)
	return 'ca';
}

export function getLang() {
	if (!currentLang) currentLang = detectLang();
	return currentLang;
}

export function setLang(lang) {
	if (!SUPPORTED.includes(lang)) return;
	currentLang = lang;
	try {
		localStorage.setItem(STORAGE_KEY, lang);
	} catch (_) { /* ignore */ }
	document.documentElement.lang = lang;
	window.location.reload();
}

export function t(key, fallback = '') {
	const parts = key.split('.');
	let node = uiStrings;
	for (const part of parts) {
		if (node == null || typeof node !== 'object') return fallback || key;
		node = node[part];
	}
	return node == null ? (fallback || key) : node;
}

export function getUI() {
	return uiStrings;
}

export async function loadUI(lang = getLang()) {
	currentLang = lang;
	document.documentElement.lang = lang;
	const res = await fetch(`/config/${lang}/ui.json?v=202609131730`);
	uiStrings = await res.json();
	window.__I18N = { lang, t, getUI, setLang };
	return uiStrings;
}

export function configUrl(file, lang = getLang()) {
	return `/config/${lang}/${file}?v=202609131730`;
}

/** Títulos de detalle que no se muestran en el modal (ES + CA). */
export const DETAIL_EXCLUDE_TITLES = new Set([
	'Beneficios Clave',
	'Beneficis Clau',
	'Sesiones',
	'Sessions',
	'Resultados',
	'Resultats',
]);

export const FREE_PRICE_VALUES = new Set(['GRATIS', 'GRATUÏT', 'GRATUIT']);
