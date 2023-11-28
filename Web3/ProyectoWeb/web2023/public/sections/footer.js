
class Footer extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <hr>
<div class="contact-info">
    <strong>Ubicados:</strong> Puntarenas<br/>
    <strong>eMail:</strong> <a href="mailto:lospoderosos41@gmail.com?subject=Solicito información">lospoderosos41@gmail.com</a><br />
    <strong>Teléfonos:</strong> +50685136696 ó +50660381539
</div>

<div class="course-info">
    Carrera de Tecnologías de la Información<br/>
    Curso de Tecnologías y Sistemas Web 2<br/>
    Desarrollado como proyecto final
</div>

<div class="social-links">
    <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i class="fab fa-facebook fa-2x"></i></a>
    <a href="https://twitter.com/" target="_blank" title="Twitter"><i class="fab fa-twitter fa-2x"></i></a>
</div>

<style>
/* Estilo para el pie de página */
footer {
    text-align: center; /* Alineación centrada del texto en el pie de página */
    margin-top: 20px; /* Espaciado superior del pie de página */
    padding: 10px 0; /* Espaciado interno del pie de página */
    background-color: #343a40; /* Color de fondo del pie de página */
    color: #fff; /* Color del texto */
    font-weight: bold;
}

/* Estilo para la información de contacto, curso y redes sociales */
.contact-info,
.course-info,
.social-links {
    margin-top: 10px; /* Espaciado superior */
}

.contact-info strong,
.course-info strong {
    color: #007bff; /* Color de los textos fuertes (strong) */
}

.social-links a {
    margin-right: 10px; /* Espaciado entre iconos de redes sociales */
    color: #fff; /* Color de los íconos de redes sociales */
}

.social-links a:hover {
    color: #007bff; /* Cambiar color al pasar el ratón */
}
</style>

` 
    }     
}

customElements.define('footer-component', Footer);

