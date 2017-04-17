http = require('http');
util = require('util');
fs = require('fs');
path = require('path');
urlLib = require('url');
sha1 = require('sha1');

//http://stackoverflow.com/questions/20803512/mongo-find-documents-that-do-not-contain-a-given-value-using-not

function nodeImport(file){
	eval(readFile(file));
}


port = 8090;
ip= "localhost";

nodeImport("TinyServer.js");
nodeImport("DBManager.js");
nodeImport("UserManager.js");
nodeImport("SpaceManager.js");
nodeImport("SocketManager.js");

var date = new Date();

var output="";

sendData="";

var currentParams="";

var sessionData=[];







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





function getSessionVal(val){
	id=cookies["tinySession"];
	for(var i=0;i<sessionData.length;i++){
		if(sessionData[i].id==id){
			//console.log(sessionData[i]);
			return sessionData[i][val];
		}
	}
	return "could not find session value '"+val+"'";
}


redirections={

	"/loginValidate":function(params,res){
		console.log("user: "+params.username);
		

		//return page;
	
	}
};


/*
				dbSearch({username:"TestUser!"},'spaces',function(msg){
					log(msg.content);

				});

*/









function parseCookies (request) {
    var list = {},
    rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}






/*
setInterval(function(){

 	//console.log("test "+Math.random());

}, 100);
*/

/*
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 

    str= d.toString().trim();

   if(str=="sessions"){
   		console.log(cookies);
   }
  });
*/
/*
var port = 80;
var ip= "10.0.0.18";
server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});
*/