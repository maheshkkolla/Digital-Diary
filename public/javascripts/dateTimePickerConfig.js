$(function() {
    $('#datetimepicker12').datetimepicker({
        inline: true,
        maxDate: new Date(),
        defaultDate: new Date(),
        sideBySide: true
    }).bind('dp.change', function (e) {
    	var date = new Date(e.date);
    	setDateTimeToShowCalendar(date);
    	$('#dateTime').val(date.toString());
    });
    $('#dateTime').val(new Date().toString());
});
