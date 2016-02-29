var setDateTimeToShowCalendar = function(date) {
	var date = new Date(date);
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var months = ['January','Febraury','March', 'April','May','June','July','August','September','October','November','December'];
	var monthAndYear = months[date.getMonth()] + " " + date.getFullYear();
	var day = days[date.getDay()];
	var onlyDate = date.getDate();
	var time = date.getHours() + " : " + date.getMinutes();

	$('.dateTime .panel-heading').html(monthAndYear);
	$('.dateTime .panel-body div').html(onlyDate);
	$('.dateTime .panel-body b').html(day);
	$('.dateTime .panel-footer b').html(time);
};

$(function() {
    setDateTimeToShowCalendar(new Date());
});