class CapturaDatosPersona extends HTMLElement {
    connectedCallback(){
        this.innerHTML =`
            <fieldset>
                <input type="text" id="txt_apellidos" placeholder="INGRESE SUS APELLIDOS">
                <input type="text" id="txt_nombres" placeholder="INGRESE SUS NOMBRES">
                <input type="number" id="txt_edad" placeholder="INGRESE SU EDAD">
                <div class="sexo-options">
                    <label>SEXO:</label>
                    <div class="radio-group">
                        <input type="radio" id="sexo_m" name="sexo" value="MASCULINO">
                        <label for="sexo_m">MASCULINO</label>
                        
                        <input type="radio" id="sexo_f" name="sexo" value="FEMENINO">
                        <label for="sexo_f">FEMENINO</label>
                    </div>
                </div>
                <button type="button" id="btn_send">ENVIAR</button>
                <p id="txt_resultado"></p>
            </fieldset>`;

        const nombres = this.querySelector('#txt_nombres');
        const apellidos = this.querySelector('#txt_apellidos');
        const edad = this.querySelector('#txt_edad');
        const btn_send = this.querySelector('#btn_send');
        const resultado = this.querySelector('#txt_resultado');
        const sexo = this.querySelectorAll('input[name="sexo"]');

        // protejo contra elementos no encontrados
        if (!btn_send || !nombres || !apellidos || !edad || !resultado) return;

        btn_send.addEventListener('click', () => {
            // convierto la edad a número y valido
            const edadNum = parseInt(edad.value, 10);
            const edadValida = !Number.isNaN(edadNum);

            const r_edad = !edadValida
                ? 'EDAD NO VÁLIDA'
                : (edadNum <= 18 ? 'SOY MENOR DE EDAD' : 'SOY MAYOR DE EDAD');

            let sexoSeleccionado = '';
            sexo.forEach(radio => {
                if (radio.checked) {
                    sexoSeleccionado = radio.value;
                }
            });

            const nombreText = nombres.value ? nombres.value.trim() : '';
            const apellidoText = apellidos.value ? apellidos.value.trim() : '';

            resultado.textContent = `HOLA SOY ${nombreText} ${apellidoText} Y MI EDAD ES DE ${edadValida ? edadNum : (edad.value || 'NO ESPECIFICADA')} AÑOS, ${r_edad} Y MI SEXO ES ${sexoSeleccionado || 'NO ESPECIFICADO'}`;
        });
    }
}

customElements.define('capturar-datos', CapturaDatosPersona);