function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
}
function draw() {
	background(150)
	textAlign(CENTER, CENTER)
	textSize(48)
	fill(255)
	stroke(0)
	text(`Frame count ${frameCount}`, 0, 0, width, height)
}
