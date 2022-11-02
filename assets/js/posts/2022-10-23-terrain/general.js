'use strict'

document.addEventListener("DOMContentLoaded", function(event) {
    const step1_canvas = new Canvas_terrain1();
    const step2_canvas = new Canvas_terrain2();
});

let res = 100;
function updateRes(newres) {
    res = newres;
}
function isHidden(el) {
    return (el.offsetParent === null)
}
