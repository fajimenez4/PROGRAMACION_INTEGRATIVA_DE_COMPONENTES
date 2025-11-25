class SumaDosNumeros extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const operacion = this.getAttribute('operacion');

        shadow.innerHTML = `
        <div>
            <label for="">Ingrese el numero 1</label>
            <input type="number" id="num1">
            <label for="">Ingrese el numero 2 </label>
            <input type="number" id="num2">
            <button id="btnOperacion">${operacion}</button>
            <h3 id="resultado">RESULTADO: </h3>
        </div>
        `;

        const num1 = shadow.getElementById('num1');
        const num2 = shadow.getElementById('num2');
        const resultado = shadow.getElementById('resultado');


        switch (operacion) {
            case 'SUMAR': {
                const btnSumar = shadow.getElementById('btnOperacion');
                btnSumar.addEventListener('click', () => {
                    const suma = parseFloat(num1.value) + parseFloat(num2.value);
                    resultado.textContent = `RESULTADO: ${suma}`;
                });
            }
                break;
            case 'RESTAR': {
                const btnRestar = shadow.getElementById('btnOperacion');
                btnRestar.addEventListener('click', () => {
                    const resta = parseFloat(num1.value) - parseFloat(num2.value);
                    resultado.textContent = `RESULTADO: ${resta}`;
                });
            }
                break;
            case "MULTIPLICAR": {
                const btnMultiplicar = shadow.getElementById('btnOperacion');
                btnMultiplicar.addEventListener('click', () => {
                    const multiplicacion = parseFloat(num1.value) * parseFloat(num2.value);
                    resultado.textContent = `RESULTADO: ${multiplicacion}`;
                });
            }
                break;
            case "DIVIDIR": {
                const btnDividir = shadow.getElementById('btnOperacion');
                btnDividir.addEventListener('click', () => {
                    const division = parseFloat(num1.value) / parseFloat(num2.value);
                    resultado.textContent = `RESULTADO: ${division}`;
                });
            }
                break;
            default: {
                resultado.textContent = `RESULTADO: Operacion no soportada`; 
            }
                break;
        }


    }
}



customElements.define('suma-dos-numeros', SumaDosNumeros);