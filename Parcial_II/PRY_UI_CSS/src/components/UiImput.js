import { LitElement, html, css } from "lit";

export class UiImput extends LitElement {
    static properties = {
        nombre: { type: String },
        color: { type: String },
        fondo: { type: String }
    };

    constructor() {
        super();
        this.nombre = "MI BOTON";
        this.color = "black";
        this.fondo = "red";
    }

    static styles = css`
        button{
            background-color: var(--btn-fondo);
            color: var(--btn-color);
        }
    `;

    _cambiarTexto(e) {
        this.nombre = e.target.value;
    }

    _cambiarFondo(e) {
        this.fondo = e.target.value || "red";
    }

    render() {
        return html`
            <input 
                type="text" 
                placeholder="Texto del botón"
                @input=${this._cambiarTexto}
            />

            <input 
                type="text" 
                placeholder="Color de fondo (red, blue, #ff0000...)"
                @input=${this._cambiarFondo}
            />

            <button
                style="--btn-fondo: ${this.fondo}; --btn-color: ${this.color}"
            >
                ${this.nombre}
            </button>
        `;
    }
}

customElements.define("ui-imput", UiImput);
