const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 6;

const sizex = window.innerWidth;
const sizey = window.innerHeight-15;

const resize = () => {
    HDcanvas()
    ctx.moveTo(0,0);
    ctx.lineTo(200,1001);
    ctx.stroke();
}


function HDcanvas(){

canvas.style.width = sizex +"px";
canvas.style.height = sizey +"px";

canvas.width = Math.floor(sizex * scale);
canvas.height = Math.floor(sizey * scale);

ctx.scale(scale, scale);

}

resize()
window.addEventListener('resize',resize)


ctx.moveTo(0,0);

ctx.lineTo(200,1001);
ctx.stroke();