

module.exports={
	function(db){
		db.serialize(function(){
			db.run("CREATE TABLE projects (id INTEGER PRIMARY KEY, version TEXT,");
			db.run("CREATE TABLE cards (... project_id REFERENCES projects(id))");
		});
	};
}