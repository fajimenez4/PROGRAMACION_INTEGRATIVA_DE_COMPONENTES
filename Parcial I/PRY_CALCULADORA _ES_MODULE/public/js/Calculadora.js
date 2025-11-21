export class CalculadoraBasica extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <link rel="stylesheet" href="public/vendor/bootstrap/css/bootstrap.min.css">
            <div class="card bg-dark text-white">
                <div class="card-header">
                    <input type="text" class="form-control" placeholder="Ingresar número" id="txt_numero" disabled>
                </div>
                <div class="card-body bg-dark">
                    <div class="row mb-2">
                        <div class="col-sm-3"><boton-numero value="1"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="2"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="3"></boton-numero></div>
                        <div class="col-sm-3"><boton-operacion value="+"></boton-operacion></div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm-3"><boton-numero value="4"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="5"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="6"></boton-numero></div>
                        <div class="col-sm-3"><boton-operacion value="-"></boton-operacion></div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm-3"><boton-numero value="7"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="8"></boton-numero></div>
                        <div class="col-sm-3"><boton-numero value="9"></boton-numero></div>
                        <div class="col-sm-3"><boton-operacion value="*"></boton-operacion></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3"><boton-numero value="0"></boton-numero></div>
                        <div class="col-sm-6"><button data-value="calcular" class="btn btn-info w-100">=</button></div>
                        <div class="col-sm-3"><boton-operacion value="/"></boton-operacion></div>
                    </div>
                </div>
            </div>
        `;

        const display = shadow.getElementById("txt_numero");
        let expresion = "";
        shadow.addEventListener("numero-click", (e) => {
            expresion += e.detail.value;
            display.value = expresion;
        });
        shadow.addEventListener("operacion-click", (e) => {
            expresion += e.detail.value;
            display.value = expresion;
        });
        shadow.querySelector('[data-value="calcular"]').addEventListener("click", () => {
            try {
                expresion = String(Function(`return ${expresion}`)());
            } catch (error) {
                expresion = "Error";
            }
            display.value = expresion;
        });
    }
}

customElements.define("calculadora-basica", CalculadoraBasica);