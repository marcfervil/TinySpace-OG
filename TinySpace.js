var http = require('http');
var util = require('util');
var fs = require('fs');
var path = require('path');
var urlLib = require('url');
var sha1 = require('sha1');

var date = new Date();

var output="";

sendData="";

var currentParams="";

var sessionData=[];

var cookies=[];


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/tinyspace';


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function readFile(path){
	try {
		return fs.readFileSync(path).toString();
	}catch(err) {
    	return fs.readFileSync("WebContent/error.html").toString();
	}
}

function getPage(page){
	return TinyCompile(readFile("WebContent"+page))
}

function log(val){
	output+=val;
	return "";
}

websiteReturns={

	"/":function(params){
		return getPage("/hello.html");
	},

	"/login":function(params){
		return getPage("/login.html");
	},

	"/message":function(params){
		//this for testing
		return params.m;
	},

	"/spaces":function(params){
		return getPage("/spaces.html");
	},

};

function getSessionVal(val){
	id=cookies["tinySession"];
	for(var i=0;i<sessionData.length;i++){
		if(sessionData[i].id==id){
			//console.log(sessionData[i]);
			return sessionData[i][val];
		}
	}
	return "error";
}


redirections={

	"/loginValidate":function(params,res){
		console.log("user: "+params.username);
		dbSearch({username:params.username},"users",function(e,err){
			
			if(e){
				if(params.password===e.password){
					sessionId=Math.random();
					res.writeHead(302, {
						'Location': "/spaces",
						'Set-Cookie': 'tinySession='+sessionId+'; expires='+new Date(new Date().getTime()+(40 * 60 * 1000)).toUTCString(),
					});
					res.end();
					sessionData.push( {id:sessionId,username:params.username} );
					return;
				}
			}
			res.writeHead(302, {
				'Location': "/login?invalid=y"
			});
			res.end();
		});

		//return page;
	
	}
};


/*
				dbSearch({username:"TestUser!"},'spaces',function(msg){
					log(msg.content);

				});

*/
MongoClient.connect(url, function(err, db) {
	//console.log("connected to db!");
	db.collection('spaces').remove();
	db.collection('users').remove();
    db.collection('spaces').insertOne({
        username:"TestUser!",
        rating:55,
        id:"2324t309fjg98j9v9r8e8hg4",
        type:"text",
        content:"Yes hello, this is content!"
    });

     db.collection('users').insertOne({
        username:"marc",
        password:"nohash",
        score:5348753,
        upVotes:[],
        downVotes:[],
        id:"fj8wg7ehg873h"
    });

      db.collection('users').insertOne({
        username:"test",
        password:"test",
        score:4546543,
        upVotes:[],
        downVotes:[],
        id:"ewoifhfuewhfi"
    });
});

function dbSearch(search,dbDocument,callback){
	MongoClient.connect(url, function(err, db) {
	 	db.collection(dbDocument).findOne(search,function(err, doc) {
	    	callback(doc,err);
		});
	});
}



function TinyCompile(str){
	while(str.indexOf("<tiny>")!=-1){
		compVal=str.substring(str.indexOf("<tiny>")+6,str.indexOf("</tiny>"));
		compValFul=str.substring(str.indexOf("<tiny>"),str.indexOf("</tiny>")+7);
		
		try{
			eval(compVal);
		}catch(err){
			output=err;
		}

		display=output;
		str=str.replace(compValFul,display);
		output="";
	}
	
	return str;
}

function parseCookies (request) {
    var list = {},
    rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}


var server = http.createServer(function(req, res) {
	cookies=parseCookies(req);
    URL=urlLib.parse(req.url).pathname;
	URLparams=urlLib.parse(req.url, true).query;
	response="";
	sendData=res;
	currentParams=URLparams;
	if(typeof websiteReturns[URL] === "function"){
		response=websiteReturns[URL](URLparams);
	}else if(typeof redirections[URL] === "function"){
		redirections[URL](URLparams,res);
		return;
	}else{
		response=getPage(URL);
	}

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(response);
	res.end();

});
 
 
var port = 8090;
var ip= "localhost";
server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});


setInterval(function(){

 	//console.log("test "+Math.random());

}, 100);

/*
var port = 80;
var ip= "10.0.0.18";
server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});
*/