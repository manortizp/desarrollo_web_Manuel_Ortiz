// Espera a que cargue todo el DOM
window.addEventListener("DOMContentLoaded", () => {

    // --- Región y comuna ---
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    regionSelect.addEventListener("change", () => {
    const regionId = regionSelect.value;
    comunaSelect.innerHTML = '<option value="" disabled selected>Cargando comunas...</option>';

    fetch(`/api/comunas?region_id=${regionId}`)
        .then(response => response.json())
        .then(data => {
            comunaSelect.innerHTML = '<option value="" disabled selected>Seleccionar comuna</option>';
            data.forEach(comuna => {
                const opt = document.createElement("option");
                opt.value = comuna.id;
                opt.textContent = comuna.nombre;
                comunaSelect.appendChild(opt);
            });
        })
        .catch(err => {
            comunaSelect.innerHTML = '<option value="" disabled selected>Error al cargar comunas</option>';
            console.error("Error:", err);
        });
    });
    
    // --- Contacto ---
    const contactoSelect = document.getElementById("contacto-select");
    const contactoInfo = document.getElementById("contacto-extra");

    contactoSelect.addEventListener("change", () => {
        contactoInfo.style.display = contactoSelect.value ? "block" : "none";
    });

    // --- Tema ---
    const temaSelect = document.getElementById("tema");
    const temaOtroDiv = document.getElementById("tema-otro");

    temaSelect.addEventListener("change", () => {
        temaOtroDiv.style.display = (temaSelect.value === "otro") ? "block" : "none";
    });

    // --- Fotos ---
    const fotosDiv = document.getElementById("fotos");
    const btnAgregarFoto = document.getElementById("btn-agregar-foto");

    btnAgregarFoto.addEventListener("click", () => {
        const currentInputs = fotosDiv.querySelectorAll("input[type='file']");
        if (currentInputs.length >= 5) {
            alert("Solo se permiten hasta 5 fotos.");
            return;
        }
        const nuevoInput = document.createElement("input");
        nuevoInput.type = "file";
        nuevoInput.name = "foto";
        nuevoInput.accept = "image/*";
        fotosDiv.appendChild(nuevoInput);
    });

    // --- Validaciones y Confirmación final ---
    const form = document.getElementById("form-actividad");
    const btnAgregar = document.getElementById("btn-agregar")
    const confirmacionDiv = document.getElementById("confirmacion");
    const mensajeFinal = document.getElementById("mensaje-final");

    // Función para validar el formulario y mostrar alertas con errores
    function validarFormulario() {
        const  errores  = [];

        if (!regionSelect.value){
            errores.push("Debe seleccionar una región.")
        }

        if (!comunaSelect.value){
            errores.push("Debe seleccionar una comuna.")
        }

        const sectorInput = document.getElementById("sector");

        if (sectorInput.value.trim().length > 100){
            errores.push("Sector tiene como máximo 100 caracteres");
        }

        const nombreInput = document.getElementById("nombre");
        const emailInput = document.getElementById("email");

        if (!nombreInput || nombreInput.value.trim().length < 2){
            errores.push("El nombre debe tener al menos 2 caracteres.");
        }
        
        if (nombreInput.value.trim().length > 200) {
            errores.push("El nombre debe tener como máximo 200 caracteres.");
        }

        if (emailInput.value.trim().length > 100){
            errores.push("El email no puede tener más de 100 caracteres")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            errores.push("Debe ingresar un email válido.");
        }

        const telRegex = /^\+\d{3}\.\d{8}$/;
        const telefonoInput = document.getElementById("telefono");
        if (!telRegex.test(telefonoInput.value.trim())){
            errores.push("Debe ingresar teléfono en formato +NNN.NNNNNNNN")
        }

        const inicioInput = document.getElementById("inicio");
        if (!inicioInput || !inicioInput.value) {
            errores.push("Debe seleccionar una fecha de inicio.");
        }

        const terminoInput = document.getElementById("termino");
        if (terminoInput.value){
            const inicio = new Date(inicioInput.value);
            const termino = new Date(terminoInput.value);

            const difHoras = (termino - inicio) /(1000 * 60 * 60);
        
            if (difHoras < 3){
                errores.push("La fecha de término debe ser al menos 3 horas posterior a la de inicio.");
            } 
        }

        if (temaSelect.value === ""){
            errores.push("Debe seleccionar un tema.")
        }

        if (temaSelect.value === "otro") {
            const inputTemaOtro = document.getElementById("input-tema-otro");
            if (!inputTemaOtro || inputTemaOtro.value.trim().length < 3){
                errores.push("Debe especificar una descripción para el tema 'otro' (mínimo 3 caracteres).");
            }
            else if (inputTemaOtro.value.trim().length > 15){
                errores.push("La descripción no puede superar los 15 caracteres")
            }

        }

        const fotoInputs = Array.from(fotosDiv.querySelectorAll("input[type='file']"));
        let fotosSeleccionadas = 0;
        fotoInputs.forEach(input => {
            if (input.files && input.files.length > 0){
                fotosSeleccionadas++;
            }
        });

        if (fotosSeleccionadas < 1){
            errores.push("Debe subir al menos una foto");
        }
        if (fotoInputs.length > 5) {
            errores.push("Solo se permiten hasta 5 fotos");
        }

        if (errores.length > 0){
            alert("Errores en el formulario:\n" + errores.map(e =>"- " + e).join("\n"));
            return false;
        }
        return true;
    }
    
    function mostrarConfirmacion() {
        form.classList.add("hidden");
        confirmacionDiv.classList.remove("hidden");
    }
        
    document.getElementById("btn-agregar").addEventListener("click", () => {
    if (validarFormulario()) {
        document.getElementById("form-actividad").classList.add("hidden");
        document.getElementById("confirmacion").classList.remove("hidden");
    }
    });

    // Manejo de botones de confirmación
    document.getElementById("confirmar").addEventListener("click", () => {
        document.getElementById("form-actividad").submit();
    });

    document.getElementById("cancelar").addEventListener("click", () => {
        confirmacionDiv.classList.add("hidden");
        form.classList.remove("hidden");
    });

});
