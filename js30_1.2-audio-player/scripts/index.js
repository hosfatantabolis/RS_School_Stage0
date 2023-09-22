import  {
    audioContents, 
    audioPlayer, 
    playBtn, 
    prevBtn, 
    nextBtn, 
    audioPlayerCover, 
    audioPlayerSong,
    audioPlayerArtist,
    timeline,
    progressBar,
    currentTime,
    songLength

} from './constants.js';

const audio = new Audio();
let position = 0;
let isPlaying = false;

audio.src = audioContents[position].src;
audio.volume = 0.2;

audio.addEventListener("loadeddata", ()=>{
    songLength.textContent = convertTime(audio.duration);
});

console.log(audio.src);
function playAudio() {
    if(isPlaying){
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
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
    audioPlayerSong.textContent = audioContents[position].song;
    audioPlayerArtist.textContent = audioContents[position].artist;
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

setSongInfo();

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

function convertTime(n){
    let seconds = parseInt(n);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

setInterval(() => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    currentTime.textContent = convertTime(
      audio.currentTime
    );
  }, 500);