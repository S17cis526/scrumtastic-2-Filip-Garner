"use strict";


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

var router = new require(('./lib/route').Router);

router.get('/',function(req, res){
	fs.readFile('public/index.html', function(err,body){
		res.end(body);
	});
});

router.get('/app.js',function(req, res){
	fs.readFile('public/app.js', function(err,body){
		res.end(body);
	});
});

router.get('/projects',function(req,res){
	db.all('SELECT * FROM projects',[],function(err,projects){
		res.setHeader('Content-Type');
		res.end()
	})
});

var migrate = require('./lib/migrate');


migrate(db, 'migrations', function(err){
	var server=new http.Server(function(req,res){
		router.route(req,res);
	});//need to have the function call 'inside' the creation of the server so that the object is not 'replaced' with the server when referencing itself
  /*db.serialize(function(){
    db.run("INSERT INTO projects (name) values (?)", ['title']);
    db.all("SELECT * FROM projects", [], function(err, rows){
      if(err) return console.error(err);
      console.log("ROWS:", rows);//example database functionality
    });
  });*/
});
