
// Botones
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn-agregar").addEventListener("click", function() {
        window.location.href = this.dataset.url; 
    });
    document.getElementById("btn-listado").addEventListener("click", function() {
        window.location.href = this.dataset.url; 
    });
    document.getElementById("btn-estadistica").addEventListener("click", function() {
        window.location.href = this.dataset.url;
    });
});