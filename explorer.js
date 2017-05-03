var canvas = document.createElement("canvas");
// add the canvas
canvas.setAttribute("id", "cid");
var context = canvas.getContext('2d');

// function to change list of divs into array
function toArray(a) {
	var result = [];
	var i = a.length;
	while (i--) {
		result[i] = a[i];
	}
	return result;
}

// find all layers in our diagram
var container = document.getElementById("container");
var images = toArray(container.getElementsByClassName("layer"));
console.log(images);

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
		$(document.elementFromPoint(event.clientX, event.clientY)).trigger("mousedown");
		$(this).show();

	} else {
		console.log("LOGO clicked!");
	}
});

$('#layer_2').on("mousedown", function(event) {
	console.log("LAYER 2 CLICKED!");
});