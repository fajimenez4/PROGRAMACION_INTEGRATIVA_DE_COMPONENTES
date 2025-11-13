class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        const user = usuarios[usuarioActual];

        if (!user || user.tareas.length === 0) {
            this.shadowRoot.innerHTML = `<p class="text-muted">No hay tareas para mostrar progreso.</p>`;
            return;
        }

        const completadas = user.tareas.filter(t => t.completed).length;
        const total = user.tareas.length;
        const porcentaje = Math.round((completadas / total) * 100);

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./public/css/bootstrap.css">
            <div class="mt-3">
                <p>Progreso: ${completadas}/${total} tareas completadas (${porcentaje}%)</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${porcentaje}%;" 
                        aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            `;
    }
}

customElements.define("progress-bar", ProgressBar);
