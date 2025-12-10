import { LitElement, html, css, unsafeCSS } from "lit";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css?inline";

export class SaludarConEventoBoton extends LitElement {

    static styles = [
        unsafeCSS(bootstrap)
    ];

    static properties = {
        mensaje: { type: String }
    };

    constructor() {
        super();
        this.mensaje = "";
    }

    saludar() {
        this.mensaje = "Hola, bienvenido al curso de LitElement";
    }

    render() {
        return html`
            <button class="btn btn-light" @click=${this.saludar}>
                Click para mostrar saludo
            </button>

            <p>${this.mensaje}</p>
        `;
    }
}

customElements.define("saludar-con-evento-boton", SaludarConEventoBoton);
