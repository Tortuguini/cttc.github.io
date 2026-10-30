//Constantes

const greyScale = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`\'.";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = "monospace"

const scale = 6;

const secPorFrame = 1/50;
const msPorFrame= secPorFrame *100;
const sizex = window.innerWidth;
const sizey = window.innerHeight-15;

//Variables----------------------

// posicion do click, para poder eliminalo, e o marxe de limpeza
let playerPos;
let eraseable = false;
const sizeClear = -15;


//Functions

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-30, License - CC BY-SA 4.0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function HDcanvas(){

canvas.style.width = sizex +"px";
canvas.style.height = sizey +"px";

canvas.width = Math.floor(sizex * scale);
canvas.height = Math.floor(sizey * scale);

ctx.scale(scale, scale);

}

const resize = () => {
    HDcanvas()
}

function mousepos (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    return[x,y];
}

function drawOnMouse(e){
    let pos= mousepos(e);

    if(eraseable != false ){

    //o 10 e o 3 son valores especificos para o cracter @
    ctx.clearRect(playerPos[0]+10,playerPos[1]+3,sizeClear,sizeClear);

    playerPos = pos;

    }else{
    eraseable = true;
    playerPos = pos;
    }

    ctx.fillStyle="red";
    ctx.fillText("@",pos[0],pos[1]);

}

resize()
window.addEventListener('resize',resize)
window.addEventListener("click",(e) =>{drawOnMouse(e)})

while(true){
    let now = getTime();
    updateGameState();
    render();
    sleep(now + msPorFrame - getTime());
}