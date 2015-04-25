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

Subjy.getSample = function() {
	return {
		"subject":"Glenn Gould",
		"font":{
			"url":"http://fonts.googleapis.com/css?family=Special+Elite",
		},
		"rating":18,
		"title":"Ce maître, ce génie a changé ma vie",
		"date":"2015/04/12",
		"tags":["musique","piano","bach","chef d'oeuvre","composition musique"],
		"author":"chico",
		"blocks":[{
				"title": "La précision du maître à travers le temps",
				"type": "video",
				"text": "Je n’ai pas découvert Glenn Gould en voyant cette vidéo. Non, j’ai reçu la passion pour Glenn Gould en héritage de longues heures passées avec un ami à boire des bières fortes. Mais, n’ayant pas l’opportunité (malheureusement) chers lecteurs de partager  des bulles houblonées avec vous, j’ai choisi de commencer votre initiation Glenn Gouldesse par ce montage.<br>Il me parait essentiel d’apprécier avant tout la prouesse technique du virtuose à travers les ages. La mélodie de cette Fugue à 4, n’a pas variée d’un pouce de 1963 à 1980 ! Le rythme, l’intonation de chaque note est restée strictement la même...<br><br>Je vous laisse apprécier cet instant de pur prouesse technique :"
			},{
				"title": "La précision du maître à travers le temps",
				"type": "video",
				"text": "Je n’ai pas découvert Glenn Gould en voyant cette vidéo. Non, j’ai reçu la passion pour Glenn Gould en héritage de longues heures passées avec un ami à boire des bières fortes. Mais, n’ayant pas l’opportunité (malheureusement) chers lecteurs de partager  des bulles houblonées avec vous, j’ai choisi de commencer votre initiation Glenn Gouldesse par ce montage.<br>Il me parait essentiel d’apprécier avant tout la prouesse technique du virtuose à travers les ages. La mélodie de cette Fugue à 4, n’a pas variée d’un pouce de 1963 à 1980 ! Le rythme, l’intonation de chaque note est restée strictement la même...<br><br>Je vous laisse apprécier cet instant de pur prouesse technique :"
			}
		]
	}
}

module.exports = Subjy;