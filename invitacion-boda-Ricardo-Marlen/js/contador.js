function calcularTiempoRestante() {
    const fechaObjetivo = new Date("2025-08-02T16:00:00");
    const ahora = new Date();

    let diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        return "La fecha ya ha pasado.";
    }

    let segundos = Math.floor((diferencia / 1000) % 60);
    let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    let horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    let diasTotales = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let meses = Math.floor(diasTotales / 30);  // Aproximación de meses de 30 días
    let dias = diasTotales % 30;

    return {
        'total': diferencia,
        'meses': meses,
        'dias': dias,
        'horas': horas,
        'minutos': minutos,
        'segundos': segundos
    };
}