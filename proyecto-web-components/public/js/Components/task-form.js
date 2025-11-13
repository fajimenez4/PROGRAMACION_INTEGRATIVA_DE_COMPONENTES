class TaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./public/css/bootstrap.css">
        <div class="card shadow p-4">
            <h5 class="mb-3">Nueva Tarea</h5>
            <form id="taskForm">
            <div class="mb-3">
                <input type="text" id="taskInput" class="form-control" placeholder="Descripción de la tarea" required>
            </div>
            <button type="submit" class="btn btn-success w-100">Agregar</button>
            </form>
        </div>
    `;

        const form = this.shadowRoot.querySelector("#taskForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = this.shadowRoot.querySelector("#title").value;
            const description = this.shadowRoot.querySelector("#description").value;

            const usuarioActual = localStorage.getItem("usuarioActual");
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

            if (!usuarioActual || !usuarios[usuarioActual]) {
                alert("Error: No hay un usuario activo.");
                return;
            }

            const nuevaTarea = {
                id: Date.now(),
                title,
                description,
                completed: false,
                fecha: new Date().toLocaleString()
            };

            usuarios[usuarioActual].tareas.push(nuevaTarea);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            this.shadowRoot.querySelector("#taskForm").reset();
            document.querySelector("task-list").render(); // refresca lista
        });
    }
}

customElements.define("task-form", TaskForm);
