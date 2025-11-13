class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        document.addEventListener("task-updated", () => this.render());
    }

    render() {
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (!usuarioActual || !usuarios[usuarioActual]) {
            this.shadowRoot.innerHTML = `<p class="text-muted">No hay usuario logueado.</p>`;
            return;
        }

        const tareas = usuarios[usuarioActual].tareas || [];

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./public/css/bootstrap.css">
        <h5>Tareas</h5>
        <ul class="list-group">
            ${tareas.map((task, i) => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong class="${task.completed ? 'text-decoration-line-through text-muted' : ''}">
                            ${task.title}
                        </strong><br>
                        <small>${task.description}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-success me-2" data-index="${i}" data-action="done">✔</button>
                        <button class="btn btn-sm btn-danger" data-index="${i}" data-action="delete">✖</button>
                    </div>
                </li>
            `).join('')}
        </ul>
        `;

        this.shadowRoot.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const action = e.target.dataset.action;

                if (action === "done") tareas[index].completed = !tareas[index].completed;
                if (action === "delete") tareas.splice(index, 1);

                usuarios[usuarioActual].tareas = tareas;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                // 🔥 Notificar cambios
                document.dispatchEvent(new CustomEvent("task-updated"));

                this.render();
            });
        });
    }
}

customElements.define("task-list", TaskList);
