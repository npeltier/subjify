var subjy = require('../../models/Subjy');

module.exports = function(req, res) {
	res.render('index', { title: 'Subjify', subjies: subjy.getTopSubjies()});
};