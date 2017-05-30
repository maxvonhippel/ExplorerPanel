// get the head
var head = document.getElementsByTagName('head')[0];

// is this mobile?
var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
console.log("mobile? " + isMobile);
// add the stylesheets
// basic remodal stylesheet
var styles = document.createElement('link');
styles.rel = 'stylesheet';
styles.type = 'text/css';
styles.href = 'Remodal/dist/remodal.css';
// default remodal stylesheet
var def_styles = document.createElement('link');
def_styles.rel = 'stylesheet';
def_styles.type = 'text/css';
def_styles.href = 'Remodal/dist/remodal-default-theme.css';

// add the remodal script js
var rem_script = document.createElement('script');
rem_script.src = "Remodal/dist/remodal.min.js";

// add our custom styles
var further_styles =`
.remodal-overlay {
	opacity: 0;
}
.remodal {
	color: #2b2e38;
	background: rgba(255, 255, 255, 0.85);
	max-width: 55%;
	max-height: 55%;
}
.remodal-bg.remodal-is-opening,
.remodal-bg.remodal-is-opened {
	-webkit-filter: blur(5px);
	filter: blur(5px);
}
.remodal-overlay.remodal-is-opening,
.remodal-overlay.remodal-is-closing {
	-webkit-animation-duration: 0s;
	animation-duration: 0s;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
}
.remodal-overlay.remodal-is-opening {
	-webkit-animation-name: remodal-overlay-opening-keyframes;
	animation-name: remodal-overlay-opening-keyframes;
}
.remodal-overlay.remodal-is-closing {
	-webkit-animation-name: remodal-overlay-closing-keyframes;
	animation-name: remodal-overlay-closing-keyframes;
}
@-webkit-keyframes remodal-overlay-opening-keyframes {
	from {
		opacity: 0;
	}
	to {
		opacity: 0;
	}
}
@keyframes remodal-overlay-opening-keyframes {
	from {
		opacity: 0;
	}
	to {
		opacity: 0;
	}
}
@-webkit-keyframes remodal-overlay-closing-keyframes {
	from {
		opacity: 0;
	}
	to {
		opacity: 0;
	}
}

@keyframes remodal-overlay-closing-keyframes {
	from {
		opacity: 0;
	}
	to {
		opacity: 0;
	}
}
`;
var further_styles_div = document.createElement('style');
further_styles_div.innerHTML = further_styles;

// append all of the above to the head of the html
head.appendChild(styles);
head.appendChild(def_styles);
head.appendChild(rem_script);
head.appendChild(further_styles_div);

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
					"Description of OverloadRelay","Description of SafetySwitch","Description of SoftStarter"];

var zoomed_images = [];

function add_image_to_layers(name, path) {

	var new_layer = document.createElement("img");
    var new_layer_src = path + name + ".png";
    new_layer.setAttribute("src", new_layer_src);
	new_layer.setAttribute("class", "layer");
	new_layer.setAttribute("id", name);
	new_layer.style.position = "absolute";
	new_layer.style.maxHeight = "60%";
	new_layer.style.maxWidth = "60%";
	container.appendChild(new_layer);

}

for (var i = 0; i < layer_names.length; i++) {

    add_image_to_layers(layer_names[i], 'photos/Full/');

}

for (var i = 0; i < layer_names.length; i++) {

    var new_layer_src = "photos/Zoomed/" + layer_names[i] + ".png";
    zoomed_images.push(new_layer_src);
}

var canvas = document.createElement("canvas");
// add the canvas
var context = canvas.getContext('2d');
// for animation
var currently_animated = null;

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

function moveTo(div, dist) {

    left = $(layer_name(div.id)).position().left;
	div.style.left = (left + dist) + 'px';
	div.style.visibility = 'visible';
	if (dist > 0)
		currently_animated = div;
	else currently_animated = null;

}

function assign_callback_for_event(element, event_name) {

	var _name = layer_name(element.id);

	// apply css to make the image position absolute
	$(_name).css('position','absolute');

	// apply the pseudo-mouseover event listener, handler
	$(_name).on(event_name, function(event) {

		var cur_image = which_image(element, event);

		// have we moved to a new animation?
		if (currently_animated !== cur_image && isMobile === false) {
			// undo existing animation
			if (currently_animated !== null) {
				moveTo(currently_animated, -2);
			}

			// undo existing arrows
			arrows = document.getElementsByClassName('annotation');
			for (var i = 0; i < arrows.length; i++) {
				arrows[i].remove();
			}
		}

		// are we currently animating nothing, but should be?
		if (currently_animated == null && cur_image !== null) {

			if (isMobile === false) {
				// animate the new thing
				moveTo(cur_image, 2);
				// make the new arrow
				var arrow = document.createElement("img");
				arrow.setAttribute("src", "photos/Annotations/" + cur_image.id + ".png");
				arrow.setAttribute("id", "annotation" + cur_image.id);
				arrow.style.position = "absolute";
				arrow.style.maxHeight = "60%";
				arrow.style.maxWidth = "60%";
				arrow.setAttribute("class", 'annotation');
				container.appendChild(arrow);

				$(layer_name(arrow.id)).on("mousemove", function(event) {
					if (cur_image !== which_image(element, event)) {
						arrow.remove();
					}
				});

				$(layer_name(arrow.id)).on("mousedown", function(event) {
					arrow.remove();
					cur_image = which_image(images[images.length-1], event);
					show_modal(cur_image.id);
				});

			} else if (isMobile === true) {
				cur_image = which_image(images[images.length-1], event);
				show_modal(cur_image.id);
			}

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
if (isMobile === false) {
	images[images.length-1].onload = function() {
		assign_callback_for_event(images[images.length-1], "mousemove");
	}
} else if (isMobile === true) {
	images[images.length-1].onload = function() {
		assign_callback_for_event(images[images.length-1], "mousedown");
	}
}

// fix problem where border of container doesn't completely wrap around inner images
container.style.clear = 'both';

function show_modal(name) {

	// find existing modals
	modals = document.getElementsByClassName("modal");

	// get metadata
	var index = layer_names.indexOf(name);
	if (index == null)
		return;
	// make the modal
	var modal = document.createElement("div");
	// set the data remodal id
	modal.setAttribute("data-remodal-id", "modal");
	modal.setAttribute("class", "modal");
	// create the x close button
	var close_button = document.createElement("button");
	close_button.setAttribute("data-remodal-action", "close");
	close_button.setAttribute("class", "remodal-close");
	close_button.style.color = 'black';
	// add the x close button to the modal
	modal.appendChild(close_button);
	// set the title of the modal
	var title = document.createElement("h1");
	title.innerHTML = name;
	// add the title to the modal
	modal.appendChild(title);
	// set the description of the modal
	var description = document.createElement("p");
	description.innerHTML = descriptions[index];
	description.setAttribute("id", "modal_description");
	$('#modal_description').css({
		'float': 'right'
	});
	// set an example url for the modal
	var link = document.createElement("a");
	link.setAttribute("href", "https://www.ge.com/?search=" + name.replace(' ', '%20'));
	link.innerHTML = name;
	// add the link to the modal
	description.appendChild(document.createElement("br"));
	description.appendChild(document.createElement("br"));
	description.appendChild(link);
	// add the description to the modal
	modal.appendChild(description);
	// add an image to the modal
	var image = document.createElement("img");
	image.setAttribute("src", zoomed_images[index]);
	image.setAttribute("id", "modal_image");
	modal.appendChild(image);
	image.style.maxWidth = '45%';
	image.style.maxHeight = '45%';
	// clear the modal
	modal.style.clear = 'both';
	// add the modal to the container
	container.appendChild(modal);
	// instantiate the modal
	var inst = $('[data-remodal-id=modal]').remodal();
	// show the modal!
	inst.open();
	// handle close
	$(document).on('closed', '.remodal', function (e) {
		// when we're done, destroy the modal so it can
		// be reconfigured next time for whatever the user
		// clicks on next
		var inst = $('[data-remodal-id=modal]').remodal();
		try {
			inst.destroy();
		} catch (e) {
			// doesn't matter
		}
	});

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