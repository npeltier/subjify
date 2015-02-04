var Subjy = require('../../models/Subjy'),
	User = require('../../models/User');
module.exports = function(req, res) {
	Subjy.findSubjiesFrom(req.params.userName, function(err, subjies) {
		res.render('profile', { title: 'Profile de ' + req.params.userName, user : req.user, subjies: subjies });
	});
};