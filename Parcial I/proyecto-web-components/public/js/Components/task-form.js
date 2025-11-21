// Crear el template que contendrá el HTML del componente
const template = document.createElement("template");

// HTML del componente (se inserta en el shadow DOM)
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

// Definición del componente web personalizado
export class TaskForm extends HTMLElement {
    constructor() {
        super();
        // Crear shadow root y clonar el template dentro
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Cuando el componente se agrega al DOM
    connectedCallback() {
        // Seleccionar el formulario dentro del shadow DOM
        const form = this.shadowRoot.querySelector("#taskForm");

        // Escuchar el envío del formulario
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evitar recarga de la página

            // Obtener valores de los campos
            const title = this.shadowRoot.querySelector("#title").value.trim();
            const description = this.shadowRoot.querySelector("#description").value.trim();

            // Obtener usuario actual y lista de usuarios desde localStorage
            const usuarioActual = localStorage.getItem("usuarioActual");
            let usuarios = JSON.parse(localStorage.getItem("usuarios"));

            // Crear objeto de la nueva tarea
            const nuevaTarea = {
                id: Date.now(),
                title,
                description,
                completed: false,
                fecha: new Date().toLocaleString()
            };

            // Agregar la nueva tarea al usuario correspondiente
            usuarios[usuarioActual].tareas.push(nuevaTarea);
            // Guardar cambios en localStorage
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Limpiar el formulario
            form.reset();

            // Notificar a otros componentes que las tareas se actualizaron
            document.dispatchEvent(new CustomEvent("task-updated"));
        });
    }
}

// Registrar el custom element en el navegador
customElements.define("task-form", TaskForm);
