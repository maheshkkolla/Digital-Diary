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
        self.notifyDeleting();
        self.model.delete().done(function() {
            self.notifyDeleteSuccess();
            self.remove();
        }).fail(function() {
            self.notifyDeleteFailure();
        });
    },

    notifyDeleting: function() {
        this.deleting = new Notification({
            message: 'Deleting Journal ...',
            autoClose: false,
            close: false
        }).notify();
    },

    closeDeletingNotification: function() {
      this.deleting || this.deleting.close();
    },

    notifyDeleteFailure: function() {
        this.closeDeletingNotification();
        new Notification({
            message: 'Error while deleting a journal. Try after sometime.',
            autoClose: false,
            type: 'failure'
        }).notify();
    },

    notifyDeleteSuccess: function() {
        this.closeDeletingNotification();
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