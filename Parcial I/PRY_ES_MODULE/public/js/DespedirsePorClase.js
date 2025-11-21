export class DespedirsePorClase extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow ({mode: 'open'});
        const dia = this.getAttribute('dia');
        const hora = this.getAttribute('hora');
        shadow.innerHTML =
        `
            <h1>Adios nos vemos el dia ${dia} a las ${hora} </h1>


        `
    }
}

customElements.define( 'despedir-clase', DespedirsePorClase );