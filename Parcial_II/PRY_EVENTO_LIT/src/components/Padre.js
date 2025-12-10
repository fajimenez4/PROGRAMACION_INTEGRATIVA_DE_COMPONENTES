import { LitElement, html, unsafeCSS } from "lit";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css?inline";
import "./Hijo";

export class Padre extends LitElement {
    static styles = [
        unsafeCSS(bootstrap)
    ];
    static properties = {
        mensaje_Recibido: { type: String }
    };
    constructor() {
        super();
        this.mensaje_Recibido = "Mensaje inicial del padre";
    }
    _mostrarTexto(event) {
        this.mensaje_Recibido = event.detail.texto;
    }        

    render() {
        return html`
            <componente-hijo @texto-cambiado=${this._mostrarTexto}></componente-hijo>
            <h1>${this.mensaje_Recibido && this.mensaje_Recibido.trim() ? this.mensaje_Recibido : 'Mensaje inicial del padre'}</h1>
        `

    }
}
customElements.define("component-padre", Padre);