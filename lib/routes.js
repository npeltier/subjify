var express = require('express');
var Subjy = require('../models/Subjy');

module.exports = function(app, passport) {
	/* GET home page. */
	app.get('/', function(req, res) {
		Subjy.find(function (err, subjies){
			if (err) next(err);
			res.render('index', { title: 'Subjify', subjies: subjies });
		});
	});

	app.get('/login.html', function(req, res) {
		res.render('login', {title: 'Login', message: req.flash('loginMessage')});
	});


	// process the login form
	app.post('/login.html', passport.authenticate('local-login', {
		successRedirect : '/profile.html', // redirect to the secure profile section
		failureRedirect : '/login.html', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/signup.html', function(req, res) {
		res.render('signup', {title: 'Signup', message: req.flash('signupMessage')});
	});


	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile.html	', // redirect to the secure profile section
		failureRedirect : '/signup.html', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/profile.html', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});

	app.get('/logout.html', function(req, res) {
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}