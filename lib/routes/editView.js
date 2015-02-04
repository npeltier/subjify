var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	if (!req.user || (req.params.userName !== req.user.name)){
		res.redirect('/' + req.params.userName);
	}
	res.render('edit', { title: 'Subjify!', user : req.user, subjy: req.params.subjy });
};