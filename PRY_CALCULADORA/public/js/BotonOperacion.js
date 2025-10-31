class BotonOperacion extends HTMLElement {
    constructor() {
        super();

        const operacion = this.getAttribute("value");
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <button data-value="${operacion}" class="btn btn-light w-100">${operacion}</button>
        `;
    }
}
customElements.define("boton-operacion", BotonOperacion);
