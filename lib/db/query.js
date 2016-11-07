var neo4j = require('neo4j-driver').v1,
	q = require("q");

module.exports = {
	run : function(statement, param){
		var deferred = q.defer(),
			driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin")),
			neo4jSession = driver.session();
		neo4jSession.run(statement, param)
		.catch(
			function(error) {
				defered.reject(error);
			}
		)
		.then(
			function(result) {
				deferred.resolve(result);
				neo4jSession.close();
				driver.close();
			}
		)
		return deferred.promise;
	}
};