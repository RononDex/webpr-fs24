const frictionFactor = 0.9995;
const bounceFrictionFactor = 0.9;
const radius = 10;
const frameRate = 150;
const ball = { x: 20, y: 0, dx: 20, dy: 1 };
let boundaries = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
let old = { x: ball.x, y: ball.y };

function start() {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	context.fillStyle = "black";

	boundaries.minX = 0;
	boundaries.minY = 0;
	boundaries.maxX = canvas.getBoundingClientRect().width;
	boundaries.maxY = canvas.getBoundingClientRect().height;

	setInterval(() => {
		nextBoard();
		display(context);
	}, 1000 / frameRate);
}

function nextBoard() {
	dt = 1000 / frameRate;
	// keep old ball values for the sake of efficient clearing of the old display
	old.x = ball.x;
	old.y = ball.y;

	// handle ball is hitting the bounds
	//   reverse direction
	//   lose some energy relative to the current inertia (only velocity varies)
	if (ball.x + radius > boundaries.maxX) {
		ball.x = boundaries.maxY - radius;
		ball.dx = -Math.abs(ball.dx) * bounceFrictionFactor;
	}
	else if (ball.x - radius < boundaries.minX) {
		ball.x = radius;
		ball.dx = Math.abs(ball.dx) * bounceFrictionFactor;
	}
	if (ball.y + radius > boundaries.maxY) {
		ball.y = boundaries.maxY - radius;
		ball.dy = -Math.abs(ball.dy) * bounceFrictionFactor;
	}

	// calculate new position
	// calculate any changes in velocity due to gravitational pull or medium resistance
	ball.dy += 1;
	ball.dx *= frictionFactor;
	ball.dy *= frictionFactor;
	ball.x += ball.dx * dt / 200;
	ball.y += ball.dy * dt / 200;
}

function display(context) {
	context.clearRect(
		old.x - radius - 1,
		old.y - radius - 1,
		2 * radius + 2,
		2 * radius + 2);
	fillBox(context)
}

function fillBox(context) {
	context.beginPath();
	context.arc(ball.x, ball.y, radius, 0, 6.3, false);
	context.fill();
}

start();
