import  {audioContents, audioPlayer, playBtn, prevBtn, nextBtn, audioPlayerCover} from './constants.js';

console.log(playBtn);

const audio = new Audio();
let position = 0;
let isPlaying = false;

audio.src = audioContents[position].src;
audio.volume = 0.2;

console.log(audio.src);
function playAudio() {
    if(isPlaying){
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    //console.log(audio.currentTime);
}

function nextSong() {
    isPlaying = !isPlaying;
    if (position < audioContents.length - 1) position += 1;
    else position = 0;
    audio.src = audioContents[position].src;
    setSongInfo();
    playAudio();
}

function prevSong() {
    isPlaying = !isPlaying;
    if (position > 0) position -= 1;
    else position = audioContents.length - 1;
    audio.src = audioContents[position].src;
    setSongInfo();
    playAudio();
}

function setSongInfo() {
    audioPlayer.style.backgroundImage = `url(${audioContents[position].cover})`;
    audioPlayerCover.src = audioContents[position].cover;
}

playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('audioPlayer__pause');
    playAudio();
});

nextBtn.addEventListener('click', () => {
    nextSong();
});

prevBtn.addEventListener('click', () => {
    prevSong();
});