import { LitElement, html } from "lit";
import "./BtnNumber.js";
import "./BtnAction.js";

export class BasicCalculator extends LitElement {

    constructor() {
        super();
        this.display = "";
    }

    static properties = {
        display: { type: String }
    };

    render() {
        return html`
            <!-- Bootstrap dentro del shadow -->
            <link rel="stylesheet" href="./src/bootstrap5/css/bootstrap.min.css">

            <div class="card bg-dark text-white p-3">
                <!-- Display -->
                <input class="form-control mb-3 text-end fw-bold" 
                    value="${this.display}" disabled>

                <!-- Fila AC / CE -->
                <div class="row mb-2">
                    <div class="col-6">
                        <button class="btn btn-danger w-100" @click=${this._clearAll}>AC</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-secondary w-100" @click=${this._clearLast}>CE</button>
                    </div>
                </div>

                <!-- Fila 1 -->
                <div class="row mb-2">
                    <div class="col-3"><btn-number value="7"></btn-number></div>
                    <div class="col-3"><btn-number value="8"></btn-number></div>
                    <div class="col-3"><btn-number value="9"></btn-number></div>
                    <div class="col-3"><btn-action value="/"></btn-action></div>
                </div>

                <!-- Fila 2 -->
                <div class="row mb-2">
                    <div class="col-3"><btn-number value="4"></btn-number></div>
                    <div class="col-3"><btn-number value="5"></btn-number></div>
                    <div class="col-3"><btn-number value="6"></btn-number></div>
                    <div class="col-3"><btn-action value="*"></btn-action></div>
                </div>

                <!-- Fila 3 -->
                <div class="row mb-2">
                    <div class="col-3"><btn-number value="1"></btn-number></div>
                    <div class="col-3"><btn-number value="2"></btn-number></div>
                    <div class="col-3"><btn-number value="3"></btn-number></div>
                    <div class="col-3"><btn-action value="-"></btn-action></div>
                </div>

                <!-- Fila 4 -->
                <div class="row mb-2">
                    <div class="col-3"><btn-number value="0"></btn-number></div>
                    <div class="col-3"><btn-number value="."></btn-number></div>
                    <div class="col-3">
                        <button class="btn btn-info w-100" @click=${this._calculate}>=</button>
                    </div>
                    <div class="col-3"><btn-action value="+"></btn-action></div>
                </div>
            </div>
        `;
    }

    /* -----------------------------
        METODOS DE CONTROL
    ------------------------------*/

    // AC → Borrar todo
    _clearAll() {
        this.display = "";
    }

    // CE → Borrar último caracter
    _clearLast() {
        this.display = this.display.slice(0, -1);
    }

    // Manejo de números
    _onNumber(e) {
        const v = e.detail.value;

        // evitar doble punto decimal en el mismo número
        if (v === ".") {
            const partes = this.display.split(/[\+\-\*\/]/);
            if (partes[partes.length - 1].includes(".")) return;
        }

        this.display += v;
    }

    // Manejo de operadores
    _onAction(e) {
        const op = e.detail.op;

        if (this.display === "") return;

        // Evitar operadores duplicados
        if (/[\+\-\*\/]$/.test(this.display)) return;

        this.display += op;
    }

    // Calcular expresión
    _calculate() {
        try {
            if (/[\+\-\*\/]$/.test(this.display)) return;

            // Evalúo de forma segura
            const result = Function(`return ${this.display}`)();
            this.display = String(result);

        } catch (err) {
            this.display = "Error";
        }
    }

    // Conectar eventos de los botones
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener("number-click", (e) => this._onNumber(e));
        this.addEventListener("action-click", (e) => this._onAction(e));
    }
}

customElements.define("basic-calculator", BasicCalculator);
