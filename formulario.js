// Espera a que cargue todo el DOM
window.addEventListener("DOMContentLoaded", () => {

    // --- Región y comuna ---
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    const region_comuna = {
        "Región de Tarapacá": ["Camiña","Huara","Pozo Almonte","Iquique","Pica","Colchane","Alto Hospicio"],
    
        "Región de Antofagasta": ["Tocopilla","Maria Elena","Ollague","Calama","San Pedro Atacama","Sierra Gorda","Mejillones","Antofagasta","Taltal"],
    
        "Región de Atacama": ["Diego de Almagro","Chañaral","Caldera","Copiapo","Tierra Amarilla","Huasco","Freirina","Vallenar","Alto del Carmen"],
    
        "Región de Coquimbo ": ["La Higuera","La Serena","Vicuña","Paihuano","Coquimbo","Andacollo","Rio Hurtado","Ovalle","Monte Patria","Punitaqui","Combarbala","Mincha","Illapel","Salamanca",
    "Los Vilos"],
    
        "Región de Valparaíso": ["Petorca","Cabildo","Papudo","La Ligua","Zapallar","Putaendo","Santa Maria","San Felipe","Pencahue","Catemu","Llay Llay","Nogales","La Calera","Hijuelas","La Cruz",
    "Quillota","Olmue","Limache","Los Andes","Rinconada","Calle Larga","San Esteban","Puchuncavi","Quintero","Viña del Mar","Villa Alemana","Quilpue","Valparaiso","Juan Fernandez","Casablanca",
    "Concon","Isla de Pascua","Algarrobo","El Quisco","El Tabo","Cartagena","San Antonio","Santo Domingo"],
    
        "Región del Libertador Bernardo Ohiggins": ["Mostazal","Codegua","Graneros","Machali","Rancagua","Olivar","Doñihue","Requinoa","Coinco","Coltauco","Quinta Tilcoco","Las Cabras","Rengo",
    "Peumo","Pichidegua","Malloa","San Vicente","Navidad","La Estrella","Marchigue","Pichilemu","Litueche","Paredones","San Fernando","Peralillo","Placilla","Chimbarongo","Palmilla","Nancagua",
    "Santa Cruz","Pumanque","Chepica","Lolol"],
    
        "Región del Maule": ["Teno","Romeral","Rauco","Curico","Sagrada Familia","Hualañe","Vichuquen","Molina","Licanten","Rio Claro","Curepto","Pelarco","Talca","Pencahue","San Clemente",
    "Constitucion","Maule","Empedrado","San Rafael","San Javier","Colbun","Villa Alegre","Yerbas Buenas","Linares","Longavi","Retiro","Parral","Chanco","Pelluhue","Cauquenes"],
    
        "Región del Biobío": ["Tome","Florida","Penco","Talcahuano","Concepcion","Hualqui","Coronel","Lota","Santa Juana","Chiguayante","San Pedro de la Paz","Hualpen","Cabrero","Yumbel","Tucapel",
    "Antuco","San Rosendo","Laja","Quilleco","Los Angeles","Nacimiento","Negrete","Santa Barbara","Quilaco","Mulchen","Alto Bio Bio","Arauco","Curanilahue","Los Alamos","Lebu","Cañete","Contulmo",
    "Tirua"],
    
        "Región de La Araucanía": ["Renaico","Angol","Collipulli","Los Sauces","Puren","Ercilla","Lumaco","Victoria","Traiguen","Curacautin","Lonquimay","Perquenco","Galvarino","Lautaro","Vilcun",
    "Temuco","Carahue","Melipeuco","Nueva Imperial","Puerto Saavedra","Cunco","Freire","Pitrufquen","Teodoro Schmidt","Gorbea","Pucon","Villarrica","Tolten","Curarrehue","Loncoche","Padre Las Casas",
    "Cholchol"],
    
        "Región de Los Lagos": ["San Pablo","San Juan","Osorno","Puyehue","Rio Negro","Purranque","Puerto Octay","Frutillar","Fresia","Llanquihue","Puerto Varas","Los Muermos","Puerto Montt",
    "Maullin","Calbuco","Cochamo","Ancud","Quemchi","Dalcahue","Curaco de Velez","Castro","Chonchi","Queilen","Quellon","Quinchao","Puqueldon","Chaiten","Futaleufu","Palena","Hualaihue"],
    
        "Región Aisén del General Carlos Ibáñez del Campo": ["Guaitecas","Cisnes","Aysen","Coyhaique","Lago Verde","Rio Ibañez","Chile Chico","Cochrane","Tortel","O'Higins"],
    
        "Región de Magallanes y la Antártica Chilena": ["Torres del Paine","Puerto Natales","Laguna Blanca","San Gregorio","Rio Verde","Punta Arenas","Porvenir","Primavera","Timaukel","Antartica"],
    
        "Región Metropolitana de Santiago ": ["Tiltil","Colina","Lampa","Conchali","Quilicura","Renca","Las Condes","Pudahuel","Quinta Normal","Providencia","Santiago","La Reina","Ñuñoa","San Miguel",
    "Maipu","La Cisterna","La Florida","La Granja","Independencia","Huechuraba","Recoleta","Vitacura","Lo Barrenechea","Macul","Peñalolen","San Joaquin","La Pintana","San Ramon","El Bosque","Pedro Aguirre Cerda",
    "Lo Espejo","Estacion Central","Cerrillos","Lo Prado","Cerro Navia","San Jose de Maipo","Puente Alto","Pirque","San Bernardo","Calera de Tango","Buin","Paine","Peñaflor","Talagante","El Monte","Isla de Maipo",
    "Curacavi","Maria Pinto","Melipilla","San Pedro","Alhue","Padre Hurtado"],
    
        "Región de Los Ríos": ["Lanco","Mariquina","Panguipulli","Mafil","Valdivia","Los Lagos","Corral","Paillaco","Futrono","Lago Ranco","La Union","Rio Bueno"],
    
        "Región Arica y Parinacota": ["Gral. Lagos","Putre","Arica","Camarones"],
    
        "Región del Ñuble": ["Cobquecura","Ñiquen","San Fabian","San Carlos","Quirihue","Ninhue","Trehuaco","San Nicolas","Coihueco","Chillan","Portezuelo","Pinto","Coelemu","Bulnes","San Ignacio",
    "Ranquil","Quillon","El Carmen","Pemuco","Yungay","Chillan Viejo"]
    };

    // Poblar regiones al cargar
    Object.keys(region_comuna).forEach(region => {
        const opt = document.createElement("option");
        opt.value = region; 
        opt.textContent = region;
        regionSelect.appendChild(opt);
    });

    regionSelect.addEventListener("change", () => {
        const comunaOptions = region_comuna[regionSelect.value] || [];
        comunaSelect.innerHTML = "";
        comunaOptions.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            comunaSelect.appendChild(opt);
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
  
        //if (termino && termino < inicio) {
        //    alert("La fecha de término no puede ser anterior al inicio.");
        //    return false;
        //}
    
    function mostrarConfirmacion() {
        form.classList.add("hidden");
        confirmacionDiv.classList.remove("hidden");
    }
        
    btnAgregar.addEventListener("click", () => {
        if (validarFormulario()){
            mostrarConfirmacion();
        }
    });

    // Manejo de botones de confirmación
    document.getElementById("confirmar").addEventListener("click", () => {
        confirmacionDiv.classList.add("hidden");
        mensajeFinal.classList.remove("hidden");
    });

    document.getElementById("cancelar").addEventListener("click", () => {
        confirmacionDiv.classList.add("hidden");
        form.classList.remove("hidden");
    });

});
