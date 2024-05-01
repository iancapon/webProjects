import { setupPiezas, setupTablero } from "./setups.js"
import { drawBoard, drawPossible, translatePiece } from "./onScreen.js"
import { board } from './board.js'
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import cursor from './cursor.js'
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")


const juego = new board()
const piezas = []
let turno = 1
const turno_de = document.getElementById("turno-de")
const moves_left = document.getElementById("moves-left")
const mano = new cursor(0, 0, 50)
let jugadas = document.getElementById("sheet")

let miEquipo = 0
const socket = io("/chess")

let isSetup = false
const setup = function () {
    if (!isSetup) {
        setupPiezas(piezas)
        setupTablero(juego.tablero)
        juego.movimientosTotales()
        setupConn()
        isSetup = true
    }
}


const draw = function () {
    drawBoard('white', 'pink', c, juego.tablero, piezas)
    canvas.addEventListener("click", manejarClic)
    canvas.addEventListener("mousemove", onMouseMove)
    drawPossible('white', 'pink', c, juego.tablero, piezas, juego.validArray, [mano.x, mano.y])

    recv()

    if (juego.movesLeft > 0) {
        if (turno == 1) {
            turno_de.textContent = "Turno de: Blancas"
        }
        if (turno == 0) {
            turno_de.textContent = "Turno de: Negras"
        }
        moves_left.textContent = "Movimientos posibles totales: " + juego.movesLeft
        requestAnimationFrame(draw)
    }

    if (juego.movesLeft == 0) {
        if (turno == 1) {
            moves_left.textContent = "Gana: Negras"
        }
        if (turno == 0) {
            moves_left.textContent = "Gana: Blancas"
        }
        turno_de.textContent = "Jaquemate (o empate)"
    }

}
//////////////////////////////////
/////////////////////////////////

function setupConn() {
    socket.on("control", (data) => {
        if (data == "white") {
            miEquipo = 1
        }
        if (data == "black") {
            miEquipo = 0
        }
    })
}

function recv() {
    socket.on("jugada", (data) => {
        if (miEquipo != turno) {
            let avanza = juego.moverPieza([data.px, data.py], [data.x, data.y])
            if (avanza != 0 && avanza != 3) {
                turno = juego.turno
            }
        }
    })
}

function send() { 
    let data={
        px:mano.prevX,
        py:mano.prevY,
        x:mano.x,
        y:mano.y
    }
    socket.emit("jugada",data)
}
//////////////////////////////////
/////////////////////////////////
let clicActivo = true;
function manejarClic() {
    if (clicActivo && miEquipo == turno) {
        clicActivo = false
        let success = mano.click(juego.tablero, juego.turno)
        if (success) {
            let avanza = juego.moverPieza([mano.prevX, mano.prevY], [mano.x, mano.y])
            if (avanza != 0 && avanza != 3) {
                send()
                const audio = new Audio('assets/sounds/board.mp3');
                if (audio != null) { audio.play() }
                turno = juego.turno

                let movimiento = juego.getPieceFromXY(mano.x, mano.y)
                let piece = [mano.prevX, mano.prevY]
                let move = [mano.x, mano.y]
                movimiento = translatePiece(piece, movimiento, move)
                jugadas.innerHTML += "<br>" + (piece[0] + ":" + piece[1] + " - " + movimiento + " -> " + move[0] + ":" + move[1])
            } else {
                const audio = new Audio('assets/sounds/error.mp3');
                if (audio != null) { audio.play() }
            }
        }
        setTimeout(() => { clicActivo = true; /*console.log('Clic reactivado.')*/ }, 50);
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

setup()
draw()