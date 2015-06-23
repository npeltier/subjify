var Subjy = require('../../models/Subjy'),
	User = require('../../models/User'),
	Url = require('../url');
module.exports = function(req, res) {
	if (!req.user){
		res.redirect('/');
	}
	var subject = req.params.subject,
		slug = Url.getSlug(subject);
	if (!subject || subject.trim() == "") {
		res.status(400);
		res.render('error', {
			message: "a valid subject parameter is mandatory"
		});
	}
	var subjy = new Subjy({"subject":subject, "slug":slug, "author":req.user.name});
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
			res.redirect("/" + req.user.name + "/edit/" + slug );
		}
	});
};