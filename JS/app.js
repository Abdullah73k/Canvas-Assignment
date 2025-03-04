let rectangleForm = document.getElementById("rectangle");

/** @type {HTMLCanvasElement} */
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

class Rectangle {
	constructor(positionX, positionY, width, height, color) {
		this.positionX = parseInt(positionX);
		this.positionY = parseInt(positionY);
		this.width = parseInt(width);
		this.height = parseInt(height);
		this.color = color;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
	}
}

rectangleForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const lengthRec = document.getElementById("length").value;
	const widthRec = document.getElementById("width").value;
	const colorRec = document.getElementById("color").value;
	const positionXRec = document.getElementById("positionX").value;
	const positionYRec = document.getElementById("positionY").value;

	console.log(
		"Rectangle:",
		lengthRec,
		widthRec,
		positionXRec,
		positionYRec,
		colorRec
	);

	let shapes = JSON.parse(localStorage.getItem("shapes")) || [];

	const newRectangle = {
		type: "rectangle",
		width: widthRec,
		height: lengthRec,
		color: colorRec,
		x: positionXRec,
		y: positionYRec,
	};

	shapes.push(newRectangle);
	localStorage.setItem("shapes", JSON.stringify(shapes));

	let lastShape = shapes[shapes.length - 1];
	let rectangle1 = new Rectangle(
		lastShape.x,
		lastShape.y,
		lastShape.width,
		lastShape.height,
		lastShape.color
	);

	rectangle1.draw(ctx);
});
