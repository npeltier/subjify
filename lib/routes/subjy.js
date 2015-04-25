var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	res.render('subjy', { title: 'Subjify!', user : req.user, subjy: Subjy.getSample()});
};