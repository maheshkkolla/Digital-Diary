$(function() {
    $('#datetimepicker1').datetimepicker({
        maxDate: new Date(),
        defaultDate: new Date(),
        sideBySide: true
    }).bind('dp.change', function (e) {
    	var date = new Date(e.date);
    	$('#dateTime').val(date.toString()).trigger('change');
    });
    $('#dateTime').val(new Date().toString())

    $('.bootstrap-datetimepicker-widget .datepicker').addClass('dashedBorder');
    $('.bootstrap-datetimepicker-widget .timepicker').addClass('dashedBorder');
});
