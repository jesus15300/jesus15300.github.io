// const centerX = window.innerWidth;
// const centerY = window.innerHeight;
// console.log(centerX, centerY);

// let image = document.getElementById("img1");

// let currentPosition = centerX / 2 + 50;
// let startPosition = centerX / 2 + 50;
// let endPosition = -(centerX / 2) - 50;
// let step = 3;
// function animateImage() {
//   // Reduce la posición actual por cada paso
//   currentPosition -= step;

//   // Aplica la posición usando transform
//   image.style.transform = `translateX(${currentPosition}px)`;

//   // Comprueba si la imagen ha salido completamente de la pantalla
//   if (currentPosition <= endPosition) {
//     console.log(startPosition);
//     currentPosition = startPosition; // Reinicia a la posición inicial
//   }
// }

// // Inicia el intervalo para mover la imagen cada 200 ms

// setInterval(animateImage, 20);




const image = document.getElementById("img1");

// Valores iniciales y finales que quieres pasar a los keyframes
const startX = "400px";
const endX = "-400px";

// Crea una hoja de estilo para agregar los keyframes dinámicos
const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

// Define los keyframes en tiempo de ejecución
function setCustomKeyframes(start, end) {
  const keyframes = `
    @keyframes customSlide {
      0% { transform: translateX(${start}); }
      50% { transform: translateX(0); }
      100% { transform: translateX(${end}); }
    }
  `;

  // Agrega los keyframes a la hoja de estilo
  styleSheet.innerHTML = keyframes;
}

// Llama a la función con los valores deseados
setCustomKeyframes(startX, endX);

// Activa la animación agregando la clase
image.classList.add("animate");

