---

layout: blog
title: game of life john conway's
published: true
tags: bazel golang

---

Playground for my john conways game of life implementation. for now its just a playground not an article (maybe later)


<div>
    <canvas id="myCanvas" width="1000" height="800"></canvas>
    <script>
    (async () => {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        let res = 10
        let cols = c.width / res;
        let rows = c.height / res;

        //get a 2d canvas
        let grid = new Array(cols);
        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array(rows);
        }

        //fill with random vals
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                if(Math.random() < (1/2)) {
                    grid[i][j] = Math.round(Math.random())
                }
            }
        }


        //draw it
        ctx.lineWidth = 0.5; //smaller borders between the boxes
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
                let xcor = i * res;
                let ycor = j * res;

                ctx.beginPath();
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
    )();
    </script>
</div>
