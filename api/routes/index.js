var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {

	//TODO:
	//maybe list all supported API functions?

	res.json({
		data: "You have called the root /api endpoint"
	});
});



router.use("/article", require("./article"));
router.use("/article-comment/", require("./article-comment"));
router.use("/user", require("./user"));


module.exports = router;
