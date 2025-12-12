import { LitElement, html } from "lit";

export class BotonCalcular extends LitElement {

    calcular() {
        this.dispatchEvent(new CustomEvent("accion-calcular", { bubbles: true, composed: true }));
    }

    render() {
        return html`
        <button 
            class="btn btn-primary w-100 my-2"
            @click="${this.calcular}"
            @dblclick="${this.calcular}"
        >
            Calcular
        </button>
    `;
    }
}

customElements.define("boton-calcular", BotonCalcular);
