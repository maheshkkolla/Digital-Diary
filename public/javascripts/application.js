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
		return this;
	},

	setMessage: function(message) {
		this.options.message = message;
		return this;
	},

	setClose: function(close) {
		this.options.close = close;
		return this;
	},

	setAutoClose: function(autoClose) {
		this.options.autoClose = autoClose;
		return this;
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


var Ajax = function(options) {
	this.options = options || {};
};

Ajax.prototype = {
	setUrl: function(url) {
		this.options.url = url;
		return this;
	},

	setType: function(type) {
		this.options.type = type;
		return this;
	},

	setData: function(data) {
		this.options.contentType = 'application/json';
		this.options.data = JSON.stringify(data);
		return this;
	},

	setQueryParams: function(params) {
		var allParams = u.mapOnKeys(params, function(key) {
			return key.concat("=").concat(params[key]);
		});
		this.options.url = this.options.url.concat("?").concat(allParams.join("&"));
		return this;
	},

	setUrlParams: function(params) {
		var self = this;
		u.eachOnKeys(params, function(key) {
			self.options.url = self.options.url.replace(key, params[key]);
		});
		return this;
	},

	call: function() {
		return $.ajax(this.options);
	}
};
 