//on asistencia value change
function onAsistenciaChange() {
    var asistencia = document.getElementById("asistencia").value;
    console.log(asistencia);

    if (asistencia == "asistire") {
        document.getElementById("asistencia-si").style.display = "block";
        document.getElementById("recordatorio").style.display = "block";
        document.getElementById("acompanantes").disabled = false;
        document.getElementById("generoMusical").disabled = false;
        document.getElementById("bebidaPreferencia").disabled = false;
        document.getElementById("mensaje").disabled = false;
    }
    else if (asistencia == "no-asistire") {
        document.getElementById("asistencia-si").style.display = "none";
        document.getElementById("recordatorio").style.display = "none";
        //poner todos los campos en disabled
        document.getElementById("acompanantes").disabled = true;
        document.getElementById("generoMusical").disabled = true;
        document.getElementById("bebidaPreferencia").disabled = true;
        document.getElementById("mensaje").disabled = true;

        // document.getElementById("asistencia-no").style.display = "block";
    }
    else if (asistencia == "aun-no-se") {
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
    if (localStorage.getItem('confirmacion')) {
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

    let idVisita = window.localStorage.getItem('visita');
    if (idVisita) {
        data.idVisita = idVisita;
    } else {
        console.error('No se encontró el ID de visita en localStorage.');
        return;
    }

    switch (data.asistencia) {
        case "asistire":
            let body = {
                idInvitacion: idInvitacion,
                acompanantes: data.acompanantes,
                nombre: data.nombre,
                email: data.email,
                recibirRecordatorio: data.recibirRecordatorio == "on" ? true : false,
                respuestas: preguntas,
                idVisitaPagina: idVisita,
            }
            confirmarAsistencia(body);
            break;
        case "no-asistire":
            rechazarAsistencia(data);
            break;
        case "aun-no-se":
            guardarPendiente(data);
            break;
    }
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

function rechazarAsistencia(data) {
    console.log('rechazarAsistencia', data);
    alert('Gracias por informarnos que no asistirás a la boda.');
}


