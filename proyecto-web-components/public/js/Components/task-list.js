// Crea un template para el componente
const template = document.createElement("template");

// HTML/CSS del componente (encapsulado en Shadow DOM)
template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<h5 class="mt-3">Tareas</h5>
<ul id="lista" class="list-group"></ul>
`;

export class TaskList extends HTMLElement {
    constructor() {
        super();
        // Adjunta Shadow DOM en modo abierto
        this.attachShadow({mode:"open"});
        // Clona y añade el template al shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Cuando el elemento se conecta al DOM, renderiza y escucha eventos de actualización
        this.render();
        document.addEventListener("task-updated", () => this.render());
    }

    render() {
        // Obtiene usuario actual y lista de usuarios desde localStorage
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        // Si no hay usuario activo, muestra mensaje y termina
        if (!usuarioActual || !usuarios[usuarioActual]) {
            this.shadowRoot.querySelector("#lista").innerHTML =
                `<li class="list-group-item text-muted">No hay usuario activo</li>`;
            return;
        }

        // Obtiene las tareas del usuario actual y el contenedor de la lista
        const tareas = usuarios[usuarioActual].tareas;
        const lista = this.shadowRoot.querySelector("#lista");

        // Genera el HTML de la lista de tareas
        lista.innerHTML = tareas.map((task, i) => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong class="${task.completed ? 'text-decoration-line-through text-muted' : ''}">
                        ${task.title}
                    </strong><br>
                    <small>${task.description}</small>
                </div>

                <div>
                    <button data-action="done" data-index="${i}" 
                        class="btn btn-sm btn-success me-2">✔</button>

                    <button data-action="delete" data-index="${i}" 
                        class="btn btn-sm btn-danger">✖</button>
                </div>
            </li>
        `).join("");

        // Añade manejadores a los botones de cada tarea
        lista.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const action = e.target.dataset.action;
                const index = e.target.dataset.index;

                // Marca/desmarca como completada
                if (action === "done")
                    tareas[index].completed = !tareas[index].completed;

                // Elimina la tarea
                if (action === "delete")
                    tareas.splice(index, 1);

                // Guarda cambios en localStorage
                usuarios[usuarioActual].tareas = tareas;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                // Notifica y vuelve a renderizar
                document.dispatchEvent(new CustomEvent("task-updated"));
                this.render();
            });
        });
    }
}

// Define el elemento personalizado
customElements.define("task-list", TaskList);
