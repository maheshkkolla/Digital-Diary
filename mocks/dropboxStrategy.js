var util = require('util');
var passport = require('passport');

var Strategy = function(options, verify) {
    this.name = 'dropbox-oauth2';
    this.verify = verify;
    this.callbackURL = options.callbackURL;
    this.user = {
        id: 12345,
        displayName: 'Mahesh Kumar',
        emails: [{value: 'mahesh@domain.com'}]
    };
};

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function authenticate(req) {
    var self = this;
    if(req._parsedUrl.path == '/auth/dropbox') {
        self.redirect(this.callbackURL);
    } else {
        self.verify('accessToken', 'refreshToken', self.user, function(err, resident) {
            if(err) {
                self.fail(err);
            } else {
                self.success(resident);
            }
        });
    }
};

module.exports = {
    Strategy: Strategy
};