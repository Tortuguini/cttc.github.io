//Constantes

const greyScale = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`\'.";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = "monospace"

const scale = 6;


const fov = 100;

const secPorFrame = 1/50;
const msPorFrame= secPorFrame *100;
const sizex = window.innerWidth;
const sizey = window.innerHeight-15;
//Classes

class Vertex {
    constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    }
    draw(color){

        let drawX = (this.x*fov)/(this.z+1);
        let drawY = (this.y*fov)/(this.z+1);

        console.log([drawX,drawY]);

        let cordinates = cordCorrect(this.x,this.y);

        ctx.fillStyle=color;
        ctx.fillRect(cordinates[0]-1/2,cordinates[1]-1/2,1,1);
    }
}

class Triangle{
    constructor(v1,v2,v3,color){
        this.v1= new Vertex(v1);
        this.v2= new Vertex(v2);
        this.v3= new Vertex(v3);
        this.color = color;
    }

    draw(){
        v1.draw(this.color);
        v2.draw(this.color);
        v3.draw(this.color);

        let v1xy = cordCorrect(v1.x,v1.y);
        let v2xy = cordCorrect(v2.x,v2.y);
        let v3xy = cordCorrect(v3.x,v3.y);

        ctx.beginPath();
        ctx.moveTo(v1xy[0],v1xy[1]);
        ctx.lineTo(v2xy[0],v2xy[1]);
        ctx.lineTo(v3xy[0],v3xy[1]);
        ctx.moveTo(v3xy[0],v3xy[1]);
        ctx.lineTo(v1xy[0],v1xy[1]);

        ctx.strokeStyle="white";
        ctx.lineWidth=0.5;
        ctx.stroke();

    }
}


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

function cordCorrect(x,y){
    return [x+(sizex/2),y+(sizey/2)];
}

function cordIncorrect(x,y){
    return [x-(sizex/2),y-(sizey/2)];
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

function render(){

}

//Inicializacion
resize()
window.addEventListener('resize',resize)
window.addEventListener("click",(e) =>{drawOnMouse(e)})

const v1 = new Vertex(0,-20,0)
const v2 = new Vertex(10,0,0)
const v3 = new Vertex(-10,0,0)

const triangulo = new Triangle(v1,v2,v3,"red");

triangulo.draw();
