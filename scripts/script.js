// Obtenemos las dimensiones de la ventana
const windowX = window.innerWidth;
const windowXHalf = windowX/2;
const windowY = window.innerHeight;
const windowYHalf = windowY/2;

// Crea una hoja de estilo para agregar los keyframes dinámicos
const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

// Función para crear animaciones dinámicas
function createAnimation(animationName, type, start, end, startY, endY) {
  let keyframes;

  // Definimos el tipo de animación
  switch (type) {
    case 'horizontal':
      keyframes = `
        @keyframes ${animationName} {
          0% { transform: translateX(${start}px); }
          50% { transform: translateX(0); }
          100% { transform: translateX(${end}px); }
        }
      `;
      break;
    case 'vertical':
      keyframes = `
        @keyframes ${animationName} {
          0% { transform: translateY(${start}px); }
          50% { transform: translateY(0); }
          100% { transform: translateY(${end}px); }
        }
      `;
      break;
    case 'scale':
      keyframes = `
        @keyframes ${animationName} {
          0% { transform: scale(${start}); }
          50% { transform: scale(1); }
          100% { transform: scale(${end}); }
        }
      `;
      break;
    case 'rotate':
      keyframes = `
        @keyframes ${animationName} {
          0% { transform: rotate(${start}deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(${end}deg); }
        }
      `;
      break;
      case 'appear-half':
        keyframes = `
        @keyframes ${animationName} {
          0% { transform: translate(${start}px, ${startY}px) scale(1); }
          90% { transform: translate(${end}px, ${endY}px) scale(1);}
          100% { transform: translate(${end}px, ${endY}px) scale(0); }
        }
      `;
      break;
    default:
      console.warn("Tipo de animación no soportado.");
      return;
  }

  // Agrega los keyframes a la hoja de estilo
  styleSheet.innerHTML += keyframes;
}

// Función para aplicar una animación a un elemento
function applyAnimation(element, animationName, duration = '2s', iterationCount = 'infinite') {
  element.style.animation += `${animationName} ${duration} ease-in-out ${iterationCount}`;
}


// Seleccionamos la imagen y le aplicamos una animación
const image = document.getElementById("img1");
let imageX = 50, imageY = 50;
createAnimation("customAnim", "appear-half", windowXHalf , 0,windowYHalf-30, windowYHalf-20)
applyAnimation(image, "customAnim", "5s", "infinite");  // Cambia 'slideHorizontal' a la animación deseada

