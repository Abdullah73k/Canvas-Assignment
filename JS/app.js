form.addEventListener("submit", (event) => {
	event.preventDefault();
	const shape1 = shape.value;
	const length1 = length.value;
	const width1 = width.value;
    const color1 = color.value;
	console.log(shape1, length1, width1);

	localStorage.setItem("shape", shape1);
	localStorage.setItem("length", length1);
	localStorage.setItem("width", width1);
    localStorage.setItem("color", color1);
});

const savedShape = localStorage.getItem("shape");
const savedLength = localStorage.getItem("length");
const savedWidth = localStorage.getItem("width");
const savedColor = localStorage.getItem("color");


/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

class Rectangle {
	constructor(positionX, positionY, length, width, color) {
		this.positionX = positionX;
		this.positionY = positionY;
		this.length = length;
		this.width = width;
		this.color = color;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionX, this.width, this.height);
	}
}

class Circle {
	constructor(positionX, positionY, radius, color) {
		this.positionX = positionX;
		this.positionY = positionY;
		this.radius = radius;
		this.color = color;
	}

	draw(ctx) {
		
	}
}
