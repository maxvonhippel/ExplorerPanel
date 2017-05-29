// find the explorer div
var explorer = document.getElementById("explorer");
// create a container for the graphics components
var container = document.createElement("div");
// set the id of the graphics container
container.setAttribute("id", "container");
// create a container for the dialog components
var dialog_container = document.createElement("div");
// set the id for the dialog container
dialog_container.setAttribute("id", "dialog_container");
// set the dialog title
var dialog_title = document.createElement("p");
dialog_title.setAttribute("title", "dialog title");
dialog_title.innerHTML = "Component Explorer";
// set the dialog description
var dialog_description = document.createElement("p");
dialog_description.innerHTML = "Mouse over the components and this text should update.";
// set the dialog image
var dialog_image = document.createElement("img");
dialog_image.setAttribute("src", "//:0");
dialog_image.style.position = "absolute";
dialog_image.style.maxHeight = "40%";
dialog_image.style.maxWidth = "40%";
// append the description, title, & image to the dialog container
dialog_container.appendChild(dialog_title);
dialog_container.appendChild(dialog_description);
dialog_container.appendChild(dialog_image);
// append the dialog container and graphics containers to the explorer
explorer.appendChild(dialog_container);
explorer.appendChild(container);

// set the graphics container style sheet
container.style.border = '1px solid #000';
container.style.width = '60%';
container.style.height = '60vw';
container.style.display = 'block';
container.style.margin = 'auto';

// set the dialog container style sheet
dialog_container.style.border = '1px solid #000';
dialog_container.style.width = '60%';
dialog_container.style.height = '20vw';
dialog_container.style.display = 'block';
dialog_container.style.margin = 'auto';

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

function assign_callback_for_event(element, event_name) {

	var _name = layer_name(element.id);

	// apply css to make the image position absolute
	$(_name).css('position','absolute');

	// apply the pseudo-mouseover event listener, handler
	$(_name).on(event_name, function(event) {

		var cur_image = which_image(element, event);
		if (cur_image == null) {
			//text.nodeValue = "Mouse over the components and this text should update.";
			// TODO: ANIMATE
		} else {
			//text.nodeValue = cur_image.id;
			// TODO: DE-ANIMATE
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
	var description = descriptions[index];

	dialog_title.innerHTML = name;
	dialog_description.innerHTML = description;
	dialog_image.setAttribute("src", images[index].src);

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