var canvas=document.getElementById("main-canvas");
const c=canvas.getContext("2d");

canvas.width=500;
canvas.height=500;

c.fillStyle='rgba(255,255,255,255)';
var x=canvas.width/2+100;
var y=canvas.height/2;
var u=-1;
var v=1;
function draw(){
    c.clearRect(0,0,innerWidth,innerHeight);
    c.fillRect(x-5,y-5,10,10);
    x+=u;
    y+=v;
    if(x>canvas.width || x<0 ){
        u*=-1
    }
    if(y>canvas.height || y<0 ){
        v*=-1
    }
    requestAnimationFrame(draw());
}
draw();
