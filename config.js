module.exports = {
	db: {
		client: 'pg',
		connection : 'postgres://localhost/digitaldiary'
	},
	dropbox: {
		clientID: process.env.clientID,
    	clientSecret: process.env.clientSecret,
    	callbackURL: "http://localhost:3000/auth/dropbox-oauth2/callback"
	}
}