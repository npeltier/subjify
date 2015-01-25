var mongoose = require('mongoose');
module.exports = mongoose.model('Subjy', {
	"subject": String,
	"title": String,
	"author": String
});