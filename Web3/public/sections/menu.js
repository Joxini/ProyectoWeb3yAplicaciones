class Menu extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false; // Agregar un estado de seguimiento para el menú

        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">
                        <img src="images/logo/Fantasticos.png" alt="" width="50" height="50" class="d-inline-block align-text-top">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="MyProjects.html">Mis proyectos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="AddProjects.html">Subir proyecto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="aboutUs.html">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onclick="salir()">Cerrar sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Agregar eventos clic al botón del menú
        const navbarToggler = this.querySelector('.navbar-toggler');
        const navbarCollapse = this.querySelector('.navbar-collapse');

        navbarToggler.addEventListener('click', () => {
            // Llamar al método toggleMenu para alternar el estado del menú
            this.toggleMenu();
        });

        // Resaltar la opción seleccionada
        this.highlightSelectedOption();
    }

    toggleMenu() {
        const navbarCollapse = this.querySelector('.navbar-collapse');

        // Alternar el estado del menú y aplicar la clase 'show' según sea necesario
        if (this.isOpen) {
            new bootstrap.Collapse(navbarCollapse, { toggle: false });
        } else {
            new bootstrap.Collapse(navbarCollapse);
        }

        this.isOpen = !this.isOpen; // Invertir el estado del menú
    }

    highlightSelectedOption() {
        const currentPath = window.location.pathname;

        // Obtener la lista de enlaces
        const navLinks = this.querySelectorAll('.nav-link');

        // Iterar sobre los enlaces y resaltar el seleccionado
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');

            if (currentPath === linkPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

customElements.define('menu-component', Menu);
