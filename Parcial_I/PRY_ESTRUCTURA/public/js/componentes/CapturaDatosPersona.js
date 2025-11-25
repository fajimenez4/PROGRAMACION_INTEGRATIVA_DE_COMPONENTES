class CapturaDatosPersona extends HTMLElement {
    connectedCallback() {
        this.innerHTML=`
        <fieldset>
        <input type="text" id="txt_apellidos" placeholder="INGRESE SUS APELLIDOS">
        <input type="text" id="txt_nombres" placeholder="INGRESE SUS NOMBRES">
        <input type="text" id="txt_edad" placeholder="INGRESE SU EDAD">
        <button type="button" id="btn_enviar">ENVIAR</button>
        <p>Hola soy Francisco Jimenez tengo 22 anios</p>
        </fieldset>
    `

    }
}

let nombre = this.getSelector('#txt_nombres');
let apellido =this.getSelector('#txt_apellidos');
let edad = this.getSelector('#txt_edad');
let btn_enviar = this.getSelector('#btn_enviar');
let resultado = this.getSelector('#txt_resultado');

btn_enviar.addEventListener('click', function(){
    resultado.innerHTML = `
        <p>Hola soy ${nombre.value} ${apellido.value} tengo ${edad.value} anios</p>
    `;
}
)

customElements.define('captura-datos', CapturaDatosPersona);