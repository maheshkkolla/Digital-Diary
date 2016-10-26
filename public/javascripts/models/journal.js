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
