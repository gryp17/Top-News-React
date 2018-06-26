var express = require("express");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var path = require("path");

var app = module.exports = express();

//get the environment 
var environment = process.env.NODE_ENV || "development";

//get config from the environment 
var config = require("./config/" + environment);

//store the config
app.set("config", config);

//create a session mysql store and save it in the app so that can be accessed from the other modules
var sessionStore = new MySQLStore({
	host: config.db.host,
	database: config.db.database,
	user: config.db.user,
	password: config.db.password,
	schema: {
		tableName: config.session.tableName
	}
});

app.set("sessionStore", sessionStore);

app.use(session({
	store: sessionStore,
	secret: config.session.secret,
	key: config.session.sessionId,
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var publicDir = path.join(__dirname, "../public");

//set the "public" directory as static
app.use(express.static(publicDir));
app.use(favicon(path.join(publicDir, "/img", "favicon.ico")));

//routes
app.use("/api", require("./routes/api"));

//redirect all other GET requests to the index.html file (all routing is handled by the react router)
app.get("*", function (req, res){
	res.sendFile(publicDir+"/index.html");
});

//redirect the rest of the requests (probably AJAX POST requests) to the not found handler
app.all("*", function (req, res){
	res.status(404).json({
		errors: {
			api: "URL not found"
		}
	});
});

app.listen(config.port, function () {
	console.log("listening on port " + config.port);
});
