var Subjy = require('../../models/Subjy');

module.exports = function(req, res) {
	Subjy.getHomeData().then(function(data){
		res.render('index', { title: 'Subjify', subjies: data.s, tags: data.t, authors: data.a});
	});
};