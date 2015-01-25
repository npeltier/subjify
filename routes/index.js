var express = require('express');
var Subjy = require('../models/Subjy');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	Subjy.find(function (err, subjies){
		if (err) next(err);
		res.render('index', { title: 'Subjify', subjies: subjies });
	});
});
module.exports = router;
