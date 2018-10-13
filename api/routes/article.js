var express = require("express");
var fs = require("fs");
var async = require("async");
var router = express.Router();
var multipart = require("connect-multiparty");

var Validator = require("../middleware/validator");
var Files = require("../middleware/files");
var ArticleModel = require("../models/article");
var ArticleViewModel = require("../models/article-view");

var rules = {
	create: {
		categoryId: ["in(1, 2, 3, 4, 5)"], //category id's
		title: ["required", "min-3", "max-200"],
		summary: ["required", "min-3", "max-500"],
		content: ["required", "min-50", "max-10000"],
		image: ["required", "valid-article-image"]
	}
};

//get the latest articles from the specified author/user id
router.get("/author/:id/:limit/:offset", function (req, res, next){	
	
	async.parallel([
		//get the comments
		function (done){
			ArticleModel.getByAuthor(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), done);
		},
		//get the total number of comments
		function (done){
			ArticleModel.getTotalByAuthor((req.params.id), done);
		}
	], function (err, results){
		if (err) {
			return next(err);
		}
		
		res.json({
			articles: results[0],
			total: results[1]
		});
	});
	
});

//get all articles from the specified category and/or search term
router.get("/category/:category/:searchTerm/:limit/:offset", function (req, res, next) {
	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), parseInt(req.params.offset), function (err, results) {
		if (err) {
			return next(err);
		}

		res.json(results);
	});
});

//get all article search suggestions from the specified category and search term
router.get("/autocomplete/:category/:searchTerm/:limit", function (req, res, next){
	var textLimit = 80;
	
	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), 0, function (err, results) {
		if (err) {
			return next(err);
		}
		
		//find out if the match was in the article title or the article content and return only that relevant part of the string
		results = results.map(function (article){
			var result = "";
			var title = article.title;
			var content = article.content;
			
			var titleIndex = title.toLowerCase().indexOf(req.params.searchTerm.toLowerCase());
			var contentIndex = content.toLowerCase().indexOf(req.params.searchTerm.toLowerCase());
			
			if(titleIndex !== -1){
				result = title.substr(titleIndex, req.params.searchTerm.length + textLimit);
			}else if(contentIndex !== -1){				
				result = content.substr(contentIndex, req.params.searchTerm.length + textLimit);
			}

			//remove any HTML tags and dots that might appear at the end of the string
			result = result.replace(/<\/?\w+.+/ig, "");
			result = result.replace(/\.$/, "");

			return result;
		});

		res.json(results);
	});
});

//get the most popular articles for the specified period
router.get("/popular/:period/:limit", function (req, res, next){
	ArticleModel.getMostPopular(req.params.period, parseInt(req.params.limit), function (err, results){
		if (err) {
			return next(err);
		}
		
		res.json(results);
	});
});

//get the article that matches the specified id and increments the views counter
router.get("/:id", function (req, res, next) {
	var articleId = parseInt(req.params.id);
	
	ArticleModel.getById(articleId, function (err, result) {
		if (err) {
			return next(err);
		}
		
		if(result){
			var userId = req.session.user ? req.session.user.id : null;
			ArticleViewModel.addArticleView(articleId, userId);
		}
		
		res.json(result);
	});
});

//create new article record
router.post("/", multipart(), Validator.validate(rules.create), Files.uploadArticleImage, function (req, res, next){
	var data = req.body;

	//create the new article
	ArticleModel.create(data.categoryId, data.title, data.summary, data.content, req.files.image.uploadedTo, req.session.user.id, function (err, articleInstance) {
		if (err) {
			return next(err);
		}

		res.json({
			article: articleInstance
		});
	});
});

//delete article
router.delete("/:id", function (req, res, next){
	var config = req.app.get("config");
	
	var articleId = parseInt(req.params.id);

	ArticleModel.getById(articleId, function (err, article){
		if (err) {
			return next(err);
		}

		//unexisting article
		if(!article){
			return res.json({
				errors: {
					article: "Invalid article id"
				}
			});
		}

		//article that doesn't belong to the current user
		if(article.authorId !== req.session.user.id){
			return res.json({
				errors: {
					article: "Permissions denied"
				}
			});
		}

		ArticleModel.delete(articleId, function (err){
			if (err) {
				return next(err);
			}
			
			var image = config.uploads.articles.directory + article.image;
			//remove all GET parameters from the path (if any)
			image = image.replace(/\?.+/, "");

			//delete the article image
			fs.unlink(image, function (err) {
				if (err) {
					return next(err)
				}

				res.json({
					status: true
				});
			});
		});
	});
});

module.exports = router;
