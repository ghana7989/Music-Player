const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// List Of Songs
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of Song
let songIndex = 0;
// Initially load Song details into DOM
loadSong(songs[songIndex]);

// This function will update song details
function loadSong(song) {
    title.innerText = song

    audio.src = `./music/${song}.mp3`
    cover.src = `./images/${song}.jpg`

}
// Pauses the Song
function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fa").classList.remove("fa-pause")
    playBtn.querySelector("i.fa").classList.add("fa-play")

    audio.pause()
}

// Plays the song
function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fa").classList.remove("fa-play")
    playBtn.querySelector("i.fa").classList.add("fa-pause")

    audio.play()
}
// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Updates the progress

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100
    progress.style.width = `${progressPercentage}%`
}
// Set Progress Bar

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}

// EventListener

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play")

    isPlaying ? pauseSong() : playSong()
})

// Change Song 
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

// Time / song update Event
audio.addEventListener("timeupdate", updateProgress)


// Click on ProgressBar
progressContainer.addEventListener("click", setProgress)


// Song Next
audio.addEventListener("ended",nextSong)