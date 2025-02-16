//on asistencia value change
function onAsistenciaChange() {
    var asistencia = document.getElementById("asistencia").value;
    console.log(asistencia);

    if (asistencia == "asistire") {
        document.getElementById("asistencia-si").style.display = "block";
        document.getElementById("recordatorio").style.display = "block";
    }
    else if (asistencia == "no-asistire") {
        document.getElementById("asistencia-si").style.display = "none";
        document.getElementById("recordatorio").style.display = "none";
        // document.getElementById("asistencia-no").style.display = "block";
    }
    else if (asistencia == "aun-no-se") {
        document.getElementById("asistencia-si").style.display = "none";
        document.getElementById("recordatorio").style.display = "block";
        // document.getElementById("asistencia-no").style.display = "block";
    }
}
