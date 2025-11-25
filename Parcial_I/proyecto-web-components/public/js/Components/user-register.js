const template = document.createElement("template");
// Asignar contenido HTML y estilos al template
template.innerHTML = `
    <link rel="stylesheet" href="./public/css/bootstrap.css">

    <!-- Estilos personalizados para el modal de cámara y elementos de video -->
    <style>
    /* pantalla para capturar fotos */
    .modal-video {
        display: none;
        position: fixed;
        z-index: 1050;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
    }
    /* Contenedor  */
    .modal-content {
        background: white;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        max-width: 340px;
    }

    video, canvas {
        border-radius: 10px;
    }
    </style>

    <!-- Formulario principal de registro de usuario -->
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow p-4">
                    <h3 class="text-center mb-3">Registro de usuario</h3>

                    <!-- Formulario con campos de entrada -->
                    <form id="registerForm">
                        <div class="mb-3">
                            <label class="form-label">Nombre</label>
                            <input type="text" id="name" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Correo</label>
                            <input type="email" id="email" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Contraseña</label>
                            <input type="password" id="password" class="form-control" required>
                        </div>

                        <!-- Vista previa de foto y botón para abrir cámara -->
                        <div class="mb-3 text-center">
                            <img id="preview" src="" style="max-width:100px; border-radius:50%; display:none;">
                            <br>
                            <button type="button" id="openCamera" class="btn btn-sm btn-secondary mt-2">Tomar Foto</button>
                        </div>

                        <!-- Botón para enviar el formulario -->
                        <button type="submit" class="btn btn-primary w-100">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- capturar foto con cámara -->
    <div id="cameraModal" class="modal-video">
        <div class="modal-content">
            <h6>Captura tu foto</h6>
            <video id="video" width="260" height="180" autoplay playsinline></video>
            <canvas id="canvas" width="260" height="180" style="display:none;"></canvas>
            <div class="mt-2">
                <button id="capture" class="btn btn-success btn-sm">Capturar</button>
                <button id="closeModal" class="btn btn-danger btn-sm">Cerrar</button>
            </div>
        </div>
    </div>
    `;

export class UserRegister extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const modal = this.shadowRoot.querySelector("#cameraModal");
        const video = this.shadowRoot.querySelector("#video");
        const canvas = this.shadowRoot.querySelector("#canvas");
        const preview = this.shadowRoot.querySelector("#preview");

        let stream = null;

        // Abrir camara
        this.shadowRoot.querySelector("#openCamera").addEventListener("click", async () => {
            modal.style.display = "flex";
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        });

        // Capturar foto
        this.shadowRoot.querySelector("#capture").addEventListener("click", () => {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            preview.src = canvas.toDataURL("image/png");
            preview.style.display = "block";
            this.cerrarCamara(stream, modal);
        });

        this.shadowRoot.querySelector("#closeModal").addEventListener("click", () => {
            this.cerrarCamara(stream, modal);
        });

        // Guardar usuario
        this.shadowRoot.querySelector("#registerForm").addEventListener("submit", (e) => {
            e.preventDefault();

            const name = this.shadowRoot.querySelector("#name").value;
            const email = this.shadowRoot.querySelector("#email").value.trim().toLowerCase();
            const password = this.shadowRoot.querySelector("#password").value;
            const photo = preview.src || "";

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

            if (usuarios[email]) {
                alert("Ese correo ya está registrado.");
                return;
            }

            usuarios[email] = {
                datos: { name, email, password, photo },
                tareas: []
            };

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Usuario registrado correctamente");
            window.location.href = "./Index.html";
        });
    }

    cerrarCamara(stream, modal) {
        if (stream) stream.getTracks().forEach((t) => t.stop());
        modal.style.display = "none";
    }
}

customElements.define("user-register", UserRegister);
