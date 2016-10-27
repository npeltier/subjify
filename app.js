var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash'),
	fs = require('fs'),
	neo4j = require('neo4j-driver').v1,
	driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin")),
	neo4jSession = driver.session();
	neo4jSession.run("match (n) detach delete n").then(
		function() {
			console.info("cleaned up current graph");
			fs.readFile('./sample.txt', 'utf8',
				function (err,data) {
					if (err) {
						console.error(err);
						return;
					}
					neo4jSession.run(data)
					.catch(function( error) {
						console.error("unable to start with sample data :" + error);
					})
					.then( function( result ) {
						console.log('sample data created');
						neo4jSession.close();
						driver.close();
						var app = express();
						app.set('port', process.env.PORT || 3000);
						// view engine setup
						app.set('views', path.join(__dirname, 'views'));
						app.set('view engine', 'pug');
						app.use(logger('dev'));
						app.use(bodyParser.json());
						app.use(bodyParser.urlencoded({ extended: false }));
						app.use(cookieParser());
						app.use(require('less-middleware')(path.join(__dirname, 'public')));
						app.use(express.static(path.join(__dirname, 'public')));
						require('./lib/routes')(app);
						console.info("about to start the server");
						var server = app.listen(app.get('port'), function() {
						  console.log('Express server listening on port ' + server.address().port);
						});
						module.exports = app;
				});
			});
	});
