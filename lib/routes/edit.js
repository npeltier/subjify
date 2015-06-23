var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	if (!req.user || (req.params.userName !== req.user.name) || !req.params.subject){
		res.redirect('/' + req.params.userName);
	}
	Subjy.findOne({'author':req.user.name, 'slug': req.params.subject}, function(err, subjy){
		if (err) {
			console.log(err.message);
			res.status(500);
			res.render('error', {
				status: 500,
				message: "can't find subjy: " + err.message
			});
		} else {
			res.render('subjy', { title: 'Subjify!', user : req.user, subjy: subjy, edit: true });
		}
	});
};