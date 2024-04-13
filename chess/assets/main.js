//import { Cursor } from "./Cursor.js"
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
let tablero = []
const piezas = []
//const mano = new Cursor(0, 0, 40)


function setup() {
    canvas.width = 80 * 8
    canvas.height = 80 * 8
    setupTablero()
    //mano.sqrSize = canvas.width / 8
}
function draw() {
    drawBoard('white', 'green')
    requestAnimationFrame(draw)
}

function drawBoard(white, black) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let color;
            if ((i + j) % 2 == 0) {
                color = white
            } else {
                color = black
            }
            let sqrSize = canvas.width / 8
            if (tablero[i + j * 8] == 0) {
                c.fillStyle = color
                c.fillRect(i * sqrSize, j * sqrSize, sqrSize, sqrSize)
            } else {
                insertarImagen(i, j, sqrSize, color)
            }
        }
    }
}
function insertarImagen(x, y, size, bgcolor) {
    let img = new Image()
    img.src = piezas[tablero[x + y * 8] - 1]
    img.onload = function () {
        c.fillStyle = bgcolor
        c.fillRect(x * size, y * size, size, size)
        c.drawImage(img, x * size, y * size, size, size)
    }
}
function setupTablero() {
    for (let i = 0; i < 12; i++) {
        piezas[i] = new Image()
    }

    piezas[0] = ("assets/piezas/torre_blanca.png");
    piezas[1] = ("assets/piezas/torre_negra.png");
    piezas[2] = ("assets/piezas/reina_blanca.png");
    piezas[3] = ("assets/piezas/reina_negra.png");
    piezas[4] = ("assets/piezas/peon_blanco.png");
    piezas[5] = ("assets/piezas/peon_negro.png");
    piezas[6] = ("assets/piezas/rey_blanco.png");
    piezas[7] = ("assets/piezas/rey_negro.png");
    piezas[8] = ("assets/piezas/alfil_blanco.png");
    piezas[9] = ("assets/piezas/alfil_negro.png");
    piezas[10] = ("assets/piezas/caballo_blanco.png");
    piezas[11] = ("assets/piezas/caballo_negro.png");

    for (let i = 0; i < 64; i++) {
        tablero[i] = 0
    }

    for (let i = 0; i < 8; i++) {
        let j = 1
        tablero[i + j * 8] = 5 + 1
        j = 6
        tablero[i + j * 8] = 4 + 1

    }

    tablero[0] = 1 + 1;
    tablero[7] = 1 + 1;
    tablero[0 + 7 * 8] = 0 + 1;
    tablero[7 + 7 * 8] = 0 + 1;
    tablero[1] = 11 + 1;
    tablero[6] = 11 + 1;
    tablero[1 + 7 * 8] = 10 + 1;
    tablero[6 + 7 * 8] = 10 + 1;
    tablero[2] = 9 + 1;
    tablero[5] = 9 + 1;
    tablero[2 + 7 * 8] = 8 + 1;
    tablero[5 + 7 * 8] = 8 + 1;
    tablero[3] = 3 + 1;
    tablero[4] = 7 + 1;
    tablero[3 + 7 * 8] = 2 + 1;
    tablero[4 + 7 * 8] = 6 + 1;
}

setup()
draw()

class Cursor{
    /*
    x;y;piece
    sqrSize
    hand
    prevX;prevY;prevPiece*/
    x
    y
    sqrSize
    constructor(x,y,sqrSize){
        this.x=x
        this.y=y
        this.sqrSize=this.sqrSize
    }

}