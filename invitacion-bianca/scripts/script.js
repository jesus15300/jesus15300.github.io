const eventDate = new Date('2024-09-06T17:00:00').getTime(); // Fecha del evento
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (timeLeft > 0) {
            countdownElement.innerHTML = `Faltan ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
        } else {
            countdownElement.innerHTML = "¡El evento es hoy!";
        }
    }

    // Actualizar el countdown cada segundo
    setInterval(updateCountdown, 1000);

    // Llamar a la función inmediatamente para mostrar el countdown inicial
    updateCountdown();