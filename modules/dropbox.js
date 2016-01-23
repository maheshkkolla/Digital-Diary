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
			if(err || body.error) callback(err || body.error, null);
			else {
				body = JSON.parse(body);
				callback(null, body);
			}		
		});
	},
	getFile: function(filePath, callback) {
		var accessToken = this.accessToken;
		this.options.url = config.dropbox.getFile.replace(/@PATH@/g, filePath);
		this.options.url += "?"+qs.stringify({'access_token': accessToken});
		request.get(this.options.url, function(err, res, body) {
			if(res.statusCode == 404) body = 'File has deleted from Dropbox'
			if(err || body.error) callback(err || body.error, null);
			else callback(null, body);
		});	
	},
	deleteFile: function(filePath, callback) {
		var accessToken = this.accessToken;
		this.options.url = config.dropbox.deleteFile
		this.options.url += "?"+qs.stringify({'access_token': accessToken, path: filePath, root: 'auto'});
		request.post(this.options, function(err, res, body){
			if(err || body.error) callback(err || body.error, null);
			else callback(null, body);
		});
	}
}





module.exports = Dropbox;
