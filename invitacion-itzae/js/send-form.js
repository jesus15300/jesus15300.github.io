  const btnConfirmar = document.getElementById('btnConfirmar');
  document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    btnConfirmar.disabled = true;
    btnConfirmar.textContent = 'Enviando...';
    if(localStorage.getItem('confirmacion')){
      alert('Ya has confirmado tu asistencia, gracias :)');
      btnConfirmar.disabled = false;
      btnConfirmar.textContent = 'Confirmar';
      return;
    }
    // Crea un objeto FormData para capturar los datos del formulario
    const formData = new FormData(event.target);

    // Convierte los datos a un objeto JSON
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Envía los datos al backend como JSON
      const response = await fetch(apiUrl + 'api/invitaciones/confirmar-invitacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Confirmacion enviada, gracias por confirmar tu asistencia :)');
        localStorage.setItem('confirmacion', JSON.stringify(data));


      } else {
        alert('Error al confirmar la asistencia.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al confirmar la asistencia.');
    }
    btnConfirmar.disabled = false;
    btnConfirmar.textContent = 'Confirmar';
  });
