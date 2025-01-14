const btnVolume = document.getElementById('btn-volume');
console.log(btnVolume);
const videobg = document.getElementById('video-bg');

const body = document.querySelector('body');
console.log(body);

document.querySelector('#open-letter').addEventListener('click', function () {
    if (document.querySelector('.letter').classList.contains('letter--open')) {
        document.querySelector('.letter').classList.remove('letter--open');
        document.querySelector('.letter').classList.add('letter--close');
        // body.appendChild(btnVolume);
        // body.appendChild(videobg);
        setTimeout(function () {
            document.querySelector('.letter').classList.remove('letter--close');
        }, 600);
    } else {
        setTimeout(function () {
            body.appendChild(btnVolume);
            body.appendChild(videobg);
        }, 600);
        document.querySelector('.letter').classList.remove('letter--close');
        document.querySelector('.letter').classList.add('letter--open');
    }
});
