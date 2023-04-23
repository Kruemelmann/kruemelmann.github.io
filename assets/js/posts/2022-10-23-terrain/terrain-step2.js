'use strict'

let Canvas_terrain2 = class {
    constructor() {
        var c = document.getElementById("step2_canvas");
        this.ctx = c.getContext("2d");

        let cols = c.width / res;
        let rows = c.height / res;
        (async () => {
            this.grid = await this.gen2dArr(cols, rows);
            this.drawGrid();
            this.animate();
        })()
    }

    //draw the grid
    drawGrid() {
        this.ctx.lineWidth = 0.6;
        for (var i = 0; i < this.grid.length * (100 / res); i++) {
            for (var j = 0; j < this.grid.length * (100 / res); j++) {
                let xcor = i * res;
                let ycor = j * res;

                this.ctx.beginPath();
                this.ctx.fillStyle = "white";
                this.ctx.rect(xcor, ycor, res, res);
                this.ctx.fill()
                this.ctx.stroke()
            }
        }
    }
    animate() {
        setTimeout(() => {
            this.drawGrid();
            this.animate();
        }, 1000);
    }
    //make 2d grid
    gen2dArr(cols, rows) {
        let g = [...Array(rows)].map(x=>Array(cols).fill(0))
        return g
    }
}


