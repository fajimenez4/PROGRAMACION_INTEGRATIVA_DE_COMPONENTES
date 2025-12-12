import { LitElement, html, css } from "lit";

export class EntradaNumero extends LitElement {

    static properties = {
        posicion: { type: String }
    };

    static styles = css`
    input {
      width: 100%;
    }
  `;

    constructor() {
        super();
        this.posicion = "";
    }

    manejarInput(e) {
        const valor = e.target.value;

        this.dispatchEvent(new CustomEvent("cambio-numero", {
            detail: {
                posicion: this.posicion,
                valor: valor === "" ? null : Number(valor)
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <input 
                type="number"
                class="form-control my-2"
                placeholder="Ingrese número ${this.posicion}"
                @keyup="${this.manejarInput}"
            />
    `;
    }
}

customElements.define("entrada-numero", EntradaNumero);
