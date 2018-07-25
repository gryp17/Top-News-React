var express = require("express");
var async = require("async");
var router = express.Router();

var ArticleCommentModel = require("../models/article-comment");

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
