module.exports = {
	getSlug : function(name){
		var lowerCase = name.toLowerCase();
		return lowerCase.replace(/[\s\.&]/g,"-");
	}
}