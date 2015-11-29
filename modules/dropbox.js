var request = require('request');
var qs = require('querystring');
var config = require('../config.js');

var Dropbox = function(accessToken) {
	this.accessToken = accessToken;
	this.options = {

	};
}

Dropbox.prototype = {
	putFile: function(filePath, data, callback) {
		var accessToken = this.accessToken;
		this.options.url = config.dropbox.putFile.replace(/@PATH@/g, filePath);
		this.options.url += "?"+qs.stringify({'access_token':accessToken});
		this.options.body = data;
		request.put(this.options, function(err, res, body) {
			if(err) callback(err, null);
			else {
				body = JSON.parse(body);
				callback(null, body);
			}		
		});
	}	
}





module.exports = Dropbox;
