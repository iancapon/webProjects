var canvas=document.getElementById("main-canvas");
const c=canvas.getContext("2d");

canvas.width=1000;
canvas.height=1000;


var x=canvas.width/2+50;
var y=canvas.height/2;
var u=-4;
var v=4;
const forma=1
function draw(){
    c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle='white';
    x+=u;
    y+=v;
    if(x+50>canvas.width || x-50<0 ){
        u*=-1
    }
    if(y+50>canvas.height || y-50<0 ){
        v*=-1
    }
    if(forma==0){
        
        c.fillRect(x-10,y-10,20,20);
    }
    if(forma==1){
        c.beginPath();
        c.arc(x,y,50,0,Math.PI*2,false);
        c.strokeStyle='white';
        c.stroke();
        c.fill()
        
        
    }
    requestAnimationFrame(draw);
}
draw(0)
