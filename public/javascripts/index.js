
var Journal = function(id, title, dateTime, content, location) {
	this.id = id;
	this.title = title;
	this.dateTime = dateTime;
	this.content = content;
	this.location = location;
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
			title: this.title,
			dateTime: this.dateTime,
			content: this.content,
			location: this.location.toJson()
		};
	}
};

var Location = function(name, address, latitude, longitude, phoneNumber) {
	this.name = name;
	this.address = address;
	this.latitude = latitude;
	this.longitude = longitude;
	this.phoneNumber = phoneNumber;
};

Location.prototype = {
	getAddressWithName: function() {
		return(this.name.concatWithSpace(this.address));
	},

	toJson: function() {
		if(u.isNullOrUndefined(this.name)) return null;
		return {
			name: this.name,
			address: this.address,
			latitude: this.latitude,
			longitude: this.longitude,
			phoneNumber: this.phoneNumber
		};
	}
};


var JournalCreationView = function() {
	var self = this;
	self.initFields();
	self.bindEvents();
};

JournalCreationView.prototype = {
	initFields: function() {
		var self = this;
		self.id = null;
		self.element = $("#editor");
		self.journalTextbox = $("#journal");
		self.titleTextbox = $("#title");
		self.dateTime = u.newDateString();
		self.detailElements = {};
		self.detailElements.dateTime = self.element.find('.journalDetails .dateTime');
		self.detailElements.location = self.element.find('.journalDetails .location');
		self.dateTimePicker = new DateTimePicker(this.dateTime);
		self.dateChanged();
		self.location = new Location();
		self.locationSelector = {
			element: $("#locationSelector")
		};
		self.locationSelector.input = self.locationSelector.element.find('.location')[0];
		self.locationSelector.autoComplete = new google.maps.places.Autocomplete(self.locationSelector.input);
	},

	bindEvents: function() {
		var self = this;
		var page = $(document);
		self.dateTimePicker.bindChange(function(e) {
			self.dateTime = new Date(e.date);
			self.dateChanged();
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

		self.locationSelector.autoComplete.addListener('place_changed', function() {
			self.locationChanged();
		});
	},

	populateInputs: function(options) {
		var self = this;
		self.id = options.id || null;
		self.titleTextbox.val(options.title || '');
		self.journalTextbox.html(options.content || '');
		self.dateTimePicker.change(options.dateTime || u.newDateString());
	},

	locationChanged: function() {
		var self = this;
		var place = self.locationSelector.autoComplete.getPlace();
		self.location = new Location(
			place.name,
			place.formatted_address,
			place.geometry.location.lat(),
			place.geometry.location.lng(),
			place.formatted_phone_number
		);
		var addressWithName = self.location.getAddressWithName();
		var url = "http://www.google.com/maps?q=".concat(addressWithName.split(" ").join('+'));
		self.locationSelector.element.find('a').attr('href', url);
		self.detailElements.location.html(self.location.name);
	},

	getDateTimePicker: function() {
		return this.dateTimePicker;
	},

	createJournal: function(element, event) {
		var self = this;
		self.notifyCreatingJournal();
		self.journalContent = self.journalTextbox.html();
		self.title = self.titleTextbox.val();
		var journal = new Journal(self.id, self.title, self.dateTime, self.journalContent, self.location);
		journal.save()
		.done(function (status) {
			self.handleCreationSuccess(status);
		}).fail(function() {
			self.handleCreationFailure();
		});
	},

	handleCreationSuccess: function(id) {
		this.closeCreatingNotification();
		this.notifyCreationSuccess();
		if(u.isNotNullOrUndefined(window.App) && u.isNotNullOrUndefined(window.App.journalsView)) {
			window.App.journalsView.addJournalWithId(id);
		}
		this.populateInputs({});
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

	dateChanged: function() {
		this.detailElements.dateTime.html(this.dateTime.toString().slice(0,21));
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

	addJournalWithId: function(id) {
		var self = this;
		self.ids.push(id);
		self.journalViews.push(self.initializeJournal(id));
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
			self.initializeJournal(id);
		});
	},

	initializeJournal: function(id) {
		var self = this;
		var journalView =  new JournalView(self.element);
		journalView.setId(id).fetchAndDisplay(self.loadingDfrd);
		return journalView;
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
			window.App.creationView.populateInputs(self.model);
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
			self.element = $(jade.templates['journal'](response));
			self.container.append(self.element);
			self.initModel(response);
			self.bindEvents();
			u.isNotNullOrUndefined(doneDfrd) && doneDfrd.resolve();
		}).fail(function() {
			self.notifyLoadingFail();
			u.isNotNullOrUndefined(doneDfrd) && doneDfrd.resolve();
		});
	},

	initModel: function(journalData) {
		this.model = new Journal(this.id, journalData.title,
			journalData.date_time, journalData.content);
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
	window.App = {};
	var app = window.App;
	app.creationView = new JournalCreationView();
	var dateTimePicker = app.creationView.getDateTimePicker();
	app.journalsView = new JournalsView();
	app.journalsView.setDateTimePicker(dateTimePicker);
});