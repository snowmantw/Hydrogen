var ejs = require('ejs');			//Template engine
var cradle = require('cradle');		//CouchDB Driver
var express = require('express');
var uuid = require('node-uuid');
var fs = require('fs');

//TODO: Bad. Should be a env variable.
//TODO: Bad AGAIN : No httpS supported in cradle...?
var DBURL = 'http://vanilla';
var DBAUTH= {username:'hydrogen',password:'hydrogen'};
var DBPORT= 5984;

//var DBURL = '140.119.164.163';
//var DBPORT= 5984;

var dbconnect = new(cradle.Connection)({
  host: DBURL,
  port: DBPORT,
  cache: true,
  raw: false
});

var db = dbconnect.database('hydrogen');

db.exists(function(err,exists)
{
	console.log(exists);

	console.log("Test if db exists.");
	if(err)
	{
		console.log(err);
	}
	else if('undefined' == typeof exists)
	{
		console.log("Database don't exists.");
		db.create();
		console.log("Creating it done.");
	}
	else
	{
		console.log("Database is OK.");
	}
});

var app = express.createServer(express.logger());
app.configure(function()
{
	app.set('views', __dirname + '/client/template');
	app.set("view options",{layout:false});
	app.use(express.bodyParser());
	app.use('/public',express.static(__dirname + '/client/public'));
	app.use('/style',express.static(__dirname + '/client/style'));
	app.use('/source',express.static(__dirname + '/client/source'));
	app.use('/library',express.static(__dirname + '/client/library'));
});

app.get('/',function(req,res){
	res.render('index.ejs');
});

app.post('/postGlyph',function(req,res){
	var id = uuid();
//	db.save(id,JSON.parse(req.body));
	db.save(id,req.body);

	res.send(JSON.stringify({'id':id}));
});

app.post('/deleteGlyph',function(req,res){
	var id = req.body.id;
	db.remove(id);
	
	res.send(JSON.stringify({'id':id}));
});


/*
app.get('/fetchGlyph',function(req,res){
	db.get(req.param('id'),function(err,json_data)
	{
		try{
			var doc = JSON.parse(json_data);
		}catch(er)
		{
			console.log(er);
			throw new Error();
		}
		res.send(JSON.stringify({'name':doc.name,'points':doc.points}));
	});
});
*/
	
app.get('/fetchAllGlyph',function(req,res){
	db.all(function(err,arrinfo){
		if(err)	{
			console.error(err);
			throw new Error(); 
		}

		if(0 == arrinfo.length){
			res.send(JSON.stringify([]));
			return ;
		}

		var arr_glyph = [];

		for(var itr in arrinfo) {
			console.log(arrinfo[itr].id);

			//Async get in a loop.
			db.get(arrinfo[itr].id,function(err,json_data) {
				var doc = JSON.parse(json_data);

				arr_glyph.push({'name' : doc.name , 'points' : doc.points,'id' : doc._id});

				//Each async handler must judge if it's last one and do the "join" work.
				//The last one in the array IS/ISN't the result of "this get".
				if(arrinfo[arrinfo.length - 1].id == doc._id)	
				{
					res.send(JSON.stringify(arr_glyph));

				}	
			});
		}
	});
});

/*
app.get('/fetch',function(req,res)
{
	db.get(req.param('id'),function(err,json_data)
	{
		try{
			var doc = JSON.parse(json_data);
		}catch(er)
		{
			console.log(er);
			throw new Error();
		}
		res.send(JSON.stringify({'name':doc.name,'message':doc.message}));
	});
});

app.post('/postMessage',function(req,res)
{
	var id = uuid();
	db.save(id,{'name':req.body.name,'message':req.body.message});
	res.send(JSON.stringify({'id':id}));
});



*/

var port = process.env.PORT || 3000
app.listen(port,function(){
	console.log("Listen on " + port);
});

