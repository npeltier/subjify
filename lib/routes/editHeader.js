var Subjy = require('../../models/Subjy'),
	User = require('../../models/User'),
	Url = require('../url');
module.exports = function(req, res) {
	if (!req.user){
		res.redirect('/');
	}
	var subject = req.params.subject;
	if (req.body.title){
		Subjy.findOne({"slug":subject, "author":req.user.name}, function(e, subjy){
			subjy.title = req.body.title;
			subjy.save(function (err) {
				if (err) {
					console.log(err.message);
					if (err.errors) {
						console.log(err.errors);
					}
					res.status(500);
					res.render('error', {
						status: 500,
						message: "subjy couldn't be saved" + err.message
					});
				} else {
					console.log("saved");
					res.status(200);
					res.end("saved");
				}
			});
		});
	} else {
		res.status(400);
		res.render('error', {
			status: 400,
			message: "nothing to save"
		});
	}
};