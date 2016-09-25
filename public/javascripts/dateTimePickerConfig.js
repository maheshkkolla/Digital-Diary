var DateTimePicker = function(date) {
    this.element = $('#datetimepicker1').datetimepicker({
        maxDate: new Date(),
        defaultDate: new Date(date),
        sideBySide: true
    });
};

DateTimePicker.prototype = {
    bindChange: function(callback) {
        this.element.bind('dp.change', callback);
    }
};