console.log("Welcome to Spotify");
var count = 0;
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    {songName: "Alamo", filePath: "Songs\1.mp3", coverPath: "Covers/Coverpic6.jpg"},
    {songName: "Water Fountain", filePath: "Songs/2.mp3", coverPath: "Covers/Coverpic1.jpg"},
    {songName: "1994", filePath: "Songs/3.mp3", coverPath: "Covers/Coverpic7.jpg"},
    {songName: "Use me", filePath: "Songs/4.mp3", coverPath: "Covers/Coverpic8.jpg"},
    {songName: "Older", filePath: "Songs/5.mp3", coverPath: "Covers/Coverpic4.jpg"},
    {songName: "Demons", filePath: "Songs/6.mp3", coverPath: "Covers/Coverpic5.jpg"},
]

songItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = Songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = Songs[i].songName;
})


//Handle play/pause 
masterPlay.addEventListener('click', ()=>{
    if(count == 0){
        count = 1;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        count = 0;
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}); 


audioElement.addEventListener('timeupdate', ()=>{
     //Update Seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
     myProgressBar.value = progress;

});

myProgressBar.addEventListener('change' , () =>{
    audioElement.currentTime = (myProgressBar.value *audioElement.duration)/100
});


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
   
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click' , (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = Songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})


document.getElementById('next').addEventListener('click' , () => {
    if(songIndex >= 5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
      
})

document.getElementById('previous').addEventListener('click' , () => {
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
      
})



