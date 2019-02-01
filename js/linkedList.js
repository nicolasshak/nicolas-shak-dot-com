/*
 *	Doubly linked list:
 */

function Node(next, last, data) {

	this.next = next;
	this.last = last;
	this.data = data;
}

function LinkedList() {

	this.head = null;
	this.current = null;

	this.forward = function() {
		if(this.current != null && this.current.next != null) {
			this.current = this.current.next;
		}
	};

	this.back = function() {
		if(this.current != null && this.current.last != null) {
			this.current = this.current.last;
		}
	};

	/*
	 * Treats the list like a stack and pushes new data onto the top, dropping the lister after current
	 */
	this.setNext = function(data) {

		var newNode = new Node(null, null, data);

		if(this.head == null) {
			this.head = newNode;
			this.current = this.head;
			return;
		}
		else {
			if(this.current.next != null) {
				this.current.next.last = null;
			}
			newNode.last = this.current;
			this.current.next = newNode;
			this.current = newNode;
		}
	};
}