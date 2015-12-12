$(function() {
	$('.bootstrap-datetimepicker-widget .timepicker').remove();
	$('.dateTime .panel-footer b').remove();

	$('#dateTime').on('change', function(){
		$('#journals').html("");
		getJournalsCount();
		getJournals(1);
	});
});

var getJournalsCount = function() {
	var date = $('#dateTime').val();
	$.ajax({
    	url: '/journals/count?date='+date,
    	type: 'GET'
	}).done(function (count) {
		if(count > 0)
    		$('#journalsCount').val(count);
	});
}

var getJournals = function(page) {
	var date = $('#dateTime').val();
	$.ajax({
    	url: '/journals/journal?date='+date+'&page='+page,
    	type: 'GET'
	}).done(function (journals) {
    	$('#journals').append(journals);
    	if($('#journalsCount').val() <= page) return;// loader remove
    	else getJournals(page + 1);
	});
}
