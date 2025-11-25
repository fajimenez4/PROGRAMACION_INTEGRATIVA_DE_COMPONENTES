import { LitElement, html } from "lit";

export class BtnNumber extends LitElement {

    render() {
        const val = this.getAttribute("value");

        return html`
            <!-- Importamos Bootstrap dentro del Shadow DOM -->
            <link rel="stylesheet" href="./src/bootstrap5/css/bootstrap.min.css">

            <button class="btn btn-warning w-100"
                @click=${() => this._emitClick(val)}>
                ${val}
            </button>
        `;
    }

    _emitClick(value) {
        this.dispatchEvent(new CustomEvent("number-click", {
            detail: { value },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define("btn-number", BtnNumber);
