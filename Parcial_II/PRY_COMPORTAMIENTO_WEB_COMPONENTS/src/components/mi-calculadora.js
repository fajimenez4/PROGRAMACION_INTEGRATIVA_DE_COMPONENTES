import { LitElement, html } from "lit";
import "./entrada-numero.js";
import "./operacion-selector.js";
import "./resultado-label.js";
import "./boton-calcular.js";

export class MiCalculadora extends LitElement {

    static properties = {
        valores: { type: Object },
        operacion: { type: String },
        resultado: { type: String }
    };

    constructor() {
        super();
        this.valores = {};     // almacena num1, num2, num3...
        this.operacion = "";
        this.resultado = "No es posible la operación: falta información.";

        // auto-modo
        this.autoTimer = null;
        this.autoIndex = 0;
        this.autoOps = ["sumar", "restar", "multiplicar", "dividir"];
    }

    connectedCallback() {
        super.connectedCallback();

        // Manejar inputs dinámicos
        this.addEventListener("cambio-numero", (e) => {
            const pos = e.detail.posicion;
            const val = e.detail.valor;

            this.valores[pos] = val;
            this.verificarAutomatico();
        });

        // Selector de operación
        this.addEventListener("operacion-seleccionada", (e) => {
            this.operacion = e.detail.operacion;
            this.calcular();
        });

        // Botón calcular
        this.addEventListener("accion-calcular", () => {
            this.calcular();
        });
    }

    // Sincroniza visualmente el combo box
    actualizarSelector() {
        const selector = this.renderRoot.querySelector("operacion-selector");
        if (selector) {
            selector.valueFromParent = this.operacion;
        }
    }

    toggleAuto(e) {
        const activo = e.target.checked;

        if (activo) {
            this.iniciarAuto();
        } else {
            this.detenerAuto();
        }
    }

    iniciarAuto() {
        if (this.autoTimer) clearInterval(this.autoTimer);

        this.autoTimer = setInterval(() => {
            // cambiar a la siguiente operación automáticamente
            this.operacion = this.autoOps[this.autoIndex];
            this.autoIndex = (this.autoIndex + 1) % this.autoOps.length;

            // actualizar visualmente el combo
            this.actualizarSelector();

            const nums = Object.values(this.valores).filter(v => v !== null);
            if (nums.length >= 2) {
                this.calcular();
            }

            this.requestUpdate();
        }, 3000);
    }

    detenerAuto() {
        if (this.autoTimer) clearInterval(this.autoTimer);
        this.autoTimer = null;
        this.autoIndex = 0;
    }

    verificarAutomatico() {
        const nums = Object.values(this.valores).filter(v => v !== null);

        if (nums.length >= 2 && this.operacion !== "") {
            this.calcular();
        }
    }

    calcular() {
        const claves = Object.keys(this.valores).sort();
        const nums = claves
            .map(k => this.valores[k])
            .filter(v => v !== null);

        if (nums.length < 2) {
            this.resultado = "No es posible la operación: falta información.";
            return;
        }

        const num1 = nums[0];
        const num2 = nums[1];
        let r;

        switch (this.operacion) {

            case "sumar":
                r = num1 + num2;
                break;

            case "restar":
                r = num1 - num2;
                break;

            case "multiplicar":
                r = num1 * num2;
                break;

            case "dividir":
                if (num2 === 0) {
                    this.resultado = "Error: división por cero.";
                    return;
                }
                r = num1 / num2;
                break;

            default:
                this.resultado = "Seleccione una operación.";
                return;
        }

        this.resultado = `Resultado: ${r}`;
    }

    render() {
        return html`
        <div class="container p-4 border rounded shadow bg-white">

            <h2 class="text-center mb-4 text-dark">Mini Calculadora Modular</h2>

            <div class="form-check mb-4">
            <input class="form-check-input" 
                    type="checkbox" 
                    id="autoMode"
                    @change="${this.toggleAuto}">
            <label class="form-check-label text-dark" for="autoMode">
                Activar operaciones automáticas cada 3 segundos
            </label>
            </div>

            <entrada-numero posicion="1"></entrada-numero>
            <entrada-numero posicion="2"></entrada-numero>

            <operacion-selector></operacion-selector>

            <boton-calcular></boton-calcular>

            <resultado-label resultado="${this.resultado}"></resultado-label>

        </div>
        `;
    }
}

customElements.define("mi-calculadora", MiCalculadora);
