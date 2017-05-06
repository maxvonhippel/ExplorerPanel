var canvas = document.createElement("canvas");
// add the canvas
var context = canvas.getContext('2d');
var currently_drawn = '';

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
var images = new Map();
function assign_callback_for_event(element, event_name) {

	// code from http://stackoverflow.com/a/38488246/1586231
	var _name = layer_name(element.id);

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
			if (currently_drawn != this.id) {
				context.drawImage(this, 0, 0, w, h);
				currently_drawn = this.id;
				console.log("drawing new image for layer: ", currently_drawn);
			}
			alpha = context.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A
			console.log(x, y, w, h, "alpha: " + alpha, this.id);
			// If pixel is transparent,
			// retrieve the element underneath and trigger it's click event
			if( alpha === 0 ) {

				// maybe worth attempting in the future: http://stackoverflow.com/a/13426070/1586231
				var cur_index = images.prototype.keys().indexOf(this.id);
				console.log("cur_index: ", cur_index);
				if (cur_index > 0) {
					cur_index--;
					var next_layer_id = images.prototype.keys()[cur_index];
					console.log("next_layer_id: ", next_layer_id);
					var next_layer = images.get(next_layer_id);
					var e = new jQuery.Event("mousedown");
					console.log("triggering: ", event.pageX, event.pageY);
					e.pageX = event.pageX;
					e.pageY = event.pageY;
					$(layer_name(next_layer.id)).trigger(e);
				}

			} else {
				console.log("CLICKED: " + this.id);
			}

		});

}

function assign_callback(element, index, array) {

	if (index != 0) {
		element.onload = function() {
			try {
				// try to assign callback
				assign_callback_for_event(element, "mousedown");
			} catch (err) {
				console.log("error while trying to assign callback: " + err);
			}
		}
	}
}

function image_assign(element, index, array) {
	console.log(element.id, index);
	images.set([element.id], element);
	assign_callback(element, index, array);
}

var images_array = toArray(container.getElementsByClassName("layer"));
images_array.forEach(image_assign);

assign_callback_for_event(images.get('layer_1'), "mousemove");