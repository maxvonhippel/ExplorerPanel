// add the images
var explorer = document.getElementById("explorer");
var cvs = document.createElement('canvas');

// first image
var img1 = document.createElement("img");
img1.class = "imgA1";
img1.src = "photos/layer_1_demo.png";
img1.style.maxHeight = "50%";
img1.style.maxWidth = "50%";
explorer.appendChild(img1);

// second image
var img2 = document.createElement("img");
img2.class = "imgA2";
img2.src = "photos/layer_2_demo.png";
img2.style.maxHeight = "50%";
img2.style.maxWidth = "50%";
explorer.appendChild(img2);

// log boxes
img2.onmouseover = function(event) {
	console.log("over");
};

img1.onmouseover = function() {
	console.log("over");
};
