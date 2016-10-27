var User = require('./User'),
	neo4j = require('neo4j-driver').v1,
	Url = require('../lib/url'),
	q = require("q");
module.exports = {
	getTopSubjies : function() {
		return [];
	},
	getSubjy : function(subject) {
		var deferred = q.defer(),
			driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin")),
			neo4jSession = driver.session(),
			extractProperties = function(s, key){
				var array = [];
				s[key].forEach(function(node){
					array.push(node.properties);
				});
				s[key] = array;
			};
		neo4jSession.run("match (a:Author)-[:thinks]->(s:Subjy)-[:about]->(t:Tag), (s:Subjy)-[:then*]->(b:Block), (ai:Author)-[:thinks]->(si:Subjy)-[:inspired]->(s:Subjy) where s.slug={slug} return {p: properties(s), a: properties(a), t: collect(distinct(t)), b: collect(distinct(b)), inspired_by:{a:properties(ai),p:properties(si)}} as sub", {slug:subject})
		.catch(
			function(error) {
				defered.reject(error);
			}
		)
		.then(
			function(result) {
				var s = result.records[0].get("sub");
				extractProperties(s, "t");
				extractProperties(s, "b");
				deferred.resolve(s);
			}
		);
		return deferred.promise;
	}
};