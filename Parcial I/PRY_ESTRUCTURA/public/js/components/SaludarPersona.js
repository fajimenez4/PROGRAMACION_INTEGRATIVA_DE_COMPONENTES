// 1. Crear una clase
class SaludarPersona extends HTMLElement{
    connectedCallback(){
        let nombre = this.getAttribute('nombres') || "sin nombres";
        let apellido = this.getAttribute('apellidos') || "sin apellidos";
        let edad = this.getAttribute('edad') || "desconocida";
        let sexo = this.getAttribute('sexo') || "no definido"

        /* if(edad > 18){
            this.innerHTML = `
            <p> Hola mi nombre es ${nombre} ${apellido} y tengo ${edad} años, soy mayor de edad y mi sexo es ${sexo}</p>
            `;
        }else{
            this.innerHTML = `
            <p> Hola mi nombre es ${nombre} ${apellido} y tengo ${edad} años, soy menor de edad y mi sexo es ${sexo}</p>
            `;
        } */

        let r_edad = edad >= 18 ? 'SOY MAYOR DE EDAD' : 'SOY MENOR DE EDAD';

        this.innerHTML = `<p> Hola mi nombre es ${nombre} ${apellido} y tengo ${edad} años, ${r_edad} y mi sexo es ${sexo}</p>`;
    }
}

// 2. Definir elemento
customElements.define('saludar-persona', SaludarPersona)