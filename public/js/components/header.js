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
                    <a href="/#servicios" class="nav-link">Servicios <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i></a>
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
