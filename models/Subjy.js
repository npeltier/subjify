var mongoose = require('mongoose'),
	User = require('./User'),
	Url = require('../lib/url');
var Subjy = mongoose.model('Subjy', {
	"subject": { type: String, required: true},
	"slug": {type: String, required: true, index: true},
	"title": { type: String},
	"date": { type: Date},
	"tags": { type: [String], index: true },
	"author": { type: String, required: true, ref: 'User'},
	"blocks": [{
		"title": { type: String},
		"text": String
	}]
});

module.exports = Subjy;