http = require('http');
util = require('util');
fs = require('fs');
path = require('path');
urlLib = require('url');
sha1 = require('sha1');
nodemailer = require('nodemailer');

function nodeImport(file){
	eval(fs.readFileSync(file).toString());
}

debug=true;

port = 8090;
ip= "localhost";

nodeImport("Util.js");
nodeImport("DBManager.js");
nodeImport("TinyServer.js");

nodeImport("UserManager.js");
nodeImport("SpaceManager.js");
nodeImport("SocketManager.js");


//console.log(xssFilter("<br>"));

var date = new Date();

var output="";

sendData="";

var currentParams="";

var sessionData=[];







