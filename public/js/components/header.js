export function renderHeader() {
    return `
        <nav class="nav container">
            <div class="nav-brand">
                <a href="/" style="display: flex; align-items: center; gap: 0.8rem;">
                    <img src="/img/Logo C3 svg.svg" alt="Logo C3linic" class="logo-img-header"
                        style="mix-blend-mode: multiply; vertical-align: middle;" width="70" height="70" loading="eager"
                        fetchpriority="high">
                    <span>C<b>3</b>LINIC</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item has-dropdown">
                    <a href="/#servicios" class="nav-link">Servicios <svg width="0.8rem" height="0.8rem" viewBox="0 0 512 512" fill="currentColor" style="vertical-align: middle; margin-left: 2px;" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></a>
                    <ul class="dropdown-menu">
                        <li><a href="/#servicios">Tratamientos</a></li>
                        <li><a href="/tarjeta-regalo">Tarjeta Regalo</a></li>
                        <li><a href="/cuidados-post-tratamiento">Cuidados Post-Tratamiento</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="/recomendador" class="nav-link">✨ ¿Qué necesita tu piel?</a></li>
                <li class="nav-item">
                    <a href="/contacto" class="btn btn-primary btn-sm nav-btn">Contacto</a>
                </li>
            </ul>
            <div class="nav-toggle" role="button" tabindex="0" aria-label="Abrir menú">
                <span></span><span></span><span></span>
            </div>
        </nav>
    `;
}
