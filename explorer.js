var canvas = document.createElement("canvas");
// add the canvas
canvas.setAttribute("id", "cid");
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

// declare layers on canvas
var layer_1 = new Image();  // declare globally

// handle image draw on canvas
layer_1.onload = function() {
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
};

layer_1.src = 'photos/layer_1_demo.png';

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStuff();

}

// code from: http://stackoverflow.com/a/23105310/1586231
function drawStuff() {

	var hRatio = canvas.width  / layer_1.width;
	var vRatio =  canvas.height / layer_1.height;
	var ratio  = Math.min (hRatio, vRatio);
	var centerShift_x = (canvas.width - layer_1.width*ratio) / 2;
	var centerShift_y = (canvas.height - layer_1.height*ratio) / 2;
	context.drawImage(layer_1, 0, 0, layer_1.width, layer_1.height,
                      centerShift_x, centerShift_y, layer_1.width*ratio, layer_1.height*ratio);
}

// handle the clicks
// code from http://stackoverflow.com/a/38488246/1586231
$('#layer_1').on("mousedown", function(event) {

	// Get click coordinates
	var x = event.pageX - this.offsetLeft,
		y = event.pageY - this.offsetTop,
		w = context.canvas.width = this.width,
		h = context.canvas.height = this.height,
		alpha;

	// Draw image to canvas
	// and read Alpha channel value

	context.drawImage(this, 0, 0, w, h);
	alpha = context.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

	console.log(alpha);

	// If pixel is transparent,
	// retrieve the element underneath and trigger it's click event
	if( alpha === 0 ) {
		$(this).hide();
		$(document.elementFromPoint(event.clientX, event.clientY)).trigger("click");
		$(this).show();

	} else {
		console.log("LOGO clicked!");
	}
});