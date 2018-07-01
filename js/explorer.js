var categories = document.getElementsByClassName("collapse");
console.log(categories);
var i;

for(i = 0; i < categories.length; i++) {
	console.log(categories);
	categories[i].addEventListener("click", function() {
		var collapsable = this.parentElement.parentElement.nextElementSibling;
		if(collapsable.style.maxHeight) {
			collapsable.style.maxHeight = null;
		}
		else {
			collapsable.style.maxHeight = collapsable.scrollHeight + "px";
		}
	});
}