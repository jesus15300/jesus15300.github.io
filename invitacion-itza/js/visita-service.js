const browserInfo = {
  appName: navigator.appName,
  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  languages: navigator.languages,
  cookieEnabled: navigator.cookieEnabled,
  idVisita: -1
};
if (window.localStorage.getItem('visita' + idInvitacion)) {
  const visita = window.localStorage.getItem('visita' + idInvitacion);
  browserInfo.idVisita = visita;
}
console.log(browserInfo);

registrarVisita();
async function registrarVisita() {
  try {
    // Envía los datos al backend como JSON
    const response = await fetch(apiUrl + 'api/invitaciones/registrar-visita?id=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(browserInfo),
    });

    if (response.ok) {
      if (response.status === 201) {
        console.log('Visita registrada correctamente');
        const result = await response.json();

        console.log('Visita guardada: ' + JSON.stringify(result));
        window.localStorage.setItem('visita' + idInvitacion, result.id);
        return;
      }
      console.log('Visita actualizada correctamente');
    } else {
      //   alert('Error al enviar el formulario.');
    }
  } catch (error) {
    console.error('Error:', error);
    // alert('Hubo un error al enviar el formulario.');
  }
}
