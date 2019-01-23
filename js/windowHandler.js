var explorer_text = [
	'<div class="window browser">',
		'<div class="browser-header">',
			'Browser',
		'</div>',
		'<div class="browser-body">',
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
		'<div class="window-contents">',
			'{{content}}',
		'</div>',
	'</div>'
].join('\n');

function main() {
	$('.windows').append(explorer_text);
	$('.browser').draggable({
		handle: 'div.browser-header',
	})
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
}

function createFormattedWindow(contents) {
	createWindow('<pre>' + contents + '</pre>');
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