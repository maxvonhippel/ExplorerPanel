// create the canvas
var canvas = document.createElement("canvas");
// add the canvas
canvas.setAttribute("id", "cid");
document.body.appendChild(canvas);
// get the context
var ctx = canvas.getContext("2d");

// handle the clicks
// code from http://stackoverflow.com/a/38488246/1586231
$('#layer_1').on("mousedown", function(event) {
	// Get click coordinates
	var x = event.pageX - this.offsetLeft,
		y = event.pageY - this.offsetTop,
		w = ctx.canvas.width = this.width,
		h = ctx.canvas.height = this.height,
		alpha;

	// Draw image to canvas
	// and read Alpha channel value
	ctx.drawImage(this, 0, 0, w, h);
	alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

	// If pixel is transparent,
	// retrieve the element underneath and trigger it's click event
	if( alpha === 0 ) {
		/*
		 *	If this occurs, we need to try triggering click on the element below this component,
		 *  and continue thus down the stack.
		 */
	} else {
		console.log("LOGO clicked!");
	}
});