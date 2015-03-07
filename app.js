var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// db
var dbConnect = process.env.DB ? process.env.DB.toString() : 'localhost';
mongoose.connect(dbConnect);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('db connection opened');
	var app = express();
	app.set('port', process.env.PORT || 3000);
	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(require('less-middleware')(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));


	// required for passport
	require('./lib/passport')(app, passport);
	app.use(session({ secret: 'k123.?&=KL-nqsd@éx;D0)941sam§' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash());
	require('./lib/routes')(app, passport);

	var server = app.listen(app.get('port'), function() {
	  console.log('Express server listening on port ' + server.address().port);
	});
	module.exports = app;
});