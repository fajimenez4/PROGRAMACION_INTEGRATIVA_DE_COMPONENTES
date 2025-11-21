import { LitElement,html,css } from "lit";

export class SaludoNombre extends LitElement {

    static properties = {
        nombre: {type: String},
        edad: {type: Number}
    }

    render(){
        // let = this.nombre+" "+ this.edad;
        // let nombre = this.getAttribute('nombre');
        // let edad = this.getAttribute('edad');
        return html `
            <h1> Hola, me llamo ${this.nombre} y tengo ${this.edad}</h1>
        `
    }
}
customElements.define('saludo-nombre', SaludoNombre);