var express = require("express");
var router = express.Router();

var ArticleModel = require("../models/article");

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

//get all articles from the specified category and search term
router.get("/autocomplete/:category/:searchTerm/:limit", function (req, res, next){
	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), 0, function (err, results) {
		if (err) {
			return next(err);
		}
		
		//TODO:
		//find out if the match was in the article title or the article content and return only that relevant part of the string
		
		results = results.map(function (article){
			return article.title;
		});

		res.json(results);
	});
});

//get the article that matches the specified id and increments the views counter
router.get("/:id", function (req, res, next) {
	ArticleModel.getById(parseInt(req.params.id), function (err, result) {
		if (err) {
			return next(err);
		}
		
		if(result){
			ArticleModel.addArticleView(req.params.id);
		}

		res.json(result);
	});
});

module.exports = router;
