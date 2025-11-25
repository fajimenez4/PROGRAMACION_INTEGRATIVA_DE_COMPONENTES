import { LitElement, html } from "lit";

export class BtnAction extends LitElement {

    render() {
        const op = this.getAttribute("value");

        return html`
            <link rel="stylesheet" href="./src/bootstrap5/css/bootstrap.min.css">

            <button class="btn btn-light w-100"
                @click=${() => this._emitClick(op)}>
                ${op}
            </button>
        `;
    }

    _emitClick(op) {
        this.dispatchEvent(new CustomEvent("action-click", {
            detail: { op },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define("btn-action", BtnAction);
