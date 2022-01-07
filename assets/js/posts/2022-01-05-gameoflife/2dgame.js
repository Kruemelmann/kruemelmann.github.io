'use strict'

let res = 10;
let grid_border_thickness = 0.07;

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}

function gen2dArr(cols, rows) {
    //get a 2d canvas
    let grid = [...Array(rows)].map(x=>Array(cols).fill(0))

    //fill with random vals
    let filled_percent = 1/6
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if(Math.random() < filled_percent) {
                grid[i][j] = Math.round(Math.random());
            }
        }
    }

    // spawn a glider
    //   let xcor = 10;
    //   let ycor = 10;
    //   grid[xcor-1][ycor-1] = 0;//top left
    //   grid[xcor][ycor-1] = 0;//top mid
    //   grid[xcor+1][ycor-1] = 1;//top right
    //   grid[xcor-1][ycor] = 1;//mid left
    //   grid[xcor+1][ycor] = 1;//mid right
    //   grid[xcor-1][ycor+1] = 0;//below left
    //   grid[xcor][ycor+1] = 1;//below mid
    //   grid[xcor+1][ycor+1] = 1;//below right
    return grid;
}

//draw the grid
function drawGrid(ctx, grid) {
    ctx.lineWidth = grid_border_thickness;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            let xcor = i * res;
            let ycor = j * res;

            ctx.beginPath();
            if(grid[i][j] == undefined) {
                console.log("err")
            }

            if(grid[i][j] == 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(xcor, ycor, res, res);
            } else {
                ctx.fillStyle = "white";
                ctx.rect(xcor, ycor, res, res);
                ctx.fill()
                ctx.stroke()
            }
        }
    }
}


function calcNeighbours(grid, xcor, ycor) {
    let sum = 0;
    sum += grid[xcor-1][ycor-1];//top left
    sum += grid[xcor][ycor-1];//top mid
    sum += grid[xcor+1][ycor-1];//top right

    sum += grid[xcor-1][ycor];//mid left
    sum += grid[xcor+1][ycor];//mid right

    sum += grid[xcor-1][ycor+1];//below left
    sum += grid[xcor][ycor+1];//below mid
    sum += grid[xcor+1][ycor+1];//below right

    return sum
}

function playTheGameOfLife(grid, cols, rows) {
    //TODO remove this this is eating performance:) instead toggle between two arrays
    let new_grid = gen2dArr(cols, rows);
    let n = 0;

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            // no flickering at the borders -> TODO remove this and move to an infinite grid
            if(i == 0 || j == 0 || i >= grid.length-1 || i >= grid[i].length-1) {
                new_grid[i][j] = 0
                continue
            }

            n = calcNeighbours(grid, i, j);
            if(grid[i][j] == 0) {
                //dead cell
                if(n == 3) {
                    new_grid[i][j] = 1;
                } else {
                    new_grid[i][j] = 0;
                }
            } else if (grid[i][j] == 1) {
                //living cell
                if(n < 2) {
                    new_grid[i][j] = 0;
                } else if (n == 2 || n == 3) {
                    new_grid[i][j] = 1;
                } else {
                    new_grid[i][j] = 0;
                }
            }
        }
    }

    return new_grid
}

(async () => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let cols = c.width / res;
    let rows = c.height / res;

    let grid = await gen2dArr(cols, rows);

    drawGrid(ctx, grid);

    //actualy play the game
    function test(){
        setTimeout(function(){
            drawGrid(ctx, grid);
            grid = playTheGameOfLife(grid, cols, rows)
            test()
        }, 100);
    }
    // FIXME add button to toggle animation
            test()
})();
