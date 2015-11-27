var config = {
	dev: {
		db: {
			client: 'pg',
			connection : 'postgres://localhost/digitaldiary'
		},
		dropbox: {
			clientID: process.env.clientID,
    		clientSecret: process.env.clientSecret,
    		callbackURL: "http://localhost:3001/auth/dropbox-oauth2/callback",
    		putFile: "https://content.dropboxapi.com/1/files_put/auto/@PATH@"
		}
	},
	qa: {
		db: {
			client: 'pg',
			connection : process.env.OPENSHIFT_POSTGRESQL_DB_URL
		},
		dropbox: {
			clientID: process.env.clientID,
    		clientSecret: process.env.clientSecret
		}
	}
}

if(process.env.ENV == 'QA') module.exports = config.qa;
else module.exports = config.dev;