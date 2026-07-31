export function renderHeader() {
    return `
        <nav class="nav container">
            <div class="nav-brand">
                <a href="/">
                    <img src="/img/Logo C3 svg.svg?v=202607261605" alt="Logo C3linic" class="logo-img-header"
                        style="mix-blend-mode: multiply; vertical-align: middle;" width="70" height="70" loading="eager"
                        fetchpriority="high">
                    <span>C<b>3</b>LINIC</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="/#inicio">Inicio</a></li>
                <li><a href="/#sobre-mi">Sobre Mí</a></li>
                <li><a href="/#servicios">Servicios</a></li>
                <li><a href="/#fotos">Fotos</a></li>
                <li><a href="/cuidados-post-tratamiento">Cuidados</a></li>
                <li class="nav-item"><a href="/tarjeta-regalo" class="nav-link">Tarjeta Regalo</a></li>
                <li class="nav-item"><a href="/recomendador" class="nav-link" style="color: var(--primary); font-weight: 600;"><i class="fas fa-magic"></i> Test de Piel</a></li>
                <li><a href="/contacto" class="btn-nav">Cita Previa</a></li>
            </ul>
            <div class="nav-toggle" role="button" tabindex="0" aria-label="Abrir menú">
                <span></span><span></span><span></span>
            </div>
        </nav>
    `;
}
