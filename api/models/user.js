var mysql = require("mysql");
var md5 = require("md5");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {
	/**
	 * Returns the user that matches the specified id
	 * @param {Number} id
	 * @param {Function} done
	 */
	getById: function (id, done){
		connection.query("SELECT * FROM user WHERE id = ?", [id], function (err, rows) {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				var user = rows[0];
				
				//if there is no avatar use the default one
				if(!user.avatar){
					user.avatar = app.get("config").uploads.avatars.defaultAvatar;
				}
				
				done(null, user);
			}
		});
	},
	/**
	 * Returns the user that matches the specified username
	 * @param {String} username
	 * @param {Function} done
	 */
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
					user.avatar = app.get("config").uploads.avatars.defaultAvatar;
				}
				
				done(null, user);
			}
		});
	},
	/**
	 * Returns the user that matches the specified email
	 * @param {String} email
	 * @param {Function} done
	 */
	getByEmail: function (email, done) {
		connection.query("SELECT * FROM user WHERE email = ?", [email], function (err, rows) {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				var user = rows[0];
				
				//if there is no avatar use the default one
				if(!user.avatar){
					user.avatar = app.get("config").uploads.avatars.defaultAvatar;
				}
				
				done(null, user);
			}
		});
	},
	/**
	 * Adds new user record
	 * @param {String} username
	 * @param {String} email
	 * @param {String} password
	 * @param {String} avatar
	 * @param {String} type
	 * @param {Function} done
	 */
	create: function (username, email, password, avatar, type, done){
		var self = this;
		
		connection.query("INSERT INTO user (username, email, password, avatar, type, registered) VALUES (?, ?, ?, ?, ?, now())", [username, email, md5(password), avatar, type], function (err, result) {
			if (err) {
				return done(err);
			}

			//return the inserted record
			self.getByUsername(username, function (err, userInstance){
				if (err) {
					return done(err);
				}
				
				done(null, userInstance);
			});
			
		});
	}
}; 