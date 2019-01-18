/*
 * Get templates
 */
var browser_text = '';
var window_text = '';

jQuery.ajax({
	url: '/get?path=/browser.html',
	async: false,
	success: function(result) {
		browser_text = result;
	}
});

jQuery.ajax({
	url: '/get?path=/window.html',
	async: false,
	success: function(result) {
		window_text = result;
	}
});

var windowHandler = {

	windows: [],

	addWindow: function(html) {
		$('.windows').append(html);

		var newWindow = $('.window').last();

		newWindow.draggable({
			handle: 'div.window-header',
			stack: '.window'
		});

		newWindow.resizable({
			minHeight: 84,
			minWidth: 168
		});

		newWindow.on('click', function() {
			bringFront($(this), '.window');
		});
	},

	closeWindow: function(element) {
		$(element).parent().parent().remove();
	}
}

bringFront = function(elem, stack) {
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

function buildWindow(template, title, content) {
	return template.replace(/{{title}}/g, title).replace(/{{content}}/g, content);
}

function escape(text) {
	var escaped = code;
	escaped = escaped.replace(/&/g, '&amp;');
	escaped = escaped.replace(/</g, '&lt;');
	escaped = escaped.replace(/>/g, '&gt;');

	return escaped;
}