async function obtenerInvitadosConfirmados(){
    try {
        // Envía los datos al backend como JSON
        const response = await fetch(apiUrl + 'api/invitaciones/obtener-confirmados?id=1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const result = await response.json();
          return result;
        } else {
          alert('Error al obtener los datos, contacte a Chucho :(');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al recibir los datos, no entre en panico y llame a Chucho.');
      }
}