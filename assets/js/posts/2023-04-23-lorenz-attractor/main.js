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
        ctx.fillRect(this.yProjected - this.radius, this.xProjected - this.radius, this.radius, this.radius);
    }
}

var rgb_arr = [100, 100, 100]
const updateColor = () => {
    var i = Math.round(Math.random() * (3));
    let tmp = rgb_arr
    if (Math.random() < 0.5) {
        tmp[i] = Math.abs(tmp[i] + 10) % 255;
    } else {
        tmp[i] = Math.abs(tmp[i] - 10) % 255;
    }
    rgb_arr = tmp
}

let color_index = 0;
const drawLorenz = () => {
    let dx = (a * (y - x)) * dt;
    let dy = ((x * (b - z)) - y) * dt;
    let dz = ((x * y) - (c * z)) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;
    let color = "rgb("+rgb_arr[0]+","+rgb_arr[1]+","+rgb_arr[2]+")";
    let d = new Dot(x,y,z)
    d.draw(color)
}

(async () => {
    const render = () => {
        drawLorenz();
        updateColor();
        window.requestAnimationFrame(render);
    }
    render()
})()
