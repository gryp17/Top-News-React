var express = require("express");
var router = express.Router();
var md5 = require("md5");

var Validator = require("../middleware/validator");

var UserModel = require("../models/user");

var rules = {
	login: {
		username: "required",
		password: "required",
		rememberMe: ["optional", "boolean"]
	}
};

///login
router.post("/login", Validator.validate(rules.login), function (req, res, next) {
	UserModel.getByUsername(req.body.username, function (err, result) {
		if (err) {
			return next(err);
		}

		if (result) {

			if (result.password !== md5(req.body.password)) {
				res.json({
					errors: {
						password: "Wrong username or password"
					}
				});
			} else {
				delete result.password;
				
				//set the cookie maxAge to one month if the rememberMe flag is set
				if(req.body.rememberMe){
					req.session.cookie.maxAge = 3600 * 24 * 30 * 1000; //one month
				}
				
				req.session.user = result;

				res.json({
					user: result
				});
			}

		} else {
			res.json({
				errors: {
					password: "Wrong username or password"
				}
			});
		}
	});
});

//get user session/status
router.get("/session", function (req, res, next){	
	res.json({
		user: req.session.user
	});
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
