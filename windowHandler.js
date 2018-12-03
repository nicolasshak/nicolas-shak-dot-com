var explorer = [
	'<div class="main-wrapper">',
		'<div id="browser" class="browser">',
			'<div class="browser-header">',
				'Browser',
			'</div>',
			'<div class="browser-body">',
				'<table class="files">',
				'</table>',
			'</div>',
		'</div>',
	'</div>',
].join('\n');

var window1 = [
	'<div class="window-generic">',
		'<div class="window-header">',
			'window',
		'</div>',
		'<div class="window-contents">',
].join('\n');

var window2 = '</div>';

function main() {
	$('.windows').append(explorer);
	$('.browser').draggable({
		handle: 'div.browser-header',
	})
}

function closeWindow() {

}

function createWindow(contents) {
	
	var newWindow = window1 + contents + window2;

	$('.windows').append(newWindow);
	$('.window-generic').draggable({
		handle: 'div.window-header'
	});
}

function createFormattedWindow(contents) {
	createWindow('<pre>' + contents + '</pre>');
}

function makeDraggable(element) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
}

function escape(code) {

	var escaped = code.replace(/"/g, '&quot;');
	escaped = escaped.replace(/'/g, '&quot;');
	escaped = escaped.replace(/&/g, '&amp;');
	escaped = escaped.replace(/</g, '&lt;');
	escaped = escaped.replace(/>/g, '&gt;');

	return escaped;
}

main();