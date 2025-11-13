// public/js/Components/user-login.js
class UserLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./public/css/bootstrap.css">
        <div class="container mt-5">
            <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card shadow p-4">
                <h3 class="text-center mb-3">Iniciar Sesión</h3>
                <form id="loginForm">
                    <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" required>
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

        const form = this.shadowRoot.querySelector("#loginForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailRaw = this.shadowRoot.querySelector("#email").value;
            const email = emailRaw.trim().toLowerCase(); // normalize
            const password = this.shadowRoot.querySelector("#password").value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

            console.log("usuarios:", usuarios); // DEBUG - quita en producción
            console.log("buscar email:", email);

            const user = usuarios[email];

            if (user && (user.datos?.password === password || user.password === password)) {
                alert(`Bienvenido, ${user.datos.name}!`);
                localStorage.setItem("usuarioActual", email);
                window.location.href = "./Dashboard.html";
            } else {
                alert("Credenciales incorrectas. Intentar de nuevo.");
            }
        });
    }
}

customElements.define("user-login", UserLogin);
