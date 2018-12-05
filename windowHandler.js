var explorer_text = [
	'<div class="window browser">',
		'<div class="window-header">',
			'<div class="window-title">',
				'Browser',
			'</div>',
		'</div>',
		'<div class="window-contents">',
			'<table class="files">',
			'</table>',
		'</div>',
	'</div>',
].join('\n');

var window_text = [
	'<div class="window window-generic">',
		'<div class="window-header">',
			'<div class="window-title">',
				'{{title}}',
			'</div>',
			'<button type="button" onclick="closeWindow(this)" class="window-close">',
				'X',
			'</button>',
		'</div>',

			'{{content}}',

	'</div>'
].join('\n');

function main() {
	$('.windows').append(explorer_text);
	$('.browser').draggable({
		handle: 'div.window-header',
	});
	$('.browser').resizable({
		minHeight: 84,
		minWidth: 168
	});
}

function closeWindow(element) {
	$(element).parent().parent().remove();
}

function createWindow(contents) {
	
	var newWindow = window_text.replace(/{{title}}/g, 'window');
	newWindow = newWindow.replace(/{{content}}/g, contents)

	$('.windows').append(newWindow);
	$('.window-generic').draggable({
		handle: 'div.window-header'
	});
	$('.window-generic').resizable({
		minHeight: 84,
		minWidth: 168
	});
}

function createFormattedWindow(contents) {
	createWindow('<pre class="window-contents">' + contents + '</pre>');
}

function makeDraggable(element) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
}

function escape(code) {

	var escaped = code;
	//escaped = code.replace(/'/g, '&quot;');
	//escaped = escaped.replace(/"/g, '&quot;');
	escaped = escaped.replace(/&/g, '&amp;');
	escaped = escaped.replace(/</g, '&lt;');
	escaped = escaped.replace(/>/g, '&gt;');

	return escaped;
}

main();