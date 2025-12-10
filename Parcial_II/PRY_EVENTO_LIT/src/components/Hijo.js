import { LitElement, html, unsafeCSS } from "lit";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css?inline";
import "./Padre"

export class Hijo extends LitElement {

    static styles = [
        unsafeCSS(bootstrap)
    ];

    _enviarTexto(event) {
        this.dispatchEvent(new CustomEvent("texto-cambiado", {
            detail: { texto: event.target.value },
            bubbles: true,
            composed: true
        }));
    }


    render() {
        {
            return html`
            <input @input=${this._enviarTexto} 
            class="form-control" 
            type = "text"  
            placeholder="Escriba algo"/>
        `;
        }
    }
}
customElements.define("componente-hijo", Hijo);