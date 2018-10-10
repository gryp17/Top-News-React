var express = require("express");
var router = express.Router();
var md5 = require("md5");
var multipart = require("connect-multiparty");

var Validator = require("../middleware/validator");
var Files = require("../middleware/files");
var UserModel = require("../models/user");

var rules = {
	signUp: {
		username: ["required", "min-3", "max-40", "unique"],
		email: ["required", "max-100", "email", "unique"],
		password: ["required", "strong-password", "max-40"],
		repeatPassword: ["required", "matches(password)"],
		avatar: ["optional", "valid-avatar"]
	},
	update: {
		currentPassword: ["optional", "current-password"],
		password: ["optional", "strong-password", "max-40"],
		repeatPassword: ["matches(password)"],
		avatar: ["optional", "valid-avatar"]
	},
	login: {
		username: "required",
		password: "required",
		rememberMe: ["optional", "boolean"]
	}
};

//sign up
router.post("/", multipart(), Validator.validate(rules.signUp), Files.uploadAvatar, function (req, res, next){
	
	var data = req.body;

	//create the new user
	UserModel.create(data.username.trim(), data.email.trim(), data.password.trim(), req.files.avatar.uploadedTo, "user", function (err, userInstance) {
		if (err) {
			return next(err);
		}

		//log in the newly created user
		delete userInstance.password;
		req.session.user = userInstance;
		res.json({user: userInstance});
	});
});

//update user
router.put("/", multipart(), Validator.validate(rules.update), Files.uploadAvatar, function (req, res, next){
	var data = req.body;
	var files = req.files;

	if(data.password && !data.currentPassword){
		return res.json({
			errors: {
				currentPassword: "This field is required"
			}
		});
	}

	var updatedData = {};

	if (data.password) {
		updatedData.password = data.password.trim();
	}

	if (files.avatar.uploadedTo) {
		updatedData.avatar = files.avatar.uploadedTo
	}

	//check if there is anything to update
	if(Object.keys(updatedData).length === 0){
		res.json({user: req.session.user});
	}else{
		UserModel.update(req.session.user.id, updatedData, function (err, userInstance) {
			if (err) {
				return next(err);
			}
	
			delete userInstance.password;
			req.session.user = userInstance;
			res.json({user: userInstance});
		});
	}

});

//login
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

//get user data
router.get("/:id", function (req, res, next){
	var userId = parseInt(req.params.id);
	
	UserModel.getById(userId, function (err, result) {
		if (err) {
			return next(err);
		}

		if (result) {
			delete result.password;
		} 
		
		res.json(result);
	});
});

module.exports = router;
