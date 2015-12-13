$(function() {
	$('.bootstrap-datetimepicker-widget .timepicker').remove();
	$('.dateTime .panel-footer b').remove();

	$('#dateTime').on('change', function(){
		$('#journals').html("");
		$('#loader').show();
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
    	if($('#journalsCount').val() <= page){
    		$('#loader').hide();
    		addActions();
    	}
    	else getJournals(page + 1);
	});
}

var addActions = function() {
   var elements = $("[name='delete']")
   for(var i=0; i<elements.length; i++) {
   		var element = elements[i];
   		var id = $(element).attr('data_id')
   		var conformation = "<button class='btn btn-default' name='deleteYes' onclick='deleteJournal("+id+")'>Yes</button> " +
   		" <button class='btn btn-default' name='deleteNo' onclick='dismissPopover()'>No</button>"

   		$(element).popover({
			html: true,
    		trigger: 'manual',
    		placement: 'top',
    		container: 'body',
    		template: "<div class='popover' role='tooltip'> <div class='arrow'></div>"
    			+ "<div class='popover-title'> </div>"
    			+ "<div class='popover-content'></div></div>",
    		title: 'Are you sure ?',
    		content: conformation
		});

		$(element).on('click', function(event) {
			$(this).popover('toggle')
		});
    }

}

var deleteJournal = function(id) {
	$.ajax({
    	url: '/journals/journal?id='+id,
    	type: 'DELETE'
	}).done(function (status) {
		if(status == 'OK'){
			$('#journal'+id).remove();
			notify({message: 'Journal sucessfully deleted.'});
		}
		else notify({message: 'Error occured while deleting the Journal'});
	});
	$('.popover').popover('hide');
}

var dismissPopover = function() {
	$('.popover').popover('hide');
}










