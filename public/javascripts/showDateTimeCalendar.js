var DateTimeCalendar = function(date) {
	this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	this.months = ['January','Febraury','March', 'April','May','June','July','August','September','October','November','December'];

	if(u.isNullOrUndefined(date)) date = new Date();
	this.set(date);
};

DateTimeCalendar.prototype = {
	set: function(date) {
		date = new Date(date);
		var monthAndYear = this.months[date.getMonth()] + " " + date.getFullYear();
		var day = this.days[date.getDay()];
		var onlyDate = date.getDate();
		var time = date.getHours() + " : " + date.getMinutes();

		$('.dateTime .panel-heading').html(monthAndYear);
		$('.dateTime .panel-body div').html(onlyDate);
		$('.dateTime .panel-body b').html(day);
		$('.dateTime .panel-footer b').html(time);
	}
};