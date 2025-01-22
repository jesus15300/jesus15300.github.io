async function obtenerInfoVisitas(loader) {
  try {
    showLoader(loader);
    // Envía los datos al backend como JSON
    const response = await fetch(apiUrl + 'api/ips/visitas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      }
    });

    if (response.ok) {
      const result = await response.json();
      hideLoader(loader)
      return result;
    } else {
      alert('Error al obtener los datos, contacte a Chucho :(');
      hideLoader(loader);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error al recibir los datos, no entre en panico y llame a Chucho.');
    hideLoader(loader);
  }
}
function showLoader(loader) {
  loader.classList.remove('disabled');
}
function hideLoader(loader) {
  loader.classList.add('disabled');
}

function main(loader) {

  // Llamada al backend para obtener los datos
  obtenerInfoVisitas(loader)
    .then(response => data = response)
    .then(data => {
      // Actualizar resumen
      document.getElementById("total-visitas").textContent = data.totalVisitas;
      document.getElementById("region-top").textContent = data.regionMasVisitada.region + " (" + data.regionMasVisitada.visitas + " visitas)";
      document.getElementById("ultima-region").textContent = data.ultimaRegion;
      document.getElementById("ultima-fecha").textContent = new Date(data.ultimaFecha).toLocaleString();

      // Gráfica de pastel - Distribución por región
      const ctxPie = document.getElementById("visitasPorRegionChart").getContext("2d");
      new Chart(ctxPie, {
        type: "pie",
        data: {
          labels: Object.keys(data.visitasPorRegion),
          datasets: [{
            data: Object.values(data.visitasPorRegion),
            backgroundColor: ["#4CAF50", "#FF5722", "#3F51B5", "#FFC107", "#8E44AD", "#3498DB"],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Distribución de Visitas por Región",
            },
          },
        },
      });
      // Gráfica de pastel - Distribución por ciudad
      const ctxPie2 = document.getElementById("visitasPorCiudadChart").getContext("2d");
      new Chart(ctxPie2, {
        type: "pie",
        data: {
          labels: Object.keys(data.visitasPorCiudad),
          datasets: [{
            data: Object.values(data.visitasPorCiudad),
            backgroundColor: ["#4CAF50", "#FF5722", "#3F51B5", "#FFC107", "#8E44AD", "#3498DB"],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Distribución de Visitas por Ciudad",
            },
          },
        },
      });

      // Gráfica de barras - Evolución de visitas en el tiempo
      const ctxBar = document.getElementById("visitasPorTiempoChart").getContext("2d");
      new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: data.visitasPorFecha.map(v => v.fecha),
          datasets: [{
            label: "Visitas",
            data: data.visitasPorFecha.map(v => v.cantidad),
            backgroundColor: "#4CAF50",
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Evolución de Visitas en el Tiempo",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Fecha",
              },
            },
            y: {
              title: {
                display: true,
                text: "Cantidad de Visitas",
              },
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
    });
}