
var Journal = function(id, dateTime, content) {
	this.id = id;
	this.dateTime = dateTime;
	this.content = content;
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
		return new Ajax({
			url: '/journals',
			type: 'POST'
		}).setData(this.toJson()).call();
	},

	updateTheJournal: function () {
		return new Ajax({
			url: '/journals/ID',
			type: 'PUT'
		}).setData(this.toJson()).setUrlParams({ID: this.id}).call();
	},

	delete: function() {
		return new Ajax({
			url: '/journals/ID',
			type: 'DELETE'
		}).setUrlParams({ID: this.id}).call();
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
	self.ids = [];
	self.journalViews = [];
	self.dateTimePicker = null;
	self.loader = $("#loader").clone();
	self.element.after(self.loader);
	self.loadingDfrd = $.Deferred();
	self.bindEvents();
	self.fetchAndDisplay();
};

JournalsView.prototype = {
	bindEvents: function() {
		var self = this;
		$.when(self.loadingDfrd).done(function() {
			if(self.ids.length == self.journalViews.length)
				self.hideLoader();
		});
	},

	showLoading: function() {
		var self = this;
		self.loader.removeClass('hidden');
	},

	hideLoader: function() {
		var self = this;
		self.loader.addClass('hidden');
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
		self.journalViews = [];
	},

	fetchIds: function() {
		return new Ajax({
			url: "/journals/ids",
			type: "GET"
		}).setQueryParams({date: this.date}).call();
	},

	fetchAndDisplay: function() {
		var self = this;
		self.showLoading();
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
			journalView.setId(id).fetchAndDisplay(self.loadingDfrd);
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
	this.model = null;
	this.container = journalsElement;
	this.deleteBtn = null;
	this.editBtn = null;
	this.deleteBtnYes = $("<button class='btn btn-default' name='deleteYes'>Yes</button>");
	this.deleteBtnNo = $("<button class='btn btn-default' name='deleteNo'>No</button>");
};

JournalView.prototype = {

	setId: function(id) {
		this.id = id;
		return this;
	},

	bindEvents: function() {
		var self = this;
		self.deleteBtn = self.element.find("[name='delete']");
		self.editBtn = self.element.find("[name='edit']");
		self.initDeletePopover();

		self.deleteBtn.click(function () {
			self.triggerDeletePopover();
		});

		self.editBtn.click(function () {
			//trigger edit modal
		});

		self.deleteBtnYes.click(function () {
			self.deleteJournal();
		});

		self.deleteBtnNo.click(function() {
			self.triggerDeletePopover();
		});
	},

	deleteJournal: function() {
		var self = this;
		self.model.delete().done(function() {
			self.notifyDeleteSuccess();
			self.remove();
		}).fail(function() {
			self.notifyDeleteFailure();
		});
	},

	notifyDeleteFailure: function() {
		new Notification({
			message: 'Error while deleting a journal. Try after sometime.',
			autoClose: false,
			type: 'failure'
		}).notify();
	},

	notifyDeleteSuccess: function() {
		new Notification({
			message: 'Journal deleted successfully',
			type: 'success'
		}).notify();
	},

	initDeletePopover: function() {
		var self = this;
		self.deleteBtn.popover({
			html: true,
			trigger: 'manual',
			placement: 'top',
			container: 'body',
			template: "<div class='popover' role='tooltip'> <div class='arrow'></div>"
			+ "<div class='popover-title'> </div>"
			+ "<div class='popover-content'></div></div>",
			title: 'Are you sure ?',
			content: self.deleteBtnYes.add(self.deleteBtnNo)
		});
	},

	triggerDeletePopover: function() {
		var self = this;
		self.deleteBtn.popover('toggle');
	},

	fetchAndDisplay: function(doneDfrd) {
		var self = this;
		self.fetch().done(function(response) {
			self.element = $(response);
			self.initModel();
			self.bindEvents();
			self.container.append(self.element);
			u.isNotNullOrUndefined(doneDfrd) && doneDfrd.resolve();
		}).fail(function() {
			self.notifyLoadingFail();
			u.isNotNullOrUndefined(doneDfrd) && doneDfrd.resolve();
		});
	},

	initModel: function() {
		var self = this;
		var dateTime = self.element.find(".date");
		var content = self.element.find(".journalContent");
		self.model = new Journal(self.id, dateTime, content);
	},

	fetch: function() {
		var self = this;
		return new Ajax({
			url: "/journals/ID",
			type: "GET"
		}).setUrlParams({ID: self.id}).call();
	},

	notifyLoadingFail: function() {
		new Notification({
			message: 'Error while loading a journal',
			autoClose: false,
			type: 'failure'
		}).notify();
	},

	remove: function() {
		var self = this;
		self.deleteBtn.popover('destroy');
		self.element.remove();
	}
};




$(function() {
	var jCV = new JournalCreationView();
	var dateTimePicker = jCV.getDateTimePicker();
	var jV = new JournalsView();
	jV.setDateTimePicker(dateTimePicker);
});