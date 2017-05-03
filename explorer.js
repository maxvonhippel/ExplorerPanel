var canvas = document.createElement("canvas");
// add the canvas
canvas.setAttribute("id", "cid");
var context = canvas.getContext('2d');

// name with hashtag to find div of a layer
function layer_name(name) {
	return '#'.concat(name);
}

// type name of a javascript obj for debugging
var toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

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
	var _name = layer_name(element.id);

	console.log("assigning callback: " + element.id);

	$(_name).on(event_name, function(event) {

			// Get click coordinates
			var x = event.pageX - this.offsetLeft,
				y = event.pageY - this.offsetTop,
				w = context.canvas.width = this.width,
				h = context.canvas.height = this.height,
				rgba,
				alpha;

			// Draw image to canvas
			// and read Alpha channel value

			context.drawImage(this, 0, 0, w, h);
			rgba = context.getImageData(x, y, 1, 1);
			console.log("x: " + x + " y: " + y + " w: " + w + " h: " + h + " rgba: " + rgba);
			alpha = rgba.data[3]; // [0]R [1]G [2]B [3]A

			console.log(alpha);

			// If pixel is transparent,
			// retrieve the element underneath and trigger it's click event
			if( alpha === 0 ) {

				$(this).hide();
				$(document.elementFromPoint(event.clientX, event.clientY)).trigger('explore');
				$(this).show();

			} else {
				console.log("CLICKED: " + this.id);
			}

		});

}

function assign_callback(element, index, array) {

	element.onload = function() {

		try {

			// try to assign callback
			assign_callback_for_event(element, 'explore');


		} catch (err) {

			console.log("error while trying to assign callback: " + err);

		}

	}

}

// now foreach layer below the topmost, assign_callback with custom callback name
images.forEach(assign_callback);

// now add hover callback for the topmost layer
var topmost_layer = images[images.length - 1];
var topmost_layer_name = layer_name(topmost_layer.id);
console.log('topmost layer name:' + topmost_layer_name);
$(topmost_layer_name).on("mouseover", function(event) {
	$(topmost_layer_name).trigger('explore');
});