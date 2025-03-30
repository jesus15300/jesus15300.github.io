const meses = document.getElementById('meses');
const dias = document.getElementById('dias');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
function asignarTiempoRestante() {
    const tiempoRestante = calcularTiempoRestante();
    meses.textContent = tiempoRestante.meses;
    dias.textContent = tiempoRestante.dias;
    horas.textContent = tiempoRestante.horas;
    minutos.textContent = tiempoRestante.minutos;
    segundos.textContent = tiempoRestante.segundos;
}

setInterval(asignarTiempoRestante, 1000);

