class AlertaSimple extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <link rel="stylesheet" href="/public/css/alerta_simple.css">
            <div class="alerta_simple">
                <h1>   
                    ALERTA SIMPLE!
                </h1>
                <p>
                    Este es un componente web con SHADOW DOM
                </p>
            </div>
        `;
    }
}

customElements.define('alerta-simple', AlertaSimple);