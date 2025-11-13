// public/js/Components/user-register.js
class UserRegister extends HTMLElement {
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
        <style>
            .modal-video { display:none; position:fixed; z-index:1050; left:0; top:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); justify-content:center; align-items:center; }
            .modal-content { background:white; border-radius:10px; padding:15px; text-align:center; max-width:340px; }
            video, canvas { border-radius:10px; }
        </style>

        <div class="container mt-5">
            <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow p-4">
                <h3 class="text-center mb-3">Registro de usuario</h3>
                <form id="registerForm">
                    <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="name" required>
                    </div>
                    <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" required>
                    </div>

                    <div class="mb-3 text-center">
                    <img id="preview" src="" alt="Foto" style="max-width:100px; border-radius:50%; display:none;">
                    <br>
                    <button type="button" id="openCamera" class="btn btn-sm btn-secondary mt-2">Tomar Foto</button>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mt-3">Registrar</button>
                </form>
                </div>
            </div>
            </div>
        </div>

        <div class="modal-video" id="cameraModal">
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

        const form = this.shadowRoot.querySelector("#registerForm");
        const modal = this.shadowRoot.querySelector("#cameraModal");
        const video = this.shadowRoot.querySelector("#video");
        const canvas = this.shadowRoot.querySelector("#canvas");
        const preview = this.shadowRoot.querySelector("#preview");
        const openCameraBtn = this.shadowRoot.querySelector("#openCamera");
        const captureBtn = this.shadowRoot.querySelector("#capture");
        const closeModalBtn = this.shadowRoot.querySelector("#closeModal");

        let stream = null;

        openCameraBtn.addEventListener("click", async () => {
            modal.style.display = "flex";
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
            } catch (err) {
                alert("No se pudo acceder a la cámara. Verifica permisos.");
            }
        });

        captureBtn.addEventListener("click", () => {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");
            preview.src = imageData;
            preview.style.display = "block";
            this.stopStream(stream);
            modal.style.display = "none";
        });

        closeModalBtn.addEventListener("click", () => {
            this.stopStream(stream);
            modal.style.display = "none";
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = this.shadowRoot.querySelector("#name").value.trim();
            const emailRaw = this.shadowRoot.querySelector("#email").value;
            const email = emailRaw.trim().toLowerCase();              // normalize
            const password = this.shadowRoot.querySelector("#password").value;
            const photo = this.shadowRoot.querySelector("#preview").src || "";

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

            if (usuarios[email]) {
                alert("Ya existe una cuenta con este correo.");
                return;
            }

            usuarios[email] = {
                datos: { name, email, password, photo },
                tareas: []
            };

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Usuario registrado correctamente");
            // asegúrate de que tu login sea index.html; si tu archivo es login.html cambia la ruta.
            window.location.href = "./Index.html";
        });
    }

    stopStream(stream) {
        if (!stream) return;
        stream.getTracks().forEach(t => t.stop());
    }
}

customElements.define("user-register", UserRegister);
