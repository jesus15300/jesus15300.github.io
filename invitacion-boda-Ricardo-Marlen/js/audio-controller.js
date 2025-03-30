const urls = ["songs/main.mp3"]
let audios = [];
let volume = 0.6;
function playSong(song) {
    const audio = new Audio(urls[song]);
    audios.push(audio);
    audio.play();
}
function continueSong() {
    audios.forEach(audio => {
        audio.play();
    });
    console.log('Continuando la canción...');
}
function pauseSong() {
    audios.forEach(audio => {
        audio.pause();
    });
    console.log('Pausando la canción...');
}
function changeVolume(element) {
    if (volume == 0.6) {
        element.querySelectorAll('*').forEach(child => {
            child.classList.remove('fa-volume-up');
            child.classList.add('fa-volume-down');
        });
        volume = 0.3;
        audios.forEach(audio => {
            audio.volume = volume;
        });
    }
    else if (volume == 0.3) {
        element.querySelectorAll('*').forEach(child => {
            child.classList.remove('fa-volume-down');
            child.classList.add('fa-volume-off');
        });
        volume = 0;
        audios.forEach(audio => {
            audio.volume = volume;
        });
    }
    else if (volume == 0) {
        element.querySelectorAll('*').forEach(child => {
            child.classList.add('fa-volume-up');
            child.classList.remove('fa-volume-off');
        });
        volume = 0.6;
        audios.forEach(audio => {
            audio.volume = volume;
        });
    }
}

const video = document.getElementById('video-principal');

video.addEventListener('play', () => {
    console.log('🎬 El video se está reproduciendo');
    pauseSong();
});

video.addEventListener('pause', () => {
    console.log('⏸️ El video se ha pausado');
    continueSong();
});

video.addEventListener('ended', () => {
    console.log('🏁 El video ha terminado');
    continueSong();
    video.currentTime = 0;
});