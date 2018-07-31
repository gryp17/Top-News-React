var express = require("express");
var async = require("async");
var router = express.Router();

var Session = require("../middleware/session");
var Validator = require("../middleware/validator");

var ArticleCommentModel = require("../models/article-comment");

var rules = {
	addComment: {
		articleId: ["required", "integer", "existing-article-id"],
		content: ["required", "min-3", "max-500"]
	}
};

//add new comment
router.post("/", Session.isLoggedIn, Validator.validate(rules.addComment), function (req, res, next){
	var data = req.body;

	ArticleCommentModel.create(data.articleId, req.session.user.id, data.content, function (err, result){
		if(err){
			return next(err);
		}

		res.json({
			id: result.insertId
		});
	});
});

//get the latest article comments for the specified article id
router.get("/article/:id/:limit/:offset", function (req, res, next){
	
	async.parallel([
		//get the comments
		function (done){
			ArticleCommentModel.getComments(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), done);
		},
		//get the total number of comments
		function (done){
			ArticleCommentModel.getTotalComments(req.params.id, done);
		}
	], function (err, results){
		if(err){
			return next(err);
		}
		
		res.json({
			comments: results[0],
			total: results[1]
		});
	});
	
});

module.exports = router;
