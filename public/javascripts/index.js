
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


var JournalCreationView = function() {
	var self = this;
	this.journalTextbox = $("#journal");
	this.dateTime = new Date().toString();
	var page = $(document);
	page.on("click", "#saveJournal", function(e) {
		self.createJournal($(this), e);
	});

	page.on("change", "#dateTime", function(e) {
		self.changeCalender($(this), e);
	});
};

JournalCreationView.prototype = {
	createJournal: function(element, event) {
		this.notifyCreatingJournal();
		this.journalContent = this.journalTextbox.html();
		var self = this;
		var journal = new Journal(null, this.dateTime, this.journalContent);
		journal.save()
		.done(function (status) {
			self.handleCreationSuccess(status);
		}).fail(function() {
			self.handleCreationFailure();
		});
	},

	handleCreationSuccess: function(status) {
		this.closeCreatingNotification();
		if(status.is("OK")) {
			this.notifyCreationSuccess();
		}
		else this.notifyCreationFailed();
	},

	handleCreationFailure: function() {
		this.closeCreatingNotification();
		this.notifyCreationFailed();
	},

	notifyCreationFailed: function() {
		new Notification({
			message: 'Error occurred while creating the Journal',
			autoClose: false,
			type: 'failure'
		}).notify();
	},

	notifyCreationSuccess: function() {
		new Notification({
			message: 'Journal created.',
			type: 'success'
		}).notify();
	},

	notifyCreatingJournal: function() {
		this.creating = new Notification({
			message: 'Creating Journal ...',
			autoClose: false,
			close: false
		}).notify();
	},

	closeCreatingNotification: function() {
		this.creating.close();
	},

	changeCalender: function(element, event) {
		var dateTime = element.val();
		this.dateTime = dateTime;
		setDateTimeToShowCalendar(dateTime);
	}
};

$(function() {
	new JournalCreationView();
});