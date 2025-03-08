/**
 * Abdullah Khamis - 400558799
 * Date Created: 2025, 02, 25
 * Description: This file handles shape selection, drawing, clearing and undoing of shapes on the canvas.
 */

window.addEventListener("load", function () {
	let shapeSelector = document.getElementById("selector");
	let rectangleForm = document.getElementById("rectangle");
	let circleForm = document.getElementById("circle");
	let triangleForm = document.getElementById("triangle");
	let clearButton = document.getElementById("clear");
	let undoButton = document.getElementById("undo");

	shapeSelector.addEventListener("change", function () {
		let shape = shapeSelector.value;

		switch (shape) {
			case "rectangle":
				rectangleForm.style.display = "inherit";
				circleForm.style.display = "none";
				triangleForm.style.display = "none";
				break;
			case "circle":
				rectangleForm.style.display = "none";
				circleForm.style.display = "inherit";
				triangleForm.style.display = "none";
				break;
			case "triangle":
				rectangleForm.style.display = "none";
				circleForm.style.display = "none";
				triangleForm.style.display = "inherit";
				break;
		}
	});

	clearButton.addEventListener("click", function () {
		let shapes = JSON.parse(localStorage.getItem("shapes")) || [];

		if (shapes.length >= 1) {
			shapes = [];
			localStorage.setItem("shapes", JSON.stringify(shapes));
			redraw();
		}
	});
	undoButton.addEventListener("click", function () {
		let shapes = JSON.parse(localStorage.getItem("shapes")) || [];

		if (shapes.length >= 1) {
			shapes.pop();
			localStorage.setItem("shapes", JSON.stringify(shapes));
			redraw();
		}
	});

	/**
	 * Redraws all shapes from local storage onto the canvas.
	 * - Retrieves shapes array from localStorage.
	 * - Clears the canvas.
	 * - Iterates through each shape object and draws accordingly.
	 */
	function redraw() {
		let shapes = JSON.parse(localStorage.getItem("shapes")) || [];
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let shape of shapes) {
			switch (shape.type) {
				case "rectangle":
					let rectangle = new Rectangle(
						shape.x,
						shape.y,
						shape.width,
						shape.height,
						shape.color
					);
					rectangle.draw(ctx);
					break;
				case "circle":
					let circle = new Circle(shape.x, shape.y, shape.radius, shape.color);
					circle.draw(ctx);
					break;
				case "triangle":
					let triangle = new Circle(
						shape.x1,
						shape.y1,
						shape.x2,
						shape.y2,
						shape.x3,
						shape.y3,
						shape.color
					);
					triangle.draw(ctx);
					break;
			}
		}
	}

	/** @type {HTMLCanvasElement} */
	let c = document.getElementById("canvas");
	let ctx = c.getContext("2d");

	/**
	 * Represents a rectangle shape.
	 * @constructor
	 * @param {number} positionX - The x-coordinate position of the rectangle.
	 * @param {number} positionY - The y-coordinate position of the rectangle.
	 * @param {number} width - The width of the rectangle.
	 * @param {number} height - The height of the rectangle.
	 * @param {string} color - The color used to fill the rectangle.
	 */
	class Rectangle {
		constructor(positionX, positionY, width, height, color) {
			this.positionX = parseInt(positionX);
			this.positionY = parseInt(positionY);
			this.width = parseInt(width);
			this.height = parseInt(height);
			this.color = color;
		}
		/**
		 * Draws the rectangle on the given canvas context.
		 * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
		 */
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

	/**
	 * Represents a circle shape.
	 * @constructor
	 * @param {number} positionX - The x-coordinate position of the circle center.
	 * @param {number} positionY - The y-coordinate position of the circle center.
	 * @param {number} radius - The radius of the circle.
	 * @param {string} color - The color used to fill the circle.
	 */
	class Circle {
		constructor(positionX, positionY, radius, color) {
			this.positionX = parseInt(positionX);
			this.positionY = parseInt(positionY);
			this.radius = parseInt(radius);
			this.color = color;
		}
		/**
		 * Draws the circle on the given canvas context.
		 * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
		 */
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

	/**
	 * Represents a triangle shape.
	 * @constructor
	 * @param {number} x1 - The x-coordinate of the first vertex.
	 * @param {number} y1 - The y-coordinate of the first vertex.
	 * @param {number} x2 - The x-coordinate of the second vertex.
	 * @param {number} y2 - The y-coordinate of the second vertex.
	 * @param {number} x3 - The x-coordinate of the third vertex.
	 * @param {number} y3 - The y-coordinate of the third vertex.
	 * @param {string} color - The color used to fill the triangle.
	 */
	class Triangle {
		constructor(x1, y1, x2, y2, x3, y3, color) {
			this.x1 = parseInt(x1);
			this.y1 = parseInt(y1);
			this.x2 = parseInt(x2);
			this.y2 = parseInt(y2);
			this.x3 = parseInt(x3);
			this.y3 = parseInt(y3);
			this.color = color;
		}
		/**
		 * Draws the triangle on the given canvas context.
		 * @param {CanvasRenderingContext2D} ctx - The context of the canvas.
		 */
		draw(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.x1, this.y1);
			ctx.lineTo(this.x2, this.y2);
			ctx.lineTo(this.x3, this.y3);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

	triangleForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const x1 = document.getElementById("x1").value;
		const y1 = document.getElementById("y1").value;
		const x2 = document.getElementById("x2").value;
		const y2 = document.getElementById("y2").value;
		const x3 = document.getElementById("x3").value;
		const y3 = document.getElementById("y3").value;
		const colorT = document.getElementById("colorT").value;

		console.log("Triangle:", x1, y1, x2, y2, x3, y3, colorT);

		let shapes = JSON.parse(localStorage.getItem("shapes")) || [];

		const newTriangle = {
			type: "triangle",
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
			x3: x3,
			y3: y3,
			color: colorT,
		};

		shapes.push(newTriangle);
		localStorage.setItem("shapes", JSON.stringify(shapes));

		let lastShape = shapes[shapes.length - 1];
		let triangle1 = new Triangle(
			lastShape.x1,
			lastShape.y1,
			lastShape.x2,
			lastShape.y2,
			lastShape.x3,
			lastShape.y3,
			lastShape.color
		);

		triangle1.draw(ctx);
	});

	//Code to execute on load:
	redraw();
	circleForm.style.display = "none";
	triangleForm.style.display = "none";
});
