
var Journal = function(id, dateTime, content) {
	this.id = id;
	this.dateTime = dateTime;
	this.content = content;
};

Journal.prototype = {
	save: function() {
		if(isNullOrUndefined(this.id)) {
			this.createNewJournal();
		} else {
			this.updateTheJournal();
		}
	},

	createNewJournal: function () {

	},


	updateTheJournal: function () {

	}
};


$(function() {
	$('#dateTime').on('change', function() {
    	setDateTimeToShowCalendar($('#dateTime').val());
	});

	$('#saveJournal').on('click', function() {
		var notification = new Notification({message: 'Creating Journal ...', autoClose: false, close: false}).notify();
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
			notification.close();
			if(status == 'OK') {
				new Notification({message: 'Journal created.', type: 'success'}).notify();
			}
			else creationFailed();
		}).fail(creationFailed);
	});

	var creationFailed = function() {
		new Notification({message: 'Error occurred while creating the Journal', type: 'failure'}).notify();
	};
});