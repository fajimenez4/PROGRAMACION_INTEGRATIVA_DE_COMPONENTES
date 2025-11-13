const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div class="card p-3 shadow-sm">
    <h5 class="mb-3">Agregar tarea</h5>

    <form id="taskForm">
        <div class="mb-3">
            <label class="form-label">Título</label>
            <input type="text" id="title" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea id="description" class="form-control" rows="2"></textarea>
        </div>

        <button type="submit" class="btn btn-primary w-100">Agregar</button>
    </form>
</div>
`;

export class TaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("#taskForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = this.shadowRoot.querySelector("#title").value.trim();
            const description = this.shadowRoot.querySelector("#description").value.trim();

            const usuarioActual = localStorage.getItem("usuarioActual");
            let usuarios = JSON.parse(localStorage.getItem("usuarios"));

            const nuevaTarea = {
                id: Date.now(),
                title,
                description,
                completed: false,
                fecha: new Date().toLocaleString()
            };

            usuarios[usuarioActual].tareas.push(nuevaTarea);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            form.reset();

            // Actualizar otros componentes
            document.dispatchEvent(new CustomEvent("task-updated"));
        });
    }
}

customElements.define("task-form", TaskForm);
