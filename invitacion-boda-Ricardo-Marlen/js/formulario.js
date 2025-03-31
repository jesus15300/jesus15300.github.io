//on asistencia value change
function onAsistenciaChange() {
    var asistencia = document.getElementById("asistencia").value;
    console.log(asistencia);

    if (asistencia == "CONFIRMADO") {
        document.getElementById("asistencia-si").style.display = "block";
        document.getElementById("recordatorio").style.display = "block";
        document.getElementById("acompanantes").disabled = false;
        document.getElementById("generoMusical").disabled = false;
        document.getElementById("bebidaPreferencia").disabled = false;
        document.getElementById("mensaje").disabled = false;
    }
    else if (asistencia == "RECHAZADO") {
        document.getElementById("asistencia-si").style.display = "none";
        document.getElementById("recordatorio").style.display = "none";
        //poner todos los campos en disabled
        document.getElementById("acompanantes").disabled = true;
        document.getElementById("generoMusical").disabled = true;
        document.getElementById("bebidaPreferencia").disabled = true;
        document.getElementById("mensaje").disabled = true;

        // document.getElementById("asistencia-no").style.display = "block";
    }
    else if (asistencia == "DUDOSO") {
        document.getElementById("asistencia-si").style.display = "none";
        document.getElementById("recordatorio").style.display = "block";
        // document.getElementById("asistencia-no").style.display = "block";
        //poner todos los campos en disabled
        document.getElementById("acompanantes").disabled = true;
        document.getElementById("generoMusical").disabled = true;
        document.getElementById("bebidaPreferencia").disabled = true;
        document.getElementById("mensaje").disabled = true;
    }
}

var form = document.getElementById("formulario");

// attach event listener
// form.addEventListener("submit", guardarFormulario);

let btnConfirmar = document.getElementById("guardar");
form.addEventListener("submit", function guardarFormulario(event) {
    event.preventDefault();
    btnConfirmar.disabled = true;
    btnConfirmar.textContent = 'Enviando...';
    if (false){//localStorage.getItem('confirmacion' + idInvitacion)) {
        alert('Ya has confirmado tu asistencia, gracias :)');
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Confirmar';
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    preguntas = [
        {
            id: 'generoMusical',
            pregunta: 'Genero musical preferido',
            respuesta: formData.get('generoMusical')
        },
        {
            id: 'bebidaPreferencia',
            pregunta: 'Bebida de preferida',
            respuesta: formData.get('bebidaPreferencia')
        },
        {
            id: 'mensaje',
            pregunta: 'Mensaje para los novios',
            respuesta: formData.get('mensaje')
        }

    ];
    preguntas = preguntas.filter(p => p.respuesta != null);

    let idVisita = window.localStorage.getItem('visita' + idInvitacion);
    if (idVisita) {
        data.idVisita = idVisita;
    } else {
        // console.error('Por favor vuelve a cargar la pagina antes de volver a intentar');

        alert('Por favor vuelve a cargar la pagina antes de volver a intentar');
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Enviar';
        return;
    }

    let body = {
        idInvitacion: idInvitacion,
        acompanantes: data.acompanantes,
        nombre: data.nombre,
        email: data.email,
        recibirRecordatorio: data.recibirRecordatorio == "on" && data.asistencia != 'RECHAZADO' ? true : false,
        respuestas: preguntas,
        idVisitaPagina: idVisita,
        estado: data.asistencia
    }
    confirmarAsistencia(body);
});

async function confirmarAsistencia(data) {


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
            localStorage.setItem('confirmacion' + idInvitacion, JSON.stringify(data));


        } else {
            alert('Error al confirmar la asistencia.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al confirmar la asistencia.');
    }
    btnConfirmar.disabled = false;
    btnConfirmar.textContent = 'Enviar';
};



