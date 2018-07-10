var express = require("express");
var router = express.Router();

var ArticleModel = require("../models/article");

//get all articles from the specified category and/or search term
router.get("/:category/:searchTerm/:limit/:offset", function (req, res, next) {
	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), parseInt(req.params.offset), function (err, results) {
		if (err) {
			return next(err);
		}

		res.json(results);
	});
});

//get the article that matches the specified id
router.get("/:id", function (req, res, next) {
	ArticleModel.getById(parseInt(req.params.id), function (err, result) {
		if (err) {
			return next(err);
		}

		res.json(result);
	});
});

module.exports = router;