class BotonOperacion extends HTMLElement {
    constructor() {
        super();

        const operacion = this.getAttribute("value");
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <link rel="stylesheet" href="public/vendor/bootstrap/css/bootstrap.min.css">
            <button data-value="${operacion}" class="btn btn-light w-100">${operacion}</button>
        `;
        const boton = shadow.querySelector("button");
        boton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("operacion-click", {
                bubbles: true,
                composed: true,
                detail: { value: operacion }
            }));
        });
    }
}
customElements.define("boton-operacion", BotonOperacion);
