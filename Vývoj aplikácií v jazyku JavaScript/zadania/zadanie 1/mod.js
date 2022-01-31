// pre zapnutie debug modu zadajte k url &DEBUG=true
//autor: Peter Plevko

let space = document.getElementById("space")
let canvas = document.createElement("CANVAS");
const ctx = canvas.getContext('2d');

let link = document.createElement("link")
link.rel = "shortcut icon"
link.href = "#"
document.head.appendChild(link)

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('DEBUG')  // &DEBUG=true
let debugMode
if(product === "true"){
    debugMode = 1
}
else{
    debugMode = 0
}


initSpace();
function initSpace() {

    space.innerHTML = ""
    space.appendChild(canvas);
    canvas.width = 528;
    canvas.height = 528;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 528, 528);

    if(debugMode){
        console.log("inicializujem plochu")
    }
}


window.drawSpace = function () {
    let background = new Image();
    background.src = "https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    // https://www.pexels.com/photo/white-and-black-light-streaks-3648850/ copiright
    background.onload = function(){
        ctx.drawImage(background,0,0,528,528);
    }

    if(debugMode){
        console.log("kreslim plochu")
    }
}


window.drawAliens = function () {
    aliens.forEach((alien) => {
        let x
        let y
        x = alien % 11
        y = Math.floor( alien / 11)


        let base_image = new Image();
        base_image.src = 'https://cdn.pixabay.com/photo/2020/01/19/15/02/ufo-4778062_960_720.png';
        // https://pixabay.com/vectors/ufo-alien-ship-spaceship-alien-4778062/ copiright
        base_image.onload = function(){
            ctx.drawImage(base_image, x * 48,y * 48, 48, 48);
        }
    });
    if(debugMode){
        console.log("kreslim mimozemstana")
    }
}


window.drawShip = function () {
    ship.forEach((s) => {
        let x
        let y
        x = s % 11
        y = Math.floor( s / 11)

        let base_image = new Image();
        base_image.src = "https://image.shutterstock.com/shutterstock/photos/1436378753/display_1500/stock-vector-spaceship-pixel-art-style-rocket-launch-pixel-art-spaceship-in-retro-style-bit-pixel-art-eps-1436378753.jpg";
        // https://www.shutterstock.com/image-vector/spaceship-pixel-art-style-rocket-launch-1436378753 copiright
        base_image.onload = function(){
            ctx.drawImage(base_image, x * 48,y * 48, 48, 48);
        }
    });
    if(debugMode){
        console.log("kreslim lod")
    }
}


window.drawMissiles = function () {
    missiles.forEach((missile) => {
        let x
        let y
        x = missile % 11
        y = Math.floor( missile / 11)

        let base_image = new Image();
        base_image.src = 'https://cdn.pixabay.com/photo/2013/07/12/13/52/rocket-147466_960_720.png';
        // https://pixabay.com/vectors/rocket-spaceship-space-shuttle-nasa-147466/ copiright
        base_image.onload = function(){
            ctx.drawImage(base_image, x * 48,y * 48, 48, 48);
        }
    });
    if(debugMode){
        console.log("kreslim rakety")
    }
}


// vyhral som
window.win = function () {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 528, 528);
    ship = [104,114,115,116];
    changeLevel()
    if(debugMode){
        console.log("vyhral si")
    }
}


// prehral som
window.loose = function () {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 528, 528);
    if(debugMode){
        console.log("prehral si")
    }
}


// pridava ovladanie wasd
window.checkKey = function (e) {
    e = e || window["event"];
    if (e.keyCode == '37') {
        if(ship[0] > 100) {
            for(let i=0;i<ship.length;i++) {
                ship[i]--;
            }
        }
    }
    else if (e.keyCode == '39' && ship[0] < 108) {
        for(let i=0;i<ship.length;i++) {
            ship[i]++;
        }
    }
    else if (e.keyCode == '32') {
        missiles.push(ship[0]-11);
    }
    //wasd

    else if (e.keyCode == '65') {
        if(ship[0] > 100) {
            for(let i=0;i<ship.length;i++) {
                ship[i]--;
            }
        }
    }
    else if (e.keyCode == '68' && ship[0] < 108) {
        for(let i=0;i<ship.length;i++) {
            ship[i]++;
        }
    }
    else if (e.keyCode == '87') {
        missiles.push(ship[0]-11);
    }



}


function playMusic(){
    let music = document.createElement("AUDIO");

    music.src = "https://www.bensound.com/bensound-music/bensound-dubstep.mp3"
    // https://www.bensound.com/royalty-free-music/track/dubstep copiright
    music.id = "music"
    let btn = document.createElement("button");
    btn.innerHTML = "Music";


    btn.addEventListener("click", function () {
        let audio = document.getElementById("music")
        if(audio.paused === true){
            audio.play()
            if(debugMode){
                console.log("pustil si hudbu")
            }
        }
        else{
            audio.pause()
            if(debugMode){
                console.log("vypol si hudbu")
            }
        }
    });

    document.body.appendChild(btn)
    document.body.appendChild(music)
}
playMusic()


let globalScore = 0
let score = document.createElement("h1");
score.id = "score"
score.textContent = "score: " + globalScore
space.appendChild(score)


let levelH1 = document.createElement("h1");
levelH1.id = "level"
levelH1.textContent = "level: " + level
space.appendChild(levelH1)


function changeScore(){
    document.getElementById("score").textContent = "score: " + globalScore
    if(debugMode){
        console.log("meni sa skore")
    }
}


function changeLevel(){

    document.getElementById("level").textContent = "level: " + level
    if(debugMode){
        console.log("meni sa level")
    }
}


window.nextLevel = function () {

        level++;
        console.log('level: '+level);

        if(level==1) aliens = [1,3,5,7,9,23,25,27,29,31];
        if(level==2) aliens = [1,3,5,7,9,13,15,17,19,23,25,27,29,31];
        if(level==3) aliens = [1,5,9,23,27,31];
        if(level==4) aliens = [45,53];
        if(level > 4) {
            level = 1;
            aliens = [1,3,5,7,9,23,25,27,29,31];
            speed = speed / 2;
        }
        gameLoop();
    changeLevel();
}


window.checkCollisionsMA = function () {
    for(let i=0;i<missiles.length;i++) {
        if(aliens.includes(missiles[i])) {
            if(debugMode){
                console.log("zostrelil si mimozemstana")
            }
            globalScore += 10;
            changeScore()
            let alienIndex = aliens.indexOf(missiles[i]);
            aliens.splice(alienIndex, 1);
            missiles.splice(i, 1);
        }
    }
}


let resetBtn = document.createElement("button");
resetBtn.innerHTML = "reset";

resetBtn.addEventListener("click", function () {
    for(let i=0; i<100; i++)
    {
        window.clearInterval(i);
    }
    speed = 512;
    missiles = []
    ship = [104,114,115,116];
    aliens = [1,3,5,7,9,23,25,27,29,31];
    level = 1;
    running = false
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 528, 528);
    globalScore = 0
    changeScore()
    changeLevel()
    if(debugMode){
        console.log("resetujem level")
    }

});

document.body.appendChild(resetBtn)