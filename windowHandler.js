/*
 * Get templates
 */
var browser_text;
var window_text;

jQuery.ajax({
	url: '/get?path=browser.html',
	async: false,
	success: function(result) {
		browser_text = result;
	}
});

jQuery.ajax({
	url: '/get?path=window.html',
	async: false,
	success: function(result) {
		window_text = result;
	}
});

/*
 * Startup
 */
function main() {
	addWindow(browser_text, "C:/Home", "");
}

/*
 * Window Handlers
 */

function closeWindow(element) {
	$(element).parent().parent().remove();
}

function addFormattedWindow(title, contents) {
	addWindow(window_text, title, '<pre class="window-contents">' + escape(contents) + '</pre>');
}

function addWindow(template, title, contents) {
	
	var newWindow = template.replace(/{{title}}/g, title);
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

	bringFront($('.window'), '.window');
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