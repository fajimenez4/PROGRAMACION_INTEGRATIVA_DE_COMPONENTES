import { LitElement, html, css } from "lit";

export class HolaMundo extends LitElement {
    nombre = "Francisco";
    apellido = "Jimenez";
    nombreCompleto = this.nombre + " " + this.apellido;
    nombrecompleto = `${this.nombre} ${this.apellido}`;
    lastname = `${this.nombre + "" + this.apellido}`;
    render() {
        return html`

            <h1>Hola ${this.nombreCompleto}</h1

        `;
    }
}
customElements.define("hola-mundo", HolaMundo);