var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 200;
var curPerc = 0;
var circ = Math.PI * 2;

class Ball {
    constructor(x, y, speed, color, diameter) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.diameter = diameter;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
}

var sun = new Ball(centerX, centerY, 0.1, "yellow", 50)
var earth = new Ball(centerX, centerY, 0.1, "darkgreen", 10)

function animate(current) {
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sun.draw();


    //polar cords to cartesian cords (e.g.: x = r * cos(𝝋))
    earth.x = centerX + (radius * Math.cos(((circ) * current))) * Math.E*0.9;
    earth.y = centerY + (radius * Math.sin(((circ) * current)));
    earth.draw();

    curPerc++;
    requestAnimationFrame(function () {
        animate(curPerc / 1000)
    });
}
animate();
