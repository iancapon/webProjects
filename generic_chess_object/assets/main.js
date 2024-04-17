import { setupPiezas } from "./setups.js"
import { drawBoard } from "./onScreen.js"
import {board} from './board.js'
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
const turno_de = document.getElementById("turno-de")
const juego=new board()
const piezas=[]


const setup = function () {
    setupPiezas(piezas)
}


const draw = function () {
    drawBoard('white', 'pink', c, juego.tablero, piezas)
    juego.movimientosTotales(1)
    juego.signal(c,[0,6],50)
    
    //requestAnimationFrame(draw)
}

/*
let clicActivo = true;
function manejarClic() {
    if (clicActivo) {
        clicActivo = false
        mano.click(tablero, movimientos)
        setTimeout(() => { clicActivo = true; console.log('Clic reactivado.') }, 50);
    } //----------------------------------------------- 1000 milisegundos = 1 segundo
}
function onMouseMove(evt) {
    var mousePos = getMousePos(canvas, evt);
    mano.truex = Math.floor(mousePos.x / mano.sqrSize)
    mano.truey = Math.floor(mousePos.y / mano.sqrSize)
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
*/
setup()
draw()

