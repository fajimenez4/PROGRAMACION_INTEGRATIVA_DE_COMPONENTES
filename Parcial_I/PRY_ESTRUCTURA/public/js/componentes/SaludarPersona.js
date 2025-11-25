class SaludarPersona extends HTMLElement{
    //metodo connected callback
    connectedCallback(){
        
        //captura parametros
        let nombre = this.getAttribute('nombre');
        let apellido = this.getAttribute('apellido');
        let edad = this.getAttribute('edad');

        //let r_edad = edad > 18 ? 'Es mayor de edad': 'Es menor de edad';
        let r_edad = '';
        if(edad > 18){
            r_edad = 'Es mayor de edad';
        }else{
            r_edad = 'Es menor de edad';
        }

        this.innerHTML =`
            <p> Hola me llamo ${nombre} ${apellido} y tengo ${edad} años. ${r_edad} </p>    

        `;
    }
}