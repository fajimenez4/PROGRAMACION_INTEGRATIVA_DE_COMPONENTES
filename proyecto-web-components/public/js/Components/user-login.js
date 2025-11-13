const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card shadow p-4">
                <h3 class="text-center mb-3">Iniciar Sesión</h3>

                <form id="loginForm">
                    <div class="mb-3">
                        <label class="form-label">Correo</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" id="password" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mt-3">Ingresar</button>

                    <div class="text-center mt-3">
                        <small>¿No tienes cuenta?</small><br>
                        <a href="Register.html" class="btn btn-link">Registrarse</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export class UserLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("#loginForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = this.shadowRoot.querySelector("#email").value.trim().toLowerCase();
            const password = this.shadowRoot.querySelector("#password").value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
            const user = usuarios[email];

            if (user && (user.datos.password === password)) {
                localStorage.setItem("usuarioActual", email);
                alert(`Bienvenido, ${user.datos.name}`);
                window.location.href = "./Dashboard.html";
            } else {
                alert("Credenciales incorrectas.");
            }
        });
    }
}

customElements.define("user-login", UserLogin);
