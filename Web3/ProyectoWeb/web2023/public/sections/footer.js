class Footer extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`<br><hr>
<div class="div_pi">
    <strong>Ubicados: </strong>Puntarenas<br/>
    <strong>eMail:    </strong> <a href="mailto:lospoderosos41@gmail.com?subject=Solicito información">lospoderosos41@gmail.com</a><br />
    <strong>Teléfonos: </strong>85136696 ó 60381539
</div>
<div class="div_pc">
    Carrera de Tecnologías de la información<br/>
    Curso de Tecnologías y Sistemas Web 2<br/>
    Desarrollado como proyecto final
</div>
<div class="div_pd">
    <a href="https://www.facebook.com/"><i class="fa fa-2x fa-facebook"></i></a>
    <br>
    <a href="https://twitter.com/"><i class="fa fa-2x fa-twitter"></i></a>
</div>` 
    }     
}

customElements.define('footer-component', Footer);

