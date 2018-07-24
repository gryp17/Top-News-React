var express = require("express");
var router = express.Router();

var ArticleModel = require("../models/article");
var ArticleViewModel = require("../models/article-view");

//get the latest articles from the specified author/user id
router.get("/author/:id/:limit/:offset", function (req, res, next){	
	ArticleModel.getByAuthor(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), function (err, results) {
		if (err) {
			return next(err);
		}

		res.json(results);
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

module.exports = router;
