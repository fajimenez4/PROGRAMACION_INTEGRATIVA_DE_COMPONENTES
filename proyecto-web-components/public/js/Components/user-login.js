// Crear template HTML para el componente
const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./public/css/bootstrap.css">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card shadow p-4">
                <h3 class="text-center mb-3">Iniciar Sesión</h3>

                <!-- Formulario de login -->
                <form id="loginForm">
                    <!-- Campo de correo -->
                    <div class="mb-3">
                        <label class="form-label">Correo</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>

                    <!-- Campo de contraseña -->
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" id="password" class="form-control" required>
                    </div>

                    <!-- Botón de envío -->
                    <button type="submit" class="btn btn-primary w-100 mt-3">Ingresar</button>

                    <!-- Enlace a registro -->
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

// Definir clase del Web Component
export class UserLogin extends HTMLElement {
    constructor() {
        super();
        // Crear Shadow DOM y agregar template
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Ejecutarse cuando el componente se inserta en el DOM
    connectedCallback() {
        const form = this.shadowRoot.querySelector("#loginForm");

        // Escuchar evento submit del formulario
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const email = this.shadowRoot.querySelector("#email").value.trim().toLowerCase();
            const password = this.shadowRoot.querySelector("#password").value;

            // Recuperar usuarios del localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
            const user = usuarios[email];

            // Validar credenciales
            if (user && (user.datos.password === password)) {
                // Guardar usuario actual y redirigir
                localStorage.setItem("usuarioActual", email);
                alert(`Bienvenido, ${user.datos.name}`);
                window.location.href = "./Dashboard.html";
            } else {
                alert("Credenciales incorrectas.");
            }
        });
    }
}

// Registrar el Web Component
customElements.define("user-login", UserLogin);
