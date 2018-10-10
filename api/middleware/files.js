var fs = require("fs");
var path = require("path");
var md5 = require("md5");
var async = require("async");

module.exports = {
	/**
	 * Uploads the submited avatar to the avatars directory
	 * It modifies the req object adding the new avatar filename in req.files.avatar.uploadedTo
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Function} next
	 */
	uploadAvatar: function (req, res, next) {
		var asyncTasks = [];
		var config = req.app.get("config");

		var file = req.files.avatar;
		var extension = path.extname(file.originalFilename).replace(".", "").toLowerCase();

		//if no file has been submited
		if (file.originalFilename.length === 0) {
			return next();
		}

		//if the user is logged in (trying to update his avatar) and doesn't use the default avatar
		//add the "unlink" task before the "rename" one
		if (req.session && req.session.user && req.session.user.avatar !== config.uploads.avatars.defaultAvatar) {

			asyncTasks.push(function (done) {
				var oldAvatar = config.uploads.avatars.directory + req.session.user.avatar;

				//remove all GET parameters from the path (if any)
				oldAvatar = oldAvatar.replace(/\?.+/, "");

				//delete the old avatar
				fs.unlink(oldAvatar, function (err) {
					if (err) {
						return done("Failed to delete the old avatar");
					}

					done();
				});
			});
		}

		//add the "rename/move" task
		asyncTasks.push(function (done) {
			var username = req.body.username ? req.body.username : req.session.user.username;
			var avatar = md5(username) + new Date().getTime() + "." + extension;
			var destination = config.uploads.avatars.directory + avatar;

			//move the temporal file to the real avatars directory
			fs.rename(file.path, destination, function (err) {
				if (err) {
					return done("Failed to upload the avatar");
				}

				//append the uploaded avatar to the files object
				req.files.avatar.uploadedTo = avatar + "?updated=" + new Date().getTime();

				done(null);
			});
		});

		//run all tasks
		async.series(asyncTasks, function (err) {
			if (err) {
				return res.send(err);
			}

			next();
		});

	}
};