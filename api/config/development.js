module.exports = {
	port: 8080,
	session: {
		secret: "whyisthisathing",
		sessionId: "topnews.sid",
		tableName: "session"
	},
	db: {
		host: "127.0.0.1",
		database: "top-news-react",
		user: "root",
		password: "1234"
	},
	uploads: {
		avatarsDirectory: "../public/img/avatars/",
		maxAvatarSize: 1000000,
		validAvatarExtensions: ["png", "jpg", "jpeg"],
		defaultAvatar: "default.png"
	}
};
