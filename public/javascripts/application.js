$(function() {
	$.getScript("javascripts/utils.js").done(function() {
		console.log("Loaded script")
	}).fail(function() {
		console.error("Failed to load javascript files! Please refresh the page.");
	});
});

var Notification = function(arg) {
	this.options = {};
	if(u.isType(arg, 'object')) this.options = arg;
	if(u.isType(arg, 'string')) this.options.message = arg;

	this.options.close = u.isNotNullOrUndefined(this.options.close) ? this.options.close : true;
	this.options.time = this.options.time || 7000;
	this.options.type = this.options.type || 'info';
	this.options.autoClose = u.isNotNullOrUndefined(this.options.autoClose) ? this.options.autoClose : true;
};

Notification.prototype = {
	setTime: function(time) {
		this.options.time = time;
	},

	setMessage: function(message) {
		this.options.message = message;
	},

	setClose: function(close) {
		this.options.close = close;
	},

	setAutoClose: function(autoClose) {
		this.options.autoClose = autoClose;
	},

	close: function() {
		this.notification.remove();
	},

	makeMessageElement: function() {
		this.messageElement =  $('<span/>',{
			class: "message".concatWithSpace(this.options.type),
			text: this.options.message
		});
	},

	makeNotificationElement: function() {
		this.makeMessageElement();
		this.notification = $('<div/>', {
			class: 'notification',
			html: this.messageElement
		});
	},

	makeCloseElement: function() {
		var self = this;
		var close = $('<div/>', {
			class: 'close',
			text: 'x',
			click: function() {
				self.close();
			}
		});
		this.notification.prepend(close);
	},

	activateAutoClose: function() {
		var self = this;
		setTimeout(function() {
			self.close();
		}, this.options.time);
	},

	notify: function() {
		this.makeNotificationElement();

		if(this.options.close) {
			this.makeCloseElement();
		}

		if(this.options.time && this.options.autoClose) {
			this.activateAutoClose();
		}

		$('.notifiers').append(this.notification);
		return this;
	}
};
 