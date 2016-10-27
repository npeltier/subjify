var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	Subjy.getSubjy(req.params.subject).then(function (subjy){
		res.render('subjy', { title: subjy.p.title, user : req.user, subjy: subjy});
	});
};