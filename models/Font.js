var mongoose = require('mongoose');
module.exports = mongoose.model('Font', {
	"url": { type: String, required: true},
	"title": { type: String, required: true},
	"size": { type: String},
	"weight": { type: Number}
});