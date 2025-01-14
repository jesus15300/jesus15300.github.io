const urls = ["songs/cumpleaños-plim-plim.mp3"]
let audios = [];
let volume = 0.6;
function playSong(song) {
    const audio = new Audio(urls[song]);
    audios.push(audio);
    audio.play();
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