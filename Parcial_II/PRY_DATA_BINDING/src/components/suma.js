import { LitElement, html } from "lit";

export class Suma extends LitElement {
    static properties = {
        numero1: { type: Number },
        numero2: { type: Number },
    };

    constructor() {
        super();
        this.numero1 = 0;
        this.numero2 = 0;
    }

    actualizarNumero(e, numero) {
        this[numero] = Number(e.target.value);
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (isNaN(this.numero1)) this.numero1 = 0;
        if (isNaN(this.numero2)) this.numero2 = 0;
    }

    render() {
        const resultado = this.numero1 + this.numero2;

        return html`
            <input
                type="text"
                @input=${e => this.actualizarNumero(e, "numero1")}
                .value=${this.numero1}
            >
            +
            <input
                type="text"
                @input=${e => this.actualizarNumero(e, "numero2")}
                .value=${this.numero2}
            >
            =
            <span>${resultado}</span>
        `;
    }
}

customElements.define("suma-numeros", Suma);
