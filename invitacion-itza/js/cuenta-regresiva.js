const eventDate = new Date("2025-02-01T15:00:00");

// Actualizar la cuenta regresiva cada segundo
const diasElement = document.getElementById("dias-horas");
const minutosElement = document.getElementById("minutos-segundos");
function updateCountdown() {
    const now = new Date();
    const timeRemaining = eventDate - now;

    if (timeRemaining <= 0) {
        countdownElement.textContent = "¡Es hora de la fiesta! 🎉";
        clearInterval(interval);
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    diasElement.textContent = `${days} dias, ${hours} horas`;
    minutosElement.textContent = `${minutes} minutos y ${seconds} segundos`;
}

// Inicia el intervalo para actualizar la cuenta regresiva
const interval = setInterval(updateCountdown, 1000);
updateCountdown(); // Llama una vez para mostrar inmediatamente