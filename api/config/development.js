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
		avatars: {
			directory: "../public/uploads/avatars/",
			maxSize: 1000000,
			validExtensions: ["png", "jpg", "jpeg"],
			defaultAvatar: "default.png"
		},
		articles: {
			directory: "../public/uploads/articles/",
			maxSize: 10000000,
			validExtensions: ["png", "jpg", "jpeg"]
		}
	}
};
