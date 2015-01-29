var express = require('express');
var Subjy = require('../models/Subjy');

module.exports = function(app, passport) {
	/* GET home page. */
	app.get('/', function(req, res) {
		Subjy.find(function (err, subjies){
			if (err) next(err);
			res.render('index', { title: 'Subjify', user : req.user, subjies: subjies });
		});
	});

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

	app.post('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/profile.html', function(req, res) {
		res.render('profile', {
			user : req.user
		});
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