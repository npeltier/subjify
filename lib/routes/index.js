var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	Subjy.find(function (err, subjies){
		if (err)
			next(err);
		res.render('index', { title: 'Subjify', user : req.user, subjies: subjies, sample: Subjy.getSample() });
	});
};