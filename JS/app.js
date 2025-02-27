/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d")

class Rectangle{
    constructor(positionX, positionY, length, width, color) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.length = length;
        this.width = width;
        this.color = color;
    }
}

