//$(function() {
//    $('#datetimepicker1').datetimepicker({
//        maxDate: new Date(),
//        defaultDate: new Date(),
//        sideBySide: true
//    }).bind('dp.change', function (e) {
//    	var date = new Date(e.date);
//    	$('#dateTime').val(date.toString()).trigger('change');
//    });
//    $('#dateTime').val(new Date().toString());
//
//
//});
var DateTimePicker = function(date) {
    this.element = $('#datetimepicker1').datetimepicker({
        maxDate: new Date(),
        defaultDate: new Date(date),
        sideBySide: true
    })
};

DateTimePicker.prototype = {
    bindChange: function(callback) {
        this.element.bind('dp.change', callback);
    }
};