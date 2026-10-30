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

        let cordinates = cordCorrect(this.x,this.y);

        ctx.fillStyle=color;
        ctx.fillRect(cordinates[0]-1/2,cordinates[1]-1/2,1,1);
    }
}

class Triangle{
    constructor(v1,v2,v3,color){
        this.vertex1= v1;
        this.vertex2= v2;
        this.vertex3= v3;
        this.color = color;
    }

    draw(){
        this.vertex1.draw(this.color);
        this.vertex2.draw(this.color);
        this.vertex3.draw(this.color);

        console.log("drawing")

        this.v1xy = cordCorrect(this.vertex1.x,this.vertex1.y);
        this.v2xy = cordCorrect(this.vertex2.x,this.vertex2.y);
        this.v3xy = cordCorrect(this.vertex3.x,this.vertex3.y);

        ctx.beginPath();
        ctx.moveTo(this.v1xy[0],this.v1xy[1]);
        ctx.lineTo(this.v2xy[0],this.v2xy[1]);
        ctx.lineTo(this.v3xy[0],this.v3xy[1]);
        ctx.moveTo(this.v3xy[0],this.v3xy[1]);
        ctx.lineTo(this.v1xy[0],this.v1xy[1]);

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

const a = new Vertex(10,-20,0)
const b = new Vertex(10,0,0)
const c = new Vertex(-10,0,0)

const triangulo = new Triangle(a,b,c,"red");

const d = new Vertex(-10,-20,0)

const trig2 = new Triangle(c,a,d,"blue");


triangulo.draw();
trig2.draw();


