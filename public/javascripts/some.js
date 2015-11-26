$(function() {
	tinymce.init({
	    selector: "textarea",
	    plugins: [
	        "advlist autolink lists link image charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime media table contextmenu paste",
	        "textcolor"
	    ],
	    resize: false,
	    height: 500,
	    toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
	});


    $('#datetimepicker12').datetimepicker({
        inline: true,
        maxDate: new Date(),
        defaultDate: new Date(),
        sideBySide: true
    }).bind('dp.change', function (e) {
    	var date = new Date(e.date);
    	setDateTimeToShowCalendar(date);
    });
    setDateTimeToShowCalendar(new Date());
});

var setDateTimeToShowCalendar = function(date) {
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
}