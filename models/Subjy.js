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

Subjy.getSample = function(){
	return {
		"subject": {s:"free-will","t":"Free Will"},
		"title": "Free will is our engine",
		"date": "2012-02-12",
		"tags": ["philosophy","happiness","morality","good vs evil", "determinism","structuralism"],
		"author": {"s":"francois", "t":"François"},
		"blocks": [{
			"t":"there are nice people, there are bad people"
		},{
			"t":"but basically at some point everybody has the choice to do the right thing"
		},{
			"t":"you are free, this is a great power, but this comes with great responsabilities"
		}],
		"inspiration":{
			"subject": {"s":"michael-jackson","t":"Michael Jackson"},
			"author": {"slug":"tom", "t":"Tom"},
			"title": "\"Who's bad\" is the best song ever written"
		}
	};
}

module.exports = Subjy;