import { LitElement, html, css } from 'lit';

export class SaludarConInput extends LitElement {

    static properties = {
        nombre: { type: String }
    }

    constructor() {
        super();
        this.nombre = 'Francisco';
    }

    actualizarNombre(e) {
        this.nombre = e.target.value;
    }

    render() {
        return html`
            <input 
                type="text"
                @input=${this.actualizarNombre}
                .value=${this.nombre}
            >
            <p>Tu nombre es: ${this.nombre}</p>
        `;
    }
}

customElements.define('saludar-con-input', SaludarConInput);
