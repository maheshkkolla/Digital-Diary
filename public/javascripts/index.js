
var Journal = function(id, dateTime, content) {
	this.id = id;
	this.dateTime = dateTime;
	this.content = content;


	Object.defineProperty(this, 'updateOptions', { value: {
		url: '/journals/ID',
		type: 'PUT'
	}});

	Object.defineProperty(this, 'createOptions', { value: {
		url: '/journals',
		type: 'POST'
	}});
};

Journal.prototype = {
	save: function() {
		if(u.isNullOrUndefined(this.id)) {
			return this.createNewJournal();
		} else {
			return this.updateTheJournal();
		}
	},

	createNewJournal: function () {
		return new Ajax(this.createOptions).setData(this.toJson()).call();
	},

	updateTheJournal: function () {
		return new Ajax(this.updateOptions).setData(this.toJson()).setUrlParams({ID: this.id}).call();
	},

	toJson: function() {
		return {
			id: this.id,
			dateTime: this.dateTime,
			content: this.content
		};
	}
};


$(function() {
	$('#dateTime').on('change', function() {
    	setDateTimeToShowCalendar($('#dateTime').val());
	});

	$('#saveJournal').on('click', function() {
		var notification = new Notification({message: 'Creating Journal ...', autoClose: false, close: false}).notify();
		var journalContent = $("#journal").html();
		var dateTime = $("#dateTime").val();
		var journal = new Journal(null, dateTime, journalContent);

		journal.save()
			.done(function (status) {
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