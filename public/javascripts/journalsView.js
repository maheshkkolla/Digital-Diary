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
