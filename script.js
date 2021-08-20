const musicPlaylistTag = document.getElementsByClassName("playlist")[0];
const audioList = document.getElementsByClassName("audioTag")[0];
const currentAndEndTag = document.getElementsByClassName("currentAndEnd")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playTag = document.getElementsByClassName("play")[0];
const pauseTag = document.getElementsByClassName("pause")[0];
const nextTag = document.getElementsByClassName("next")[0];
const previoustag = document.getElementsByClassName("previous")[0];

const tracks =  [{
     trackID: "Charlotte OST - Nouryokushatachi.mp3", title:"Charlotte OST - Nouryokushatachi"
 }, {trackID: "Call your Name - Sakurasou No Pet Na Kanojo OST.mp3", title:"Call your Name - Sakurasou No Pet Na Kanojo OST"},
  {trackID:"Angel Beats! - My Most Precious Treasure.mp3", title:"Angel Beats! - My Most Precious Treasure"},{
      trackID:"Kirameki ~Kousei to Kaori.mp3", title: "Kirameki ~Kousei to Kaori"},
    {trackID:"Seishun Buta Yaroui OST - Youths pigs.mp3", title:"Seishun Buta Yaroui OST - Youths pigs"},{
        trackID:"Tonari No Kaibutsu Kun[ - Tetsukazu No Kanjou.mp3", title: "Tonari No Kaibutsu Kun[ - Tetsukazu No Kanjou"},
    {trackID:"WHITE ALBUM PIANO.mp3", title:"WHITE ALBUM PIANO"}];

 for(let i = 0; i < tracks.length; i++){
     const trackTag = document.createElement("div");
     trackTag.classList.add("trackItem");
     trackTag.classList.add("hvr-underline-from-left");
     trackTag.classList.add("hvr-push");
     trackTag.addEventListener("click", () => {
        playIndex = i;
        playSong();
         
         /*const trackName = tracks[i].trackID;
         audioList.src = trackName;
         audioList.play()
         isPlaying = true;
         
         updatePlayPause()*/
     })

     const title = (i + 1).toString() + "." + tracks[i].title;
     trackTag.textContent = title;
     musicPlaylistTag.append(trackTag);
 }
 let duration = 0;
let durationText = "00:00"
 audioList.addEventListener("loadeddata", () => {
    duration = Math.floor(audioList.duration);
     durationText = creatMinSecText(duration);
    /*const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const seconsText = seconds < 10? "0" + seconds.toString() : seconds;*/

    
});

audioList.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioList.currentTime);

    const currentTimeText = creatMinSecText(currentTime);
    const currentTimeTextAndDuration = currentTimeText +" / " + durationText;

    currentAndEndTag.textContent = currentTimeTextAndDuration;

    updateCurrentProgress(currentTime);

    /*const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const seconsText = seconds < 10? "0" + seconds.toString() : seconds;*/
});

const updateCurrentProgress = (currentTime) => {
   const currentProgressWidth = (330/duration) * currentTime;
   currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

const creatMinSecText = (totalSeconds) => {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const seconsText = seconds < 10? "0" + seconds.toString() : seconds;
    return minutesText + ":" + seconsText; 

};

let playIndex = 0;
let isPlaying = false;

playTag.addEventListener("click", () => {
    const  now = Math.floor(audioList.currentTime);
    isPlaying = true;
    if(now === 0){
        playSong();
    } else {
        audioList.play()
        updatePlayPause()
    }
});

pauseTag.addEventListener("click", () => {
    isPlaying = false;
    audioList.pause();
    updatePlayPause()
})

const updatePlayPause = () => {
    if(isPlaying) {
        playTag.style.display = "none";
        pauseTag.style.display = "inline";
    } else {
        playTag.style.display = "inline";
        pauseTag.style.display = "none";
    }
}

nextTag.addEventListener("click", () => {
    if(playIndex === tracks.length - 1){
        return;
    }
    playIndex += 1;
    playSong();
    

})

previoustag.addEventListener("click", () => {
    if(playIndex === 0) {
        return;
    }
    playIndex -= 1;
    
    playSong();
})

const playSong = () => {
    const SongtoPlay = tracks[playIndex].trackID;
    audioList.src = SongtoPlay;
    audioList.play();
    isPlaying = true;
    updatePlayPause()
};