
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
	self.element = $("#editor");
	self.journalTextbox = $("#journal");
	self.dateTime = u.newDateString();
	self.dateTimeCalendar = new DateTimeCalendar(this.dateTime);
	self.dateTimePicker = new DateTimePicker(this.dateTime);
	self.bindEvents();
};

JournalCreationView.prototype = {

	bindEvents: function() {
		var self = this;
		var page = $(document);
		self.dateTimePicker.bindChange(function(e) {
			self.dateChanged(e);
		});
		page.on("click", "#saveJournal", function(e) {
			self.createJournal($(this), e);
		});
		page.scroll(function() {
			var toolbar = $("#mceu_19");
			if(page.scrollTop() >= (self.element[0].scrollHeight - 100)) {
				toolbar.hide();
			} else {
				toolbar.show();
			}
		});
	},

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

	dateChanged: function(e) {
		this.dateTime = new Date(e.date);
		this.dateTimeCalendar.set(this.dateTime);
	}
};

$(function() {
	new JournalCreationView();
});