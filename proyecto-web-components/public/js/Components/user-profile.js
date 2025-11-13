// Crea un elemento <template> que se usa para clonar el HTML del componente
const template = document.createElement("template");

// Inserta el HTML y referencia a CSS dentro del template.
template.innerHTML = `
    <!-- Estilo bootstrap local (relativo al archivo) -->
    <link rel="stylesheet" href="./public/css/bootstrap.css">

    <!-- Estructura de la tarjeta de perfil -->
    <div class="card text-center shadow p-3">
        <!-- Foto del usuario: se rellena dinámicamente -->
        <img id="foto" src="" 
            class="rounded-circle mx-auto"
            style="width:100px; height:100px; object-fit:cover;">
        <!-- Nombre del usuario: se rellena dinámicamente -->
        <h5 id="nombre" class="mt-3"></h5>
        <!-- Correo del usuario: se rellena dinámicamente -->
        <p id="correo" class="text-muted"></p>
        <!-- Botón para cerrar sesión -->
        <button id="logout" class="btn btn-outline-danger btn-sm mt-2">
            Cerrar sesión
        </button>
    </div>
    `;

// Define y exporta la clase UserProfile
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

// Registra el nuevo elemento personalizado con el tag <user-profile>
customElements.define("user-profile", UserProfile);
