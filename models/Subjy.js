var mongoose = require('mongoose'),
	User = require('./User');
var Subjy = mongoose.model('Subjy', {
	"subject": { type: String, required: true},
	"font": { type: Number, required: true, ref: 'Font'},
	"rating": { type: Number, required: true},
	"title": { type: String, required: true},
	"date": { type: Date, required: true},
	"tags": { type: [String], index: true },
	"author": { type: Number, required: true, ref: 'User'},
	"blocks": [{
		"title": { type: String, required: true},
		"type": { type: String, required: true},
		"text": String
	}]
});

Subjy.findSubjiesFrom = function(userName, callback, limit) {
	limit = limit || 10;
	User.find({'name':userName}).exec(function(err, user) {
		if (err) {
			console.log(err);
			return;
		}
		Subjy.find({'author':user.id}, 'subject font rating title').exec(callback);
	});
};

module.exports = Subjy;