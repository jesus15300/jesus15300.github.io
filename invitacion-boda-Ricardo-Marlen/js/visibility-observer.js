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
});