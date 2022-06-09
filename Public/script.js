let audioElement = document.createElement('audio');
let songs = document.getElementsByClassName('song');
let playIcon = document.getElementsByClassName('fa-play-circle-o');
let songIndex = 0;
let volume = 1;
let repeatAll = true;
volInp.value = volume*100;
volumePer.innerHTML = `${parseInt(volume * 100)}`;

durationValue.innerHTML = '00:00 / 00:00';
let currentDurationn = 0;

songsList = [
    { "songName": "Mere Wall - Karan Randhawa", "path": "playlist/s14.mp3", "coverpath": "img/cover/14.jpg" },
    { "songName": "Naah - Jass Manak", "path": "playlist/s15.mp3", "coverpath": "img/cover/15.jpg" },
    { "songName": "Rabb Wangu - Jass Manak", "path": "playlist/s19.mp3", "coverpath": "img/cover/19.jpg" },
    { "songName": "Tera Mera Viah - Jass Manak", "path": "playlist/s20.mp3", "coverpath": "img/cover/20.jpg" },
    { "songName": "Tere Karke - Guri", "path": "playlist/s16.mp3", "coverpath": "img/cover/16.jpg" },
    { "songName": "Gaani - Guri", "path": "playlist/s17.mp3", "coverpath": "img/cover/17.jpg" },
    { "songName": "Door Ho Geya - Guri", "path": "playlist/s18.mp3", "coverpath": "img/cover/18.jpg" },
    { "songName": "Udd Gaya", "path": "playlist/UddGaya.mp3", "coverpath": "img/cover/UddGaya.jpg" },
    { "songName": "Mere Beliya Ve", "path": "playlist/s13.mp3", "coverpath": "img/cover/13.jpg" },
    { "songName": "Mera Yaar - Lekh", "path": "playlist/LekhMeraYaar.mp3", "coverpath": "img/cover/LekhMeraYaar.jpg" },
    { "songName": "Bewafai Kar Gaya", "path": "playlist/BewafaiKarGaya.mp3", "coverpath": "img/cover/BewafaiKarGaya.jpg" },
    { "songName": "Zaroori Nai", "path": "playlist/ZarooriNai.mp3", "coverpath": "img/cover/13.jpg" },
    { "songName": "Tainu Milke - Akhil", "path": "playlist/s21.mp3", "coverpath": "img/cover/21.jpg" },
    { "songName": "Pyaar Karte Ho Na - Javed Mohsin", "path": "playlist/s1.mp3", "coverpath": "img/cover/1.jpg" },
    { "songName": "Khairiyat", "path": "playlist/s3.mp3", "coverpath": "img/cover/3.jpg" },
    { "songName": "Kabhi Tumhe", "path": "playlist/s4.mp3", "coverpath": "img/cover/4.jpg" },
    { "songName": "Mann Bharryaa 2.0", "path": "playlist/s5.mp3", "coverpath": "img/cover/5.jpg" },
    { "songName": "Raataan Lambiyan", "path": "playlist/s6.mp3", "coverpath": "img/cover/6.jpg" },
    { "songName": "Ranjha", "path": "playlist/s7.mp3", "coverpath": "img/cover/7.jpg" },
    { "songName": "She Loves You", "path": "playlist/s8.mp3", "coverpath": "img/cover/8.jpg" },
    { "songName": "She's The One", "path": "playlist/s9.mp3", "coverpath": "img/cover/9.jpg" },
    { "songName": "Churai Janda Eh", "path": "playlist/s10.mp3", "coverpath": "img/cover/10.jpg" },
    { "songName": "Big Dreams", "path": "playlist/s11.mp3", "coverpath": "img/cover/11.jpg" },
    { "songName": "Main Tan Vi Pyar Kardan", "path": "playlist/s12.mp3", "coverpath": "img/cover/12.jpg" },
    { "songName": "Bandook - Mohit Suthar ( Ramesh Nath )", "path": "playlist/s2.mp3", "coverpath": "img/cover/2.jpg" }
];

for (let i = 0; i < songsList.length; i++) {
    let songDiv = document.createElement('div');
    songDiv.classList.add('song');
    songDiv.innerHTML = `
                        <img src=${songsList[i].coverpath} class="cover">
                        <span class="songName">${songsList[i].songName}</span>
                        <i class="fa fa-play-circle-o" style="font-size:25px;"></i>
                        `;
    songList.appendChild(songDiv);
}

//////// Default   /////////////////////////////////////////////////////////////////////////////

setSong(songIndex);

//// Event Listeners   ///////////////////////////////////////////////////////////////////////////////

window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        playBtnEvent();
        e.preventDefault();
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSong();
    }
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSong();
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        volume -= 0.03;
        if (volume < 0) {
            volume = 0;
        }
        if (volume < 0.30 && volume > 0.03) {
            speaker.classList.add('fa-volume-down');
            speaker.classList.remove('fa-volume-up');
        }
        if (volume < 0.03) {
            speaker.classList.add('fa-volume-off');
            speaker.classList.remove('fa-volume-down');
            volume = 0;
        }
        audioElement.volume = volume;
        volInp.value = volume*100;
        showSpeaker();
    }
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        volume += 0.03;
        if (volume > 1) {
            volume = 1;
        }
        if (volume > 0) {
            speaker.classList.remove('fa-volume-off');
            speaker.classList.add('fa-volume-down');
        }
        if (volume > 0.30) {
            speaker.classList.remove('fa-volume-down');
            speaker.classList.add('fa-volume-up');
        }
        audioElement.volume = volume;
        volInp.value = volume*100;
        showSpeaker();
    }
});

speaker.addEventListener('mouseover', ()=>{
    inpUl.style.display = 'flex';
    inpUl.addEventListener('mouseleave', ()=>{
        setTimeout(() => {
            inpUl.style.display = 'none';
        }, 1000);
    });
    speaker.addEventListener('mouseleave', ()=>{
        setTimeout(() => {
            inpUl.style.display = 'none';
        }, 10000);
    });
});

let volumeAfterUnmute = volume;
speaker.addEventListener('click', ()=>{
    if(volume != 0){
        volumeAfterUnmute = volume;
        volume = 0;
        if(speaker.classList.contains('fa-volume-up')){
            speaker.classList.remove('fa-volume-up');
            speaker.classList.add('fa-volume-off');
        }
        if(speaker.classList.contains('fa-volume-down')){
            speaker.classList.remove('fa-volume-down');
            speaker.classList.add('fa-volume-off');
        }
        audioElement.volume = volume;
        volInp.value = volume*100;
        showSpeaker();
    }
    else{
        volume = volumeAfterUnmute;
        speakerUpdate22()


        // speaker.classList.remove('fa-volume-off');
        // speaker.classList.add('fa-volume-up');
    }
    
});

volInp.addEventListener('input', ()=>{
    volume = volInp.value/100;
    audioElement.volume = volume;
    speakerUpdate22();
});

playBtn.addEventListener('click', playBtnEvent);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioElement.addEventListener('ended', ()=>{
    if(!repeatAll){
        songIndex -= 1;
    }
    nextSong();
} );

Array.from(songs).forEach((element, index) => {
    element.children[2].addEventListener('click', (e) => {
        songIndex = index;
        setSong(songIndex);
        playPause(element.children[2]);
        resetall(element.children[2]);
    });
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 500);
    seekbar.value = progress;
    updateDuration();
});

seekbar.addEventListener('input', seekbarUpdate);

/// Functions   ///////////////////////////////////////////////////////////////////////////////////// 

function playBtnEvent() {
    if (songList.children[songIndex].children[2].classList.contains('fa-play-circle-o')) {
        songList.children[songIndex].children[2].classList.add('fa-pause-circle-o');
        songList.children[songIndex].children[2].classList.remove('fa-play-circle-o');
    }
    else {
        songList.children[songIndex].children[2].classList.add('fa-play-circle-o');
        songList.children[songIndex].children[2].classList.remove('fa-pause-circle-o');
    }
    playPause(playBtn)
}

function nextSong() {
    songIndex += 1;
    if (songIndex == songsList.length) {
        songIndex = 0;
    }
    setSong(songIndex);
    playSong(playBtn);
}

function prevSong() {
    songIndex -= 1;
    if (songIndex == -1) {
        songIndex = songsList.length - 1;
    }
    setSong(songIndex);
    playSong(playBtn);
}

function setSong(i) {
    audioElement.setAttribute('src', songsList[i].path);
    mainCoverImage.setAttribute('src', songsList[i].coverpath);
    disk.setAttribute('src', songsList[i].coverpath);
    mcSongName.innerHTML = songsList[i].songName;
    document.title = `NB Spotify - ${songsList[i].songName}`;
}

function resetall(ele) {
    Array.from(songs).forEach(element => {
        if (element.children[2] != ele) {
            if (element.children[2].classList.contains('fa-pause-circle-o')) {
                element.children[2].classList.remove('fa-pause-circle-o');
                element.children[2].classList.add('fa-play-circle-o');
            }
        }
    });
}

function playPause(e) {
    if (e.classList.contains('fa-play-circle-o')) {
        playSong(e);
    }
    else {
        audioElement.pause();
        musicGif.style.opacity = '0';
        disk.style.animationPlayState = 'paused';
        e.classList.add('fa-play-circle-o');
        e.classList.remove('fa-pause-circle-o');
        playBtn.classList.add('fa-play-circle-o');
        playBtn.classList.remove('fa-pause-circle-o');
    }
}

function playSong(e) {
    audioElement.play();
    musicGif.style.opacity = '1';
    disk.style.animationPlayState = 'running';
    e.classList.add('fa-pause-circle-o');
    e.classList.remove('fa-play-circle-o');
    playBtn.classList.add('fa-pause-circle-o');
    playBtn.classList.remove('fa-play-circle-o');
    updateListBtn(e);
}

function seekbarUpdate() {
    audioElement.currentTime = seekbar.value * audioElement.duration / 500;
}

function updateListBtn(e) {
    Array.from(songs).forEach(element => {
        songList.children[songIndex].children[2].classList.add('fa-pause-circle-o');
        songList.children[songIndex].children[2].classList.remove('fa-play-circle-o');
        resetall(songList.children[songIndex].children[2]);
    });
}

function updateDuration() {
    setTimeout(() => {

        totalDuration = parseInt(audioElement.duration);
        currentDurationn = parseInt(audioElement.currentTime);

        let tm = parseInt(totalDuration/60);
        let ts = totalDuration%60;
        let cm = parseInt(currentDurationn/60);
        let cs = currentDurationn%60;

        if(cs <10 || ts < 10 ){
            if(cs < 10){
                durationValue.innerHTML = `0${cm}:0${cs} / 0${tm}:${ts}`;
                if(ts < 10){
                    durationValue.innerHTML = `0${cm}:0${cs} / 0${tm}:0${ts}`;
                }
            }
            if(ts < 10){
                durationValue.innerHTML = `0${cm}:${cs} / 0${tm}:0${ts}`;
            }
        }
        else{
            durationValue.innerHTML = `0${cm}:${cs} / 0${tm}:${ts}`;
        }
    }, 1000);
}

function showSpeaker() {
    // volumeValue.style.opacity = "1";
    inpUl.style.display = "flex";
    setTimeout(() => {
        inpUl.style.display = "none";
        // volumeValue.style.opacity = "0";
    }, 2000);
    volumePer.innerHTML = `${parseInt(volume * 100)}`;
}

function repaetMusic(){
    if(repeatAll){
        repaetMusicBtn.innerHTML = `<span id="repttt1">1</span><i class="fa-solid fa-repeat"></i>`;
        repeatAll = false;
    }
    else{
        repaetMusicBtn.innerHTML = `<i class="fa-solid fa-repeat"></i>`;
        repeatAll = true;
    }
}

function speakerUpdate22(){
    if (volume > 0 && volume < .3) {
        speaker.classList.remove('fa-volume-off');
        speaker.classList.add('fa-volume-down');
    }
    if (volume > 0.30) {
        speaker.classList.remove('fa-volume-off');
        speaker.classList.add('fa-volume-up');
    }
    audioElement.volume = volume;
    volInp.value = volume*100;
    showSpeaker();
}