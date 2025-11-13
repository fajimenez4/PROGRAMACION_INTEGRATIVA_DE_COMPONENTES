class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        // Recuperar el usuario actual de la sesión
        const currentEmail = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        const currentUser = usuarios[currentEmail]?.datos || null;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./public/css/bootstrap.css">
            <div class="card text-center shadow p-3">
                <img src="${currentUser?.photo || './public/img/default.png'}" 
                    alt="Foto" 
                    class="rounded-circle mx-auto" 
                    style="width:100px; height:100px; object-fit:cover;">
                <h5 class="mt-3">${currentUser?.name || 'Invitado'}</h5>
                <p class="text-muted">${currentUser?.email || ''}</p>
                <button class="btn btn-outline-danger btn-sm mt-2" id="logout">Cerrar sesión</button>
            </div>
            `;

        this.shadowRoot.querySelector("#logout").addEventListener("click", () => {
            localStorage.removeItem("usuarioActual");
            window.location.href = "Index.html";
        });
    }
}

customElements.define("user-profile", UserProfile);
