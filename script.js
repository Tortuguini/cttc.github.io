//Constantes

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = "monospace"

const scale = 6;


const sizex = window.innerWidth;
const sizey = window.innerHeight-15;

//Variables----------------------

//que o xogador se atope no centro por defecto
let playerX=window.innerWidth/2;
let playerY = (window.innerHeight-15)/2;


//Functions

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
    let pos= mousepos(e)
    ctx.clearRect(0,0,sizex,sizey)
    ctx.fillText("@",pos[0],pos[1])
}

resize()
window.addEventListener('resize',resize)
window.addEventListener("click",(e) =>{drawOnMouse(e)})