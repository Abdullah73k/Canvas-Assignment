let rectangleForm = document.getElementById("rectangle");
let circleForm = document.getElementById("circle");

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

class Circle {
	constructor(positionX, positionY, radius, color) {
		this.positionX = parseInt(positionX);
		this.positionY = parseInt(positionY);
		this.radius = parseInt(radius);
		this.color = color;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}

circleForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const radiusC = document.getElementById("shapeC").value;
	const positionXC = document.getElementById("positionXC").value;
	const positionYC = document.getElementById("positionYC").value;
	const colorC = document.getElementById("colorC").value;

	console.log("Circle:", radiusC, positionXC, positionYC, colorC);

	let shapes = JSON.parse(localStorage.getItem("shapes")) || [];

	const newCircle = {
		type: "circle",
		radius: parseInt(radiusC),
		color: colorC,
		x: parseInt(positionXC), 
		y: parseInt(positionYC),
	};

	shapes.push(newCircle);
	localStorage.setItem("shapes", JSON.stringify(shapes));

	let lastShape = shapes[shapes.length - 1];
	let circle1 = new Circle(
		lastShape.x,
		lastShape.y,
		lastShape.radius,
		lastShape.color
	);

	circle1.draw(ctx);
});
