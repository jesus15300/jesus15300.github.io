const containers = document.querySelectorAll('.container-observed');
let actualcontainer = containers[0];
let isPresentationEnded = false;
let actualTimeout = null;
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box-observed');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // entry.target.classList.add('visible');
                // entry.target.classList.remove('invisible');
                entry.target.querySelectorAll('*').forEach(child => {
                    // console.log(entry.target,'Objecto visible');
                    child.classList.add('visible');
                    child.classList.remove('invisible');
                });

            } else {
                // entry.target.classList.remove('visible');
                // entry.target.classList.add('invisible');
                entry.target.querySelectorAll('*').forEach(child => {
                    // console.log(entry.target, 'Objecto invisible');
                    child.classList.add('invisible');
                    child.classList.remove('visible');
                });
            }
        });
    });
    boxes.forEach(box => observer.observe(box));


    /* Observador para los contenedores */
    const observerContainer = new IntersectionObserver((entries2) => {
        entries2.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target, 'Contenedor visible');
                actualcontainer = entry.target;
                if (isPresentationEnded) {
                    return;
                }
                timerForShowNextContainer();
            }
        });
    });
    containers.forEach(container => observerContainer.observe(container));
});

function timerForShowNextContainer() {
    const next = actualcontainer.nextElementSibling;

    if (!next || !next.classList.contains('container-observed')) {
        console.log('Fin de la presentación');
        isPresentationEnded = true;
        return;
    }

    if (actualTimeout) {
        clearTimeout(actualTimeout);
    }
    actualTimeout = setTimeout(() => {
        actualcontainer.nextElementSibling.scrollIntoView({ behavior: "smooth" });
    }, 8000);
}
