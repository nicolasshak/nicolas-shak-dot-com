/*
 * Templates
 */
var browser_text = [
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
	'<div class="window window-generic" style="z-index: 9999">',
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

/*
 * Startup
 */
function main() {
	addWindow(browser_text, "");

	
}

/*
 * Window Handlers
 */

function closeWindow(element) {
	$(element).parent().parent().remove();
}

function addFormattedWindow(contents) {
	addWindow(window_text, '<pre class="window-contents">' + escape(contents) + '</pre>');
}


function addWindow(template, contents) {
	
	var newWindow = template.replace(/{{title}}/g, 'window');
	newWindow = newWindow.replace(/{{content}}/g, contents)

	$('.windows').append(newWindow);

	$('.window').draggable({
		handle: 'div.window-header',
		stack: '.window'
	});

	$('.window').resizable({
		minHeight: 84,
		minWidth: 168
	});

	$('.window').on('click', function() {
		bringFront($(this), '.window');
	});
}

/*
 * Helper functions
 */
function escape(code) {

	var escaped = code;
	escaped = escaped.replace(/&/g, '&amp;');
	escaped = escaped.replace(/</g, '&lt;');
	escaped = escaped.replace(/>/g, '&gt;');

	return escaped;
}

function bringFront(elem, stack){

	var min, group = $(stack).sort(function(a, b) {
		return ((parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0))
	});
	
	if(group.length < 1) return;

	min = parseInt(group[0].style.zIndex, 10) || 0;
	$(group).each(function(i) {
		this.style.zIndex = min + i;
	});
	
	if(elem == undefined) return;
	$(elem).css('zIndex', min + group.length);
}

main();