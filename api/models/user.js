var mysql = require("mysql");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {
	getByUsername: function (username, done) {
		connection.query("SELECT * FROM user WHERE username = ?", [username], function (err, rows) {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				var user = rows[0];
				
				//if there is no avatar use the default one
				if(!user.avatar){
					user.avatar = app.get("config").uploads.defaultAvatar;
				}
				
				done(null, user);
			}
		});
	}
}; 