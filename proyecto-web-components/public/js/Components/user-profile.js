const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div class="card text-center shadow p-3">
    <img id="foto" src="" 
        class="rounded-circle mx-auto"
        style="width:100px; height:100px; object-fit:cover;">
    <h5 id="nombre" class="mt-3"></h5>
    <p id="correo" class="text-muted"></p>
    <button id="logout" class="btn btn-outline-danger btn-sm mt-2">
        Cerrar sesión
    </button>
</div>
`;

export class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const usuarioActual = localStorage.getItem("usuarioActual");
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        const user = usuarios[usuarioActual]?.datos;

        this.shadowRoot.querySelector("#foto").src = user?.photo || "./public/img/default.png";
        this.shadowRoot.querySelector("#nombre").textContent = user?.name || "Invitado";
        this.shadowRoot.querySelector("#correo").textContent = user?.email || "";

        this.shadowRoot.querySelector("#logout").addEventListener("click", () => {
            localStorage.removeItem("usuarioActual");
            window.location.href = "Index.html";
        });
    }
}

customElements.define("user-profile", UserProfile);
