export class BotonNumero extends HTMLElement {
    constructor() {
        super();
        const valor = this.getAttribute("value");
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <link rel="stylesheet" href="public/vendor/bootstrap/css/bootstrap.min.css">
            <button data-value="${valor}" class="btn btn-warning w-100">${valor}</button>
        `;

        const boton = shadow.querySelector("button");
        boton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("numero-click", {
                bubbles: true,
                composed: true,
                detail: { value: valor }
            }));
        });
    }
}

customElements.define("boton-numero", BotonNumero);