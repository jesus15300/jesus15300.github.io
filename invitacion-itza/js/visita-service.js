const browserInfo = {
  appName: navigator.appName,
  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  languages: navigator.languages,
  cookieEnabled: navigator.cookieEnabled,
};
console.log(browserInfo);
registrarVisita();
async function registrarVisita() {
  try {
    // Envía los datos al backend como JSON
    const response = await fetch(apiUrl + 'api/invitaciones/registrar-visita?id=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(browserInfo),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Visita guardada: ' + JSON.stringify(result));
    } else {
      //   alert('Error al enviar el formulario.');
    }
  } catch (error) {
    console.error('Error:', error);
    // alert('Hubo un error al enviar el formulario.');
  }
}
