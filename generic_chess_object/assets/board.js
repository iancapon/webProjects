import { setupTablero } from "./setups.js"
export class board {
    /*
    constructor(tablero,turn){
        this.tablero=tablero
        this.turn=turn
    }*/
    constructor() {
        this.tablero = []
        this.validArray = []
        setupTablero(this.tablero)
        for (let i = 0; i < 64; i++) {
            let valid = []
            for (let j = 0; j < 64; j++) {valid[j]=0}
            this.validArray[i] = valid
        }
    }

    movimientosPosibles(tablero, pos, valid) {///pos es un array de x,y
        let x = pos[0]
        let y = pos[1]
        let piece = tablero[x + y * 8]
        let ret = []
        if (piece != 0) {
            for (let i = 0; i < 64; i++) { valid[i] = 0 }
            switch (piece) {
                case 1:
                    ret = this.torre(tablero, pos, valid)
                    break;
                case 2:
                    ret = this.torre(tablero, pos, valid)
                    break;
                case 3:
                    ret = this.reina(tablero, pos, valid)
                    break;
                case 4:
                    ret = this.reina(tablero, pos, valid)
                    break;
                case 5:
                    ret = this.peon(tablero, pos, valid)
                    break;
                case 6:
                    ret = this.peon(tablero, pos, valid)
                    break;
                case 7:
                    ret = this.rey(tablero, pos, valid)
                    break;
                case 8:
                    ret = this.rey(tablero, pos, valid)
                    break;
                case 9:
                    ret = this.alfil(tablero, pos, valid)
                    break;
                case 10:
                    ret = this.alfil(tablero, pos, valid)
                    break;
                case 11:
                    ret = this.caballo(tablero, pos, valid)
                    break;
                case 12:
                    ret = this.caballo(tablero, pos, valid)
                    break;
            }

        }
        return ret[0]////array de valid
    }

    movimientosTotales(turn) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.tablero[i + j * 8] % 2 == turn % 2 && this.tablero[i + j * 8] != 0) {
                    let pos = [i, j]
                    this.movimientosPosibles(this.tablero, pos,this.validArray[i+j*8])
                }
            }
        }
    }

    peon(tablero, pos, valid) {
        let px = pos[0]
        let py = pos[1]
        let turn = tablero[px+py*8] % 2

        let dir = (1-2*turn)
        let st = 6
        if (dir > 0) { st = 1 }
        let flag = 0

        if (this.inboundsCheck(px, py + dir) && tablero[px + (py + dir) * 8] == 0) {//avanzar 1
            this.inbounds(valid, px, py + dir);
            if (this.inboundsCheck(px, py + dir * 2) && tablero[px + (py + dir * 2) * 8] == 0 && py == st) {//avenzar 2
                this.inbounds(valid, px, py + dir * 2);
            }
        }
        ////// COMER NORMAL
        if (this.inboundsCheck(px - 1, py + dir) && tablero[px - 1 + (py + dir) * 8] % 2 != turn % 2 && tablero[px - 1 + (py + dir) * 8] != 0) {
            this.inbounds(valid, px - 1, py + dir);
        }
        if (this.inboundsCheck(px + 1, py + dir) && tablero[px + 1 + (py + dir) * 8] % 2 != turn % 2 && tablero[px + 1 + (py + dir) * 8] != 0) {
            this.inbounds(valid, px + 1, py + dir);
        }
        /////////////////////// COMER AL PASO
        let enpassantflag = 0
        turn=1-turn////////quick fix
        if (this.inboundsCheck(px - 1, py + dir) && tablero[px - 1 + (py) * 8] == 6-turn && tablero[px - 1 + (py + dir) * 8] == 0) {
            this.inbounds(valid, px - 1, py + dir);
            enpassantflag = 1
        }
        if (this.inboundsCheck(px + 1, py + dir) && tablero[px + 1 + (py) * 8] == 6- turn && tablero[px + 1 + (py + dir) * 8] == 0) {
            this.inbounds(valid, px + 1, py + dir);
            enpassantflag = 2
        }

        /*
        if (valid[x + y * 8] > 0) {
            ret = true
            if (enpassantflag == 1 && x == px - 1 && y == py + dir) {
                tablero[x + (py) * 8] = 0
            }
            if (enpassantflag == 2 && x == px + 1 && y == py + dir) {
                tablero[x + (py) * 8] = 0
            }
            ////////////////////////////
        }*/
        //console.log("peon")
        /*
        console.log("px:" + px + " py:" + py)
        if (px == 0 && py == 6) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    //if(valid[i+j*8]>0){
                    console.log("x:" + i + " y:" + j + "->" + valid[i + j * 8])
                    //}
                }
            }
        }*/
        return [valid, flag]
    }

    torre(tablero, pos, valid) {
        for (let i = 0; i < 64; i++) {
            valid[i] = 0
        }
        return [valid, 0]
    }
    reina(tablero, pos, valid) {
        for (let i = 0; i < 64; i++) {
            valid[i] = 0
        }
        return [valid, 0]
    }
    rey(tablero, pos, valid) {
        for (let i = 0; i < 64; i++) {
            valid[i] = 0
        }
        return [valid, 0]
    }
    alfil(tablero, pos, valid) {
        for (let i = 0; i < 64; i++) {
            valid[i] = 0
        }
        return [valid, 0]
    }
    caballo(tablero, pos, valid) {
        for (let i = 0; i < 64; i++) {
            valid[i] = 0
        }
        return [valid, 0]
    }


    inboundsCheck(x, y) {
        let ret = false;
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            ret = true;
        }
        return ret;
    }

    inbounds(array, x, y) {
        if (this.inboundsCheck(x, y)) {
            array[x + y * 8] = 1;
            //console.log("VALID")
        }
    }

    //////////////

    signal(c, pos, sqrSize) {
        let x = pos[0]
        let y = pos[1]
        c.strokeStyle = 'blue';
        c.beginPath();
        c.arc((0.5 + x) * sqrSize, (0.5 + y) * sqrSize, sqrSize/2, 0, Math.PI * 2, false);
        c.stroke();
        //console.log("x:" + x + " y:" + y)
        if (this.tablero[x + y * 8] != 0) {
            //console.log(":" + this.tablero[x + y * 8])////////////ficha
            let valid = this.validArray[x + y * 8]
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (valid[i + j * 8] > 0) {
                        //console.log("x:" + i + " y:" + j)//////////posicion valida
                        if (valid[i + j * 8] == 1) {
                            c.strokeStyle = 'blue';
                        }
                        if (valid[i + j * 8] == 2) {
                            c.strokeStyle = 'red';
                        }
                        if (valid[i + j * 8] == 3) {
                            c.strokeStyle = 'orange';
                        }
                        c.beginPath();
                        c.arc((0.5 + i) * sqrSize, (0.5 + j) * sqrSize, sqrSize / 4, 0, Math.PI * 2, false);
                        c.stroke();
                    }
                }
            }
        }

    }
}