//install sqlite3 --save --save-exact (actually do this)
//install dependency?
//license "MIT"
var sqlite3=require('sqlite3');
var db=new sqlite3.Database('scrumtastic.sqlite3',function(err){
	if(err) console.error(err);
});//may have errors
var migrate=require('./lib/migration');
migrate(db, 'migrations', function(err){
	db.serialize(function(){
		db.run("INSERT INTO projects (name) values (?)", ['title']);
		db.all("SELECT * FROM projects", [], function(err, rows){
			if(err) return console.error(err);
			console.log("ROWS:", rows);
		});
	});
});
