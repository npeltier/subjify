var neo4j = require('neo4j-driver').v1,
	q = require("q"),
	query = require("./query"),
	extractProperties = function(s, key){
		var array = [];
		s[key].forEach(function(node){
			array.push(node.properties);
		});
		s[key] = array;
	};
module.exports = {
	/**
	 * returns home data
	 */
	getHomeData : function() {
		var deferred = q.defer();
		query.run("match (a:User),(s:Subjy), (t:Tag) return {a:collect(distinct(a)),s:collect(distinct(s)),t:collect(distinct(t))} as home").then(
			function(result) {
				var s = result.records[0].get("home");
				extractProperties(s, "t");
				extractProperties(s, "s");
				extractProperties(s, "a");
				console.info(s);
				deferred.resolve(s);
			}
		);
		return deferred.promise;
	},
	/**
	 * returns promise with subjy corresponding to the subject
	 */
	getSubjy : function(subject) {
		var deferred = q.defer();
		query.run("match (a:User)-[:thinks]->(s:Subjy)-[:about]->(t:Tag), (s:Subjy)-[:then*]->(b:Block), (ai:User)-[:thinks]->(si:Subjy)-[:inspired]->(s:Subjy) where s.id={id} return {p: properties(s), a: properties(a), t: collect(distinct(t)), b: collect(distinct(b)), inspired_by:{a:properties(ai),p:properties(si)}} as sub", {id:subject})
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