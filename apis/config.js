var config = {
	dev: {
		db: {
			client: 'pg',
			connection : 'postgres://localhost/digitaldiary'
		},
		dropbox: {
			clientID: process.env.clientID,
    		clientSecret: process.env.clientSecret,
    		callbackURL: "http://localhost:3005/auth/dropbox-oauth2/callback",
    		putFile: "https://content.dropboxapi.com/1/files_put/auto/@PATH@",
    		getFile: "https://content.dropboxapi.com/1/files/auto/@PATH@",
    		deleteFile: "https://api.dropboxapi.com/1/fileops/delete"
		},
		libs: {
			dropboxOauthStrategy: './mocks/dropboxStrategy'
		}
	},
	qa: {
		db: {
			client: 'pg',
			connection : {
				host     : process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
                user     : process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
                password : process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
                database : 'digitaldiary'
			}
		},
		dropbox: {
			clientID: process.env.clientID,
    		clientSecret: process.env.clientSecret,
    		callbackURL: "https://digitaldiary-245apps.rhcloud.com/auth/dropbox-oauth2/callback",
    		putFile: "https://content.dropboxapi.com/1/files_put/auto/@PATH@",
    		getFile: "https://content.dropboxapi.com/1/files/auto/@PATH@",
    		deleteFile: "https://api.dropboxapi.com/1/fileops/delete"
		},
		libs: {
			dropboxOauthStrategy: 'passport-dropbox-oauth2'
		}
	}
};

if(process.env.ENV == 'qa') module.exports = config.qa;
else module.exports = config.dev;