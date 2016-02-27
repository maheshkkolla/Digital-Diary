$(function() {
	$('#dateTime').on('change', function() {
    	setDateTimeToShowCalendar($('#dateTime').val());
	});

	$('#saveJournal').on('click', function() {
		var notification = notify({message: 'Creating journal ...'});
		var journal = $("#journal").html();
		var dateTime = $("#dateTime").val();
		$.ajax({
			url: '/journals',
			type: 'POST',
			data: {
				'dateTime': dateTime,
				'journal': journal
			}
		}).done(function (status) {
			removeNotification(notification);
			if(status == 'OK') {
				notify({message: 'Journal created.'});
			}
			else creationFailed();
		}).fail(creationFailed);
	});

	var creationFailed = function() {
		notify({message: 'Error occurred while creating the Journal'});
	}
});