function WindowHandler() {
	this.windows = [];

	this.addWindow = function(html) {

	}

	this.closeWindow = function(element) {

	}

	this.bringFront = function(elem, stack) {

	}
}

function WindowBuilder() {

	this.html = "";

	this.setHeader = function(html) {

	}

	this.addContents = function(html) {

	}
}

function escape(text) {
	var escaped = code;
	escaped = escaped.replace(/&/g, '&amp;');
	escaped = escaped.replace(/</g, '&lt;');
	escaped = escaped.replace(/>/g, '&gt;');

	return escaped;
}