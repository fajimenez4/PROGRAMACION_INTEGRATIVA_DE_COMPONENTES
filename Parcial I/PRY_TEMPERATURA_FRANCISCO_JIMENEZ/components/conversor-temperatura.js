export class ConversorTemperatura extends HTMLElement {
    constructor() {
        super();

        const formato = this.getAttribute("formato") || "C-F";
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <link rel="stylesheet" href="public/vendor/bootstrap5/css/bootstrap.min.css">

            <div class="p-3 border rounded bg-light">
                <input type="number" id="valor" class="form-control mb-2" placeholder="Ingrese valor">

                <button id="btnConvertir" class="btn btn-primary w-100 mb-2">
                    Convertir
                </button>

                <button id="btnFormato" data-formato="${formato}" class="btn btn-secondary w-100">
                    ${formato}
                </button>

                <div id="resultado" class="alert alert-info mt-3 d-none"></div>
            </div>
        `;

        const valorInput = shadow.querySelector("#valor");
        const btnConvertir = shadow.querySelector("#btnConvertir");
        const btnFormato = shadow.querySelector("#btnFormato");
        const resultadoBox = shadow.querySelector("#resultado");

        btnConvertir.addEventListener("click", () => {
            const valor = Number(valorInput.value);
            if (isNaN(valor)) {
                resultadoBox.textContent = "Ingrese un número válido";
                resultadoBox.classList.remove("d-none");
                return;
            }

            let resultado;

            if (formato === "C-F") {
                resultado = (valor * 9 / 5) + 32;
                resultadoBox.textContent = `${valor} °C = ${resultado.toFixed(2)} °F`;
            } else {
                resultado = (valor - 32) * 5 / 9;
                resultadoBox.textContent = `${valor} °F = ${resultado.toFixed(2)} °C`;
            }

            resultadoBox.classList.remove("d-none");
        });

        btnFormato.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("formato-click", {
                bubbles: true,
                composed: true,
                detail: { formato }
            }));
        });
    }
}

customElements.define("conversor-temperatura", ConversorTemperatura);
