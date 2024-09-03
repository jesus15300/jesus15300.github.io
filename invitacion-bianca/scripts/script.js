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
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('[class*="animated-div-"]');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
});

// Observar cada uno de los elementos animados
animatedElements.forEach(element => {
    observer.observe(element);
});

});
function stars() {
    let e = document.createElement("div");
    e.setAttribute("class", "star");
    document.body.appendChild(e);
    e.style.left = Math.random() * +innerWidth + "px";
  
    let size = Math.random() * 12;
    let duration = Math.random() * 1;
  
    e.style.fontSize = 12 + "px";
    e.style.animationDuration = 10 + duration + "s";
    setTimeout(function () {
      document.body.removeChild(e);
    }, 10000);
  }
  
  setInterval(function () {
    stars();
  }, 100);
    // Actualizar el countdown cada segundo
    setInterval(updateCountdown, 1000);

    // Llamar a la función inmediatamente para mostrar el countdown inicial
    updateCountdown();
    console.log("Hola");
