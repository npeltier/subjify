var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	if (!req.user || (req.params.userName !== req.user.name)){
		res.redirect('/' + req.params.userName);
	}
	res.render('subjy', { title: 'Subjify!', user : req.user, subjy: Subjy.getSample(), edit: true });
};