document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/estadistica")
        .then(response => response.json())
        .then(data => {
            console.log("Datos cargados:", data);
            crearGraficoLineas(data.actividades_por_dia);
            crearGraficoTorta(data.actividades_por_tipo);
            crearGraficoBarras(data.actividades_por_mes_franja);
        });

    function crearGraficoLineas(datos) {
        Highcharts.chart('grafico-lineas', {
            chart: { type: 'line' },
            title: { text: 'Actividades por Día' },
            xAxis: {
                categories: datos.map(d => d.fecha),
                title: { text: 'Fecha' }
            },
            yAxis : {
                title: { text: 'Cantidad' }
            },
            series: [{
                name: 'Actividades',
                data: datos.map(d => d.cantidad)
            }]
        });    
    }

    function crearGraficoTorta(datos) {
        Highcharts.chart('grafico-torta', {
            chart: { type: 'pie' },
            title: { text: 'Actividades por Tipo' },
            series: [{
                name: 'Cantidad',
                data: datos.map(d => ({
                    name: d.tipo,
                    y: d.cantidad
                }))
            }]
        });
    }

    function crearGraficoBarras(datos) {
        Highcharts.chart('grafico-barras', {
            chart: { type: 'column' },
            title: { text: 'Actividades por Mes y Franja horaria' },
            xAxis: {
                categories: datos.map(d => d.mes),
                title: { text: 'Mes' }
            },
            yAxis: {
                title: { text: 'Cantidad' }
            },
            series: [
                {
                    name: 'Mañana',
                    data: datos.map(d => d.manana)
                },
                {
                    name: 'Tarde',
                    data: datos.map(d => d.tarde)
                },
                {
                    name: 'Noche',
                    data: datos.map(d => d.noche)
                }
            ]
        });
    }
});
