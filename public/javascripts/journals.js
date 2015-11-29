$(function() {
	$('.bootstrap-datetimepicker-widget .timepicker').remove();
	$('.dateTime .panel-footer b').html("");

	$('#dateTime').on('change', function(){
		var date = $('#dateTime').val();
		$.ajax({
        	url: '/journals/getList?date='+date,
        	type: 'GET'
    	}).done(function (journals) {
        	$('#journals').html(journals);
    	});
	});
});
