const placeholder = document.getElementById('map-container');
  const mapContainer = document.getElementById('map-container');
  let mapLoaded = false; // Para asegurarnos de cargar el mapa solo una vez

  // Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !mapLoaded) {
        // Cargar el mapa cuando el contenedor es visible
        console.log('Contenedor visible, cargando mapa...');
        loadMap();
        mapLoaded = true; // Evita múltiples cargas
        observer.unobserve(placeholder); // Deja de observar después de cargar
      }
    });
  });

  observer.observe(placeholder); // Observar el contenedor del mapa

  // Función para cargar el mapa dinámicamente
  function loadMap() {
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.9134215802783!2d-97.69331632600488!3d19.45929928182576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85daada83532b22d%3A0x1d4f5bcfb8c0b3db!2sSalon%20Victoria!5e0!3m2!1ses-419!2smx!4v1736625755985!5m2!1ses-419!2smx"; // Coloca tu URL de Google Maps aquí
    iframe.style = "border:0;";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    mapContainer.innerHTML = ""; // Limpia el contenido previo
    mapContainer.appendChild(iframe); // Agrega el iframe al contenedor
  }