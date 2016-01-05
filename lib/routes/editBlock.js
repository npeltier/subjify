var Subjy = require('../../models/Subjy'),
	User = require('../../models/User'),
	Url = require('../url');
module.exports = function(req, res) {
	if (!req.user){
		res.redirect('/');
	}
	var subject = req.params.subject,
		id = req.params.block,
		type = req.body.type;
	if (id && type) {
		Subjy.findOne({"slug":subject, "author":req.user.name}, function(e, subjy){
			if (!subjy.blocks){
				subjy.blocks = [];
			}
			var existingBlock = id == subjy.blocks.length ? {} : subjy.blocks[id];
			block = {
				title: req.body.title || existingBlock.title,
				type: type || existingBlock.type,
				text: text || existingBlock.text
			};
			subjy.blocks.push(block);
			subjy.save(function (err) {
				if (err) {
					console.log(err.message);
					if (err.errors) {
						console.log(err.errors);
					}
					res.status(500);
					res.render('error', {
						status: 500,
						message: "subjy's block couldn't be saved" + err.message
					});
				} else {
					console.log("saved");
					res.status(200);
					res.end("saved");
				}
			});
		});

	} else {
		res.status(400);
		res.render('error', {
			status: 400,
			message: "nothing to save"
		});
	}
};