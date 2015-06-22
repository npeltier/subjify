var express = require('express'),
	index = require('./routes/index'),
	profile = require('./routes/profile'),
	edit = require('./routes/edit'),
	subjy = require('./routes/subjy'),
	create = require('./routes/create');
module.exports = function(app, passport) {
	/* GET home page. */
	app.get('/', index);
	/* user edition pages */
	app.get('/:userName', profile);
	app.get('/:userName/edit/:subject', edit);

	/* subjy page */
	app.get('/:userName/subjies/:subject', subjy);

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/create', create);

	app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// error handlers
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}