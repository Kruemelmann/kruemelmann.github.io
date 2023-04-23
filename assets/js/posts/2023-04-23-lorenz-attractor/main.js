'use strict'

var can = document.getElementById("lorenz_canvas");
this.ctx = can.getContext("2d");
let width = can.width;
let height = can.height;

let PERSPECTIVE = width * 0.8;
let PROJECTION_CENTER_X = width / 2;
let PROJECTION_CENTER_Y = height / 2;

//initial values
let x = 0.01;
let y = 0.0;
let z = 0.0;
let a = 10.0;
let b = 28.0;
let c = 8.0/3.0;
let dt = 0.01;

class Dot {
    constructor(x,y,z) {
        this.x = x * width;
        this.y = y * height;
        this.z = z * width;
        this.radius = 3;
        this.xProjected = 0;
        this.yProjected = 0;
        this.scaleProjected = 0;
    }
    project() {
        this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
        this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X;
        this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y;
    }
    draw(color) {
        this.project();
        ctx.globalAlpha = Math.abs(1 - this.z / width);
        ctx.fillStyle = color;
        ctx.fillRect(
            this.xProjected - this.radius,
            this.yProjected - this.radius,
            this.radius,
            this.radius);
    }
    connect(dot) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(arr[index + 1].x, arr[index + 1].y);
        ctx.stroke();
    }
}

let color_index = 0;
const drawLorenz = () => {
    let dx = (a * (y - x)) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;

    let R = (color_index >> 5) * 32
    let G = ((color_index & 28) >> 2) * 32
    let B = (color_index & 3) * 64,
    color = "rgb(" + R + ", " + G + ", " + B + ")";
    color_index++;

    let d = new Dot(x,y,z)
    d.draw(color)
}


(async () => {
    const render = () => {
        drawLorenz();
        window.requestAnimationFrame(render);
    }
    render()
})()


