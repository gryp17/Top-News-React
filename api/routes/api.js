var express = require("express");
var router = express.Router();

var ArticleModel = require("../models/article");

router.get("/", function (req, res, next) {
	
	//TODO:
	//maybe list all supported API functions?
	
	res.json({
		data: "you have called the root /api endpoint"
	});
});

//TODO
//add the validator middleware that checks all request params for every API request

//get all articles from the specified category
router.get("/articles/:category/:searchTerm/:limit/:offset", function (req, res, next){
	ArticleModel.get(req.params.category, req.params.searchTerm, parseInt(req.params.limit), parseInt(req.params.offset), function (err, results){
		if(err){
			return next(err);
		}

		res.json(results);
	});
});

module.exports = router;
