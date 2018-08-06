function createCORSRequest(method, url) {

	var req = new XMLHttpRequest();
	if('withCredentials' in req) {
		req.open(method, url, true);
	}
	else if (typeof XDomainRequest != 'undefined') {
		req = new XDomainRequest();
		req.open(method, url);
	}
	else {
		req = null;
	}
	return req;
}

function clearContent(elementID) {
	document.getElementById(elementID).innerHTML = "";
}

function setContent(elementID, html) {
	document.getElementById(elementID).innerHTML = html;
}

function buildHTML(tag, attrs, html) {

	var h = '<' + tag;
	for(attr in attrs) {
		h += ' ' + attr + '="' + attrs[attr] + '"';
	} 
	return h + '>' + html + '</' + tag + '>';
}

function buildFile(name, date, size, filetype) {
	return ''
}

function buildFolder(name, date, contents) {
	return ''
}


window.onload = function() {

	http = new XMLHttpRequest();
	url = 'http://ec2-18-206-255-255.compute-1.amazonaws.com/test:3000';
	http.open('GET', url, true);
	http.send();

	var html = 'This is wrong';
	http.onreadystatechange=(e)=> {
		html = http.responseText;
	}

	console.log(html);
}