var request = require('request');
var qs = require('querystring');
var config = require('../config.js');

var Dropbox = function(accessToken) {
	this.accessToken = accessToken;
	this.options = {

	};
}

Dropbox.prototype = {
	putFile: function(filePath, data) {
		var accessToken = this.accessToken;
		this.options.url = config.dropbox.putFile.replace(/@PATH@/g, filePath);
		this.options.url += "?"+qs.stringify({'access_token':accessToken});
		this.options.body = data;
		request.put(this.options, function(err, res, body) {
			console.log("Err",err)
			console.log("Res",res)
			console.log("Body",body)
		});
	}	
}





module.exports = Dropbox;
