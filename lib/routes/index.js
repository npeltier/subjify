var Subjy = require('../../models/Subjy');
module.exports = function(req, res) {
	res.render('index', { title: 'Subjify', subjies: [Subjy.getSample()]});
};