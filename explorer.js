// add the images
var explorer = document.getElementById("explorer");
var cvs = document.createElement('canvas');
// find the canvas context
var ctx = document.getElementById('canvas').getContext('2d');

// first image
var img1 = new Image();
img1.onload = function() {
    ctx.drawImage(img,0,0);
};
img1.src = "photos/layer_1_demo.png";

var isTransparentUnderMouse = function (target, evnt) {
    var l = 0, t = 0;
    if (target.offsetParent) {
        var ele = target;
        do {
            l += ele.offsetLeft;
            t += ele.offsetTop;
        } while (ele = ele.offsetParent);
    }
    var x = evnt.page.x - l;
    var y = evnt.page.y - t;
    var imgdata = target.getContext('2d').getImageData(x, y, 1, 1).data;
    if (
        imgdata[0] == 0 &&
        imgdata[1] == 0 &&
        imgdata[2] == 0 &&
        imgdata[3] == 0
    ){
        return true;
    }
    return false;
};
/*
img1.class = "imgA1";
img1.src = "photos/layer_1_demo.png";
img1.style.maxHeight = "50%";
img1.style.maxWidth = "50%";
explorer.appendChild(img1);

// second image
var img2 = new Image();
img2.class = "imgA2";
img2.src = "photos/layer_2_demo.png";
img2.style.maxHeight = "50%";
img2.style.maxWidth = "50%";
explorer.appendChild(img2);

// log boxes
// see this: http://stackoverflow.com/questions/11228987/image-map-by-alpha-channel

img2.onmouseover = function(event) {
	console.log("over");
};

img1.onmouseover = function() {
	console.log("over");
};*/
