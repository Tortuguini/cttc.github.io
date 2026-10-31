//Constantes

const greyScale = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`\'.";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = "monospace"

const scale = 6;

const buffer = 500;

//Camera settings
const fov = 100;
const cameraCords = [-10,-10,10];
const camera_angles = (0,0,0);
const focalLenght =100;


const d = new Date();
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
    this.DepthCords;
    }
    draw(color){

        let distance2Camera= ((this.x-cameraCords[0])**2+(this.y-cameraCords[1])**2+(this.z-cameraCords[2])**2)**0.5

        this.DepthCords= cordCorrect((this.x*focalLenght)/distance2Camera,(this.y*focalLenght)/distance2Camera);

        let size =1;

        ctx.fillStyle=color;
        ctx.fillRect(this.DepthCords[0]-(size/2),this.DepthCords[1]-(size/2),size,size);
    }
}

class Triangle{
    constructor(v1,v2,v3,color){
        this.vertexs = [v1,v2,v3];
        this.color = color;
        this.vertices = [];
        this.draw();
    }

    draw(){

        for (const i in this.vertexs){
            this.vertexs[i].draw(this.color);
            this.vertices.push([this.vertexs[i].DepthCords[0],this.vertexs[i].DepthCords[1]]);

        }

        ctx.beginPath();
        ctx.moveTo(this.vertices[0][0],this.vertices[0][1]);
        ctx.lineTo(this.vertices[1][0],this.vertices[1][1]);
        ctx.lineTo(this.vertices[2][0],this.vertices[2][1]);
        ctx.moveTo(this.vertices[2][0],this.vertices[2][1]);
        ctx.lineTo(this.vertices[0][0],this.vertices[0][1]);


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

function cordCorrect(x,y){
    return [x+(sizex/2),(sizey/2)-y];
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

//Inicializacion
resize()
window.addEventListener('resize',resize)
//window.addEventListener("click",(e) =>{drawOnMouse(e)})

const a = new Vertex(0,0,0);
const b = new Vertex(100,0,0);
const c = new Vertex(60,100,100);

const triangulo = new Triangle(a,b,c,"red");