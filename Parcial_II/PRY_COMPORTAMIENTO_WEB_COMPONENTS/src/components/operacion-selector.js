import { LitElement, html } from "lit";

export class OperacionSelector extends LitElement {

    static properties = {
        valueFromParent: { type: String }   // operación que viene desde mi-calculadora
    };

    constructor() {
        super();
        this.valueFromParent = "";          // valor inicial del combo
    }

    seleccionar(e) {
        this.dispatchEvent(new CustomEvent("operacion-seleccionada", {
            detail: { operacion: e.target.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
        <select class="form-select my-2"
                @change="${this.seleccionar}"
                .value="${this.valueFromParent}">
            <option value="">Seleccione operación</option>
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
        </select>
        `;
    }
}

customElements.define("operacion-selector", OperacionSelector);
