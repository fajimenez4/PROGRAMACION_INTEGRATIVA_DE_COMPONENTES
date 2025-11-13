const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div id="contenedor" class="mt-4"></div>
`;

export class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        document.addEventListener("task-updated", () => this.render());
    }

    render() {
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        const cont = this.shadowRoot.querySelector("#contenedor");

        if (!usuarioActual || !usuarios[usuarioActual]) {
            cont.innerHTML = `<p class="text-muted">No hay tareas</p>`;
            return;
        }

        const tareas = usuarios[usuarioActual].tareas;

        if (tareas.length === 0) {
            cont.innerHTML = `<p class="text-muted">No hay tareas</p>`;
            return;
        }

        const completadas = tareas.filter(t => t.completed).length;
        const total = tareas.length;
        const porcentaje = Math.round(completadas / total * 100);

        cont.innerHTML = `
            <p>Progreso: ${completadas}/${total} (${porcentaje}%)</p>
            <div class="progress">
                <div class="progress-bar" style="width:${porcentaje}%"></div>
            </div>
        `;
    }
}

customElements.define("progress-bar", ProgressBar);
