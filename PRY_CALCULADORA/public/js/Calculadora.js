class Calculadora extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
        <link rel="stylesheet" href="public/vendor/bootstrap/css/bootstrap.min.css">
        
        <div class="card bg-dark text-white">
            <div class="card-header">
                <input type="text" 
                    class="form-control" 
                    placeholder="Ingresar número" 
                    id="txt_numero" 
                    disabled>
            </div>

            <div class="card-body bg-dark">
                <div class="row mb-2">
                    <div class="col-sm-3"><button data-value="1" class="btn btn-warning w-100">1</button></div>
                    <div class="col-sm-3"><button data-value="2" class="btn btn-warning w-100">2</button></div>
                    <div class="col-sm-3"><button data-value="3" class="btn btn-warning w-100">3</button></div>
                    <div class="col-sm-3"><button data-value="+" class="btn btn-light w-100">+</button></div>
                </div>

                <div class="row mb-2">
                    <div class="col-sm-3"><button data-value="4" class="btn btn-warning w-100">4</button></div>
                    <div class="col-sm-3"><button data-value="5" class="btn btn-warning w-100">5</button></div>
                    <div class="col-sm-3"><button data-value="6" class="btn btn-warning w-100">6</button></div>
                    <div class="col-sm-3"><button data-value="-" class="btn btn-light w-100">-</button></div>
                </div>

                <div class="row mb-2">
                    <div class="col-sm-3"><button data-value="7" class="btn btn-warning w-100">7</button></div>
                    <div class="col-sm-3"><button data-value="8" class="btn btn-warning w-100">8</button></div>
                    <div class="col-sm-3"><button data-value="9" class="btn btn-warning w-100">9</button></div>
                    <div class="col-sm-3"><button data-value="*" class="btn btn-light w-100">*</button></div>
                </div>

                <div class="row">
                    <div class="col-sm-3"><button data-value="0" class="btn btn-warning w-100">0</button></div>
                    <div class="col-sm-6"><button data-value="calcular" class="btn btn-info w-100">=</button></div>
                    <div class="col-sm-3"><boton-operacion value="/"></boton-operacion></div>
                </div>
            </div>
        </div>
        `;

        const display = shadow.getElementById("txt_numero");
        const buttons = shadow.querySelectorAll("button");
        let expresion = "";

        // Escuchar botones dentro de la calculadora
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const val = btn.getAttribute("data-value");

                if (val === "calcular") {
                    try {
                        expresion = String(Function(`return ${expresion}`)());
                    } catch (error) {
                        expresion = "Error";
                    }
                } else {
                    expresion += val;
                }
                display.value = expresion;
            });
        });

        // Escuchar eventos del componente hijo
        shadow.addEventListener("operacion-click", (e) => {
            expresion += e.detail.value;
            display.value = expresion;
        });
    }
}

customElements.define("calculadora-basica", Calculadora);
