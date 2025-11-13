const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<h5 class="mt-3">Tareas</h5>
<ul id="lista" class="list-group"></ul>
`;

export class TaskList extends HTMLElement {
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

        if (!usuarioActual || !usuarios[usuarioActual]) {
            this.shadowRoot.querySelector("#lista").innerHTML =
                `<li class="list-group-item text-muted">No hay usuario activo</li>`;
            return;
        }

        const tareas = usuarios[usuarioActual].tareas;
        const lista = this.shadowRoot.querySelector("#lista");

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

        lista.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const action = e.target.dataset.action;
                const index = e.target.dataset.index;

                if (action === "done")
                    tareas[index].completed = !tareas[index].completed;

                if (action === "delete")
                    tareas.splice(index, 1);

                usuarios[usuarioActual].tareas = tareas;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                document.dispatchEvent(new CustomEvent("task-updated"));
                this.render();
            });
        });
    }
}

customElements.define("task-list", TaskList);
