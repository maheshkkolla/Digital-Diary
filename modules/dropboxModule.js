var request = require('request');
var qs = require('querystring');
var config = require('../config.js');

var Dropbox = function(accessToken) {
	this.accessToken = accessToken;
	this.options = {

	};
};

Dropbox.prototype = {
	putFile: function(filePath, data) {
		var self = this;
		var accessToken = this.accessToken;
		self.options.url = config.dropbox.putFile.replace(/@PATH@/g, filePath);
		self.options.url += "?"+qs.stringify({'access_token':accessToken});
		self.options.body = data;
		return new Promise(function(resolve, reject) {
			request.put(self.options, function(err, res, body) {
				if(err || body.error) return reject(err || body.error);
				body = JSON.parse(body);
				return resolve(body);
			});
		});
	},
	getFile: function(filePath, callback) {
		var accessToken = this.accessToken;
		var self = this;
		self.options.url = config.dropbox.getFile.replace(/@PATH@/g, filePath);
		self.options.url += "?"+qs.stringify({'access_token': accessToken});
		return new Promise(function(resolve, reject) {
			request.get(self.options.url, function(err, res, body) {
				if(res.statusCode == 404) return resolve('File has deleted from Dropbox');
				if(err || body.error) return reject(err || body.error);
				return resolve(body);
			});
		});
	},
	deleteFile: function(filePath) {
		var accessToken = this.accessToken;
		var self = this;
		self.options.url = config.dropbox.deleteFile;
		self.options.url += "?"+qs.stringify({'access_token': accessToken, path: filePath, root: 'auto'});
		return new Promise(function(resolve, reject) {
			request.post(self.options, function(err, res, body){
				if(err || body.error) return reject(err || body.error);
				return resolve(body);
			});
		});
	}
};





module.exports = Dropbox;
