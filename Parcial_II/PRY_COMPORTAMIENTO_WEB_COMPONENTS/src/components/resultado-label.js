import { LitElement, html } from "lit";

export class ResultadoLabel extends LitElement {

    static properties = {
        resultado: { type: String }
    };

    render() {
        return html`
        <div class="alert alert-secondary mt-3">
            ${this.resultado}
        </div>
    `;
    }
}

customElements.define("resultado-label", ResultadoLabel);
