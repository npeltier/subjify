var Subjy = require('../../models/Subjy'),
	User = require('../../models/User');
module.exports = function(req, res) {
	if (!req.user){
		res.redirect('/');
	}
	if (!req.param.subject || req.param.subject.trim() == "") {
		res.status(400);
		res.render('error', {
			message: "a valid subject parameter is mandatory"
		});
	}
	var subjy = new Subjy({"author":req.user.name});
	subjy.save(function (err) {
		if (err) {
			console.log(err.message);
			res.status(500);
			res.render('error', {
				status: 500,
				message: "subjy couldn't be saved" + err.message
			});
		} else {
			res.redirect("/" + req.user.name + "/edit/" + req.param.subject);
		}
	});
};