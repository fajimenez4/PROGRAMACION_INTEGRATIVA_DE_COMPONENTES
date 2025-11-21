import {LitElement, html, css} from "lit";

export class HolaMundo extends LitElement {
    render(){
        return html `
            <h1> HOLA MUNDO DESDE LIT</h1>

        `;
    }
}
customElements.define('hola-mundo', HolaMundo);