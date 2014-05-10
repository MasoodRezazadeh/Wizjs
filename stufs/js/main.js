$(document).ready(function() {
	window.guestName = "NoName!";
	$(document).on('keyup','#guestNameInput', function(event) {
		event.preventDefault();
		/* Act on the event */
		window.guestName = this.value.toString();
	});
});