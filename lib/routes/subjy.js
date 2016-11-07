var Subjy = require('../db/Subjy');

module.exports = function(req, res) {
	Subjy.getSubjy(req.params.subject).then(function (subjy){
		res.render('subjy', { title: subjy.p.name, user : req.user, subjy: subjy});
	});
};