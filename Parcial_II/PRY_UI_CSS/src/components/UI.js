import { LitElement, html, css } from "lit";

export class UI extends LitElement {
static styles = css`
    button{
        background-color:var(--color-fondo, blue);
        color: var(--color-texto, white);
        padding: 10px;
        border-radius: 5px;
    }
`;

    render(){
        return html`
            <button>Click Me!!</button>
        `;
    }
}
customElements.define("ui-component", UI);
