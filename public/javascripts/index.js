
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

	getDateTimePicker: function() {
		return this.dateTimePicker;
	},

	createJournal: function(element, event) {
		var self = this;
		self.notifyCreatingJournal();
		self.journalContent = this.journalTextbox.html();
		console.log(self.journalContent);
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

var JournalsView = function() {
	var self = this;
	self.element = $("#journals");
	self.date = u.newDateString();
	self.ids = null;
	self.journalViews = null;
	self.dateTimePicker = null;
	self.bindEvents();
	self.fetchAndDisplay();
};

JournalsView.prototype = {
	bindEvents: function() {

	},

	setDateTimePicker: function(dateTimePicker) {
		var self = this;
		self.dateTimePicker = dateTimePicker;
		self.dateTimePicker.bindChange(function(e) {
			self.removeAllJournals();
			self.date = new Date(e.date);
			self.fetchAndDisplay();
		});
	},

	removeAllJournals: function() {
		var self = this;
		u.isNotNullOrUndefined(self.journalViews) && self.journalViews.forEach(function(journalView) {
			journalView.remove();
		});
	},

	fetchIds: function() {
		return new Ajax({
			url: "/journals/ids",
			type: "GET"
		}).setQueryParams({date: this.date}).call();
	},

	fetchAndDisplay: function() {
		var self = this;
		self.fetchIds().done(function(ids) {
			self.ids = ids;
			self.initializeJournals();
		}).fail(function() {
			self.notifyErrorLoadingJournals();
		});
	},

	initializeJournals: function() {
		var self = this;
		self.journalViews = self.ids.map(function(id) {
			var journalView =  new JournalView(self.element);
			journalView.setId(id).fetchAndDisplay();
			return journalView;
		});
	},

	notifyErrorLoadingJournals: function() {
		new Notification({
			message: 'Error while loading journals',
			autoClose: false,
			type: 'failure'
		}).notify();
	}
};

var JournalView = function(journalsElement) {
	this.id = null;
	this.element = null;
	this.container = journalsElement;
};

JournalView.prototype = {

	setId: function(id) {
		this.id = id;
		return this;
	},

	fetchAndDisplay: function() {
		var self = this;
		self.fetch().done(function(response) {
			self.element = $(response);
			self.container.append(self.element);
		}).fail(function() {
			self.notifyFail();
		});
	},

	fetch: function() {
		var self = this;
		return new Ajax({
			url: "/journals/ID",
			type: "GET"
		}).setUrlParams({ID: self.id}).call();
	},

	notifyFail: function() {
		new Notification({
			message: 'Error while loading a journal',
			autoClose: false,
			type: 'failure'
		}).notify();
	},

	remove: function() {
		this.element.remove();
	}
};




$(function() {
	var jCV = new JournalCreationView();
	var dateTimePicker = jCV.getDateTimePicker();
	var jV = new JournalsView();
	jV.setDateTimePicker(dateTimePicker);

});