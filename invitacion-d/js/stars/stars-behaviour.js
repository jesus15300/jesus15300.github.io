const starLifeTime = 10000;
const shootingStarWrapper = document.querySelector('.shooting-star-wrapper');
let tailCreationInterval = 110;

function createStar() {
    const background = document.querySelector('.stars-container');
    const star = document.createElement('div');
    star.classList.add('background-star');
    var size = Math.random() * -10;

    star.style.width = 8 + size + 'px';
    star.style.height = 8 + size + 'px';

    star.style.top = Math.random() * innerHeight + 'px';
    star.style.left = Math.random() * innerWidth + 'px';

    star.style.filter = `blur(${Math.random() * 2}px)`;

    background.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, starLifeTime);

}
setInterval(createStar, tailCreationInterval)

const star = document.querySelector('.shooting-star');
function createTail() {
    const shootingStar = document.querySelector('.stars-background');

    const rect = star.getBoundingClientRect();

    const starTail = document.createElement('div');

    starTail.classList.add('star-tail');
    const top = rect.top + window.scrollY; // Coordenada Y ajustada con scroll
    const left = rect.left + window.scrollX; // Coordenada X ajustada con scroll
    starTail.style.top = (top + 7) + 'px';
    starTail.style.left = (left + 7) + 'px';
    // console.log(starTail.style.top, starTail.style.left);
    shootingStar.appendChild(starTail);
    setTimeout(() => {
        starTail.remove();
    }, 5000);
}
let intervalTail = setInterval(createTail, 100)

star.addEventListener('click', () => {
    console.log('click');
    createShine();
    clearInterval(intervalTail);
    star.style.display = 'none';
    shootingStarWrapper.style.display = 'none';
    document.querySelector('#content-principal').style.display = 'none';
    document.querySelector('#main').style.display = 'block';
})


function createShine() {
    const starsCount = 20;
    for (let i = 0; i < starsCount; i++) {
        const shootingStar = document.querySelector('.stars-background');
        const shine = document.createElement('div');
        shine.classList.add('shine');
        const rect = star.getBoundingClientRect();
        const top = rect.top + window.scrollY; // Coordenada Y ajustada con scroll
        const left = rect.left + window.scrollX; // Coordenada X ajustada con scroll
        shine.style.top = (top + 7) + 'px';
        shine.style.left = (left + 7) + 'px';
        shootingStar.appendChild(shine);
        gravityEffect(shine, left, top);
        setTimeout(() => {
            shine.remove();
        }, 7000);
    }
}
// setInterval(createShine, 5000);

//function for make falling down effect in created stars
function gravityEffect(createdDiv, startX, startY) {
    let x = startX;
    let y = startY;
    let gravity = 0.1;
    let friction = 0.8;
    let velocityX = Math.random() * 5;
    let velocityY = Math.random() * .5;
    function move() {
        velocityY += gravity;
        x += velocityX;
        y += velocityY;
        if (y + 10 > window.innerHeight) {
            createdDiv.remove();
            velocityY = -velocityY * friction;
            y = window.innerHeight - 10;
        }
        if (x + 10 > window.innerWidth || x < 0) {
            velocityX = -velocityX * friction;
        }
        createdDiv.style.top = y + 'px';
        createdDiv.style.left = x + 'px';
        requestAnimationFrame(move);
    }
    move();
}