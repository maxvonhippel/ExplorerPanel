// find the container for the interactive
var container = document.getElementById("container");

// set the container style sheet
container.style.border = '1px solid #000';
container.style.width = '60%';
container.style.height = '60vw';
container.style.display = 'block';
container.style.margin = 'auto';

// add the images - hardcoded for now, but will be made dynamic later
// (using some sort of database or internal data file, such as csv or json)
var layer_names = ["MainCabinet","AF600","Buttons","C2000Relay",
					"Contractor","MCB","MCCB","MotorStarter",
					"OverloadRelay","SafetySwitch","SoftStarter"];

var descriptions = ["Description of MainCabinet","Description of AF600","Description of Buttons","Description of C2000Relay",
					"Description of Contractor","Description of MCB","Description of MCCB","Description of MotorStarter",
					"Description of OverloadRelay","Description of SafetySwitch","Description of SoftStarter"]

for (var i = 0; i < layer_names.length; i++) {

    var new_layer = document.createElement("img");
    var new_layer_src = "photos/" + layer_names[i] + ".png";
    new_layer.setAttribute("src", new_layer_src);
	new_layer.setAttribute("class", "layer");
	new_layer.setAttribute("id", layer_names[i]);

	new_layer.style.position = "absolute";
	new_layer.style.maxHeight = "60%";
	new_layer.style.maxWidth = "60%";

	container.appendChild(new_layer);
}

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

// add some text for demo
var text = document.createTextNode('Mouse over the components and this text should update.');
container.appendChild(text);

function assign_callback_for_event(element, event_name) {

	var _name = layer_name(element.id);

	// apply css to make the image position absolute
	$(_name).css('position','absolute');

	// apply the pseudo-mouseover event listener, handler
	$(_name).on(event_name, function(event) {

		var cur_image = which_image(element, event);
		if (cur_image == null) {
			text.nodeValue = "Mouse over the components and this text should update.";
		} else {
			text.nodeValue = cur_image.id;
		}

	});

}

function assign_callback(element, index, array) {

	element.onload = function() {
		try {
			// try to assign callback
			assign_callback_for_event(element, "mousedown");
		} catch (err) {
			console.log("error while trying to assign callback: " + err);
		}
	}
}

var images = toArray(container.getElementsByClassName("layer"));
images.forEach(assign_callback);
assign_callback_for_event(images[images.length-1], "mousemove");

// fix problem where border of container doesn't completely wrap around inner images
container.style.clear = 'both';

function show_modal(name) {

	// get metadata
	var index = layer_names.indexOf(name);
	if (index == null)
		return;
	var image = images[index];
	// make the modal
	var modal = document.createElement("div");
	modal.setAttribute("data-remodal-id", "modal");
	var close_button = document.createElement("button");
	close_button.setAttribute("data-removal-action", "close");
	close_button.setAttribute("class", "remodal-close");
	modal.appendChild(close_button);
	var title = document.createElement("h1");
	title.innerHTML = name;
	modal.appendChild(title);
	var description = document.createElement("p");
	description.innerHTML = descriptions[index];
	modal.appendChild(description);
	container.appendChild(modal);
	var inst = $('[data-remodal-id=modal]').remodal();
	$(document).on('closed', '.remodal', function (e) {
		inst.destroy();
	});
	inst.open();

}

function which_image(element, event) {

	// Get click coordinates
	var x = event.pageX - element.offsetLeft,
		y = event.pageY - element.offsetTop,
		w = context.canvas.width = element.width,
		h = context.canvas.height = element.height,
		alpha;
	// Draw image to canvas
	// and read Alpha channel value
	context.drawImage(element, 0, 0, w, h);
	alpha = context.getImageData(x, y, 1, 1).data[3];
	if (alpha !== 0) {
		return element;
	} else {
		index = layer_names.indexOf(element.id);
		if (index === 0) {
			return element;
		} else if (index > 0) {
			return which_image(images[index - 1], event);
		}
	}
	return null;

}

$(layer_name(images[images.length-1].id)).on("mousedown", function(event) {
	cur_image = which_image(images[images.length-1], event);
	show_modal(cur_image.id);
});