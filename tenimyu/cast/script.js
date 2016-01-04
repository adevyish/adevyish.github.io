// get the current scroll position
// code from howtocreate.co.uk
function getScrollXY() {
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

// make sure the top and left header columns scroll with the body
function syncScroll() {
	var pos = getScrollXY();
	document.getElementById('data-top').style.left = '-' + pos[0] + 'px';
	document.getElementById('data-top-year').style.left = '-' + pos[0] + 'px';
	document.getElementById('data-left').style.top = '-' + pos[1] + 'px';
}

// find the absolute position of the given element
// code from quirksmode.org
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

// jump to the item given by the target
function jump() {
	var target = this.id.split('-')[1];
	var pos = findPos(document.getElementById(target));
	window.scroll(pos[0]-344,pos[1]-120);
}

function init() {
	// initialize jumping
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (links[i].className.substr(0,4)) { links[i].onclick = jump; }
	}
}

window.onload = init;
window.onscroll = syncScroll;
