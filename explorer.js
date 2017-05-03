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
// images[0] is bottom of stack of images, last image is frontmost layer

function assign_callback_for_event(element, event_name) {

	// code from http://stackoverflow.com/a/38488246/1586231
	var layer_name = '#'.concat(element.id);
	$(layer_name).on(event_name, function(event) {

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
				$(document.elementFromPoint(event.clientX, event.clientY)).trigger('explore');
				$(this).show();

			} else {
				console.log("CLICKED: " + element.id);
			}

		});

}

function assign_callback(element, index, array) {

	try {

		// try to assign callback
		assign_callback_for_event(element, 'explore');


	} catch (err) {

		console.log("error while trying to assign callback: " + err);

	}
}

// now foreach layer below the topmost, assign_callback with custom callback name
images.forEach(assign_callback);

// now add hover callback for the topmost layer
var topmost_layer = images[images.length - 1];
assign_callback_for_event(topmost_layer, 'mouseover');