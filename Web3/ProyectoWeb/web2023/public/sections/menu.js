class Menu extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
            <img src="images/logo/Fantasticos.png" alt="" width="50" height="50" class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="categories.html">Categorías</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="suppliers.html">Proveedores</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="customers.html">Clientes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="salir()">Salir</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
/* Estilos para un tema oscuro en el navbar */
.navbar {
    background-color: #343a40; /* Color de fondo del navbar */
    box-shadow: 0 10px 60px rgba(52, 58, 64, 0.3); /* Sombra con tono similar al fondo */
}

.navbar-brand img {
    border-radius: 50%; /* Redondear la imagen del logotipo */
}

.navbar-toggler-icon {
    background-color: #007bff; /* Color del icono del botón de navegación en modo colapsado */
}

.navbar-nav .nav-link {
    padding: 10px 15px; /* Aumentar el espacio alrededor de los enlaces */
    color: #ffffff; /* Color del texto en el navbar */
}

.navbar-nav .nav-link:hover {
    color: #007bff; /* Cambiar color al pasar el ratón */
}

.navbar-toggler {
    border: none; /* Sin borde en el botón de navegación */
}

/* Cambiar el color del botón de navegación cuando está abierto */
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler:hover {
    background-color: #007bff;
    outline: none;
}

/* Estilo del menú desplegable */
.navbar-nav .dropdown-menu {
    border: none; /* Sin borde en el menú desplegable */
    border-radius: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    background-color: #343a40; /* Color de fondo del menú desplegable */
}

/* Estilo de los elementos del menú desplegable */
.navbar-nav .dropdown-menu a {
    color: #ffffff; /* Color del texto en el menú desplegable */
}

.navbar-nav .dropdown-menu a:hover {
    background-color: #007bff; /* Cambiar color al pasar el ratón */
    color: #fff; /* Color del texto al pasar el ratón */
}
</style>


    `
    }
}


customElements.define('menu-component', Menu);

