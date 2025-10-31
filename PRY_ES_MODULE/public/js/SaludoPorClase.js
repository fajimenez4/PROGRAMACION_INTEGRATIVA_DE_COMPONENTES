export class SaludoPorClase extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow ({mode: 'open'});
        const nombre = this.getAttribute('nombres');
        const apellido = this.getAttribute('apellido');
        shadow.innerHTML =
        `
            <h1>Hola ${nombre} ${apellido} buenas noches</h1>


        `
        
    }
}

customElements.define( 'saludo-clase', SaludoPorClase );