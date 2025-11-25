// Crear template HTML para el componente
const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div id="contenedor" class="mt-4"></div>
`;

// Definir clase del componente Web Component
export class ProgressBar extends HTMLElement {
    constructor() {
        // Inicializar componente y crear Shadow DOM
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Renderizar cuando se inserta en el DOM y escuchar eventos
        this.render();
        document.addEventListener("task-updated", () => this.render());
    }

    render() {
        // Obtener datos del usuario actual y sus tareas desde localStorage
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        const cont = this.shadowRoot.querySelector("#contenedor");
0
        // Validar que existan datos del usuario
        if (!usuarioActual || !usuarios[usuarioActual]) {
            cont.innerHTML = `<p class="text-muted">No hay tareas</p>`;
            return;
        }

        const tareas = usuarios[usuarioActual].tareas;

        // Mostrar mensaje si no hay tareas
        if (tareas.length === 0) {
            cont.innerHTML = `<p class="text-muted">No hay tareas</p>`;
            return;
        }

        // Calcular porcentaje de tareas completadas
        const completadas = tareas.filter(t => t.completed).length;
        const total = tareas.length;
        const porcentaje = Math.round(completadas / total * 100);

        // Renderizar barra de progreso con Bootstrap
        cont.innerHTML = `
            <p>Progreso: ${completadas}/${total} (${porcentaje}%)</p>
            <div class="progress">
                <div class="progress-bar" style="width:${porcentaje}%"></div>
            </div>
        `;
    }
}

// Registrar componente personalizado
customElements.define("progress-bar", ProgressBar);
