var express = require("express");
var router = express.Router();
var md5 = require("md5");

var UserModel = require("../models/user");

///login
router.post("/login", function (req, res, next) {
	UserModel.getByUsername(req.body.username, function (err, result) {
		if (err) {
			return next(err);
		}

		if (result) {

			if (result.password !== md5(req.body.password)) {
				res.send("Wrong username or password");
			} else {
				delete result.password;
				req.session.user = result;
				
				res.send({user: result});
			}

		} else {
			res.send("Wrong username or password");
		}
	});
});

//get user session/status
router.get("/session", function (req, res, next){	
	res.json({user: req.session.user});
});

//logout
router.get("/logout", function (req, res, next) {	
	req.session.destroy(function () {
		res.json({
			data: "OK"
		});
	});
});

module.exports = router;
