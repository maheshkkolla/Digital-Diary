
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
