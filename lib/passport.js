// expose this function to our app using module.exports
module.exports = function(app, passport) {
	require("./passport/local")(app, passport);
	require("./passport/twitter")(app, passport);
};