'use strict'

//let res = 100;
//let grid_border_thickness = 0.07;
let res = 100;
let grid_border_thickness = 0.6;

//make 2d grid
function gen2dArr(cols, rows) {
    let g = [...Array(rows)].map(x=>Array(cols).fill(0))
    return g
}

//draw the grid
function drawGrid(ctx, grid) {
    ctx.lineWidth = grid_border_thickness;
    for (var i = 0; i < grid.length * (100 / res); i++) {
        for (var j = 0; j < grid.length * (100 / res); j++) {
            let xcor = i * res;
            let ycor = j * res;

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.rect(xcor, ycor, res, res);
            ctx.fill()
            ctx.stroke()
        }
    }
}

function updateRes(newres) {
    res = newres;
}

(async () => {
    var c = document.getElementById("step1_canvas");
    var ctx = c.getContext("2d");
    let cols = c.width / res;
    let rows = c.height / res;
    let grid = await gen2dArr(cols, rows)
    drawGrid(ctx, grid);

    //actualy play the game
    function test(){
        setTimeout(function(){
            drawGrid(ctx, grid);
            test()
        }, 1000);
    }
    test()
})();



