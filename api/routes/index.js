var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {

	//TODO:
	//maybe list all supported API functions?

	res.json({
		data: "you have called the root /api endpoint"
	});
});

//TODO
//add the validator middleware that checks all request params for every API request

router.use("/article", require("./article"));
router.use("/user", require("./user"));


module.exports = router;
