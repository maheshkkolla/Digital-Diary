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
    		putFile: "https://content.dropboxapi.com/1/files_put/auto/@PATH@",
    		getFile: "https://content.dropboxapi.com/1/files/auto/@PATH@",
    		deleteFile: "https://api.dropboxapi.com/1/fileops/delete"
		}
	},
	qa: {
		db: {
			client: 'pg',
			connection : {
				host     : '127.0.0.1',
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
		}
	}
}

if(process.env.ENV == 'qa') module.exports = config.qa;
else module.exports = config.dev;