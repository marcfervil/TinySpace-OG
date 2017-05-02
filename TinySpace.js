http = require('http');
util = require('util');
fs = require('fs');
path = require('path');
urlLib = require('url');
sha1 = require('sha1');
nodemailer = require('nodemailer');
mongoUtil = require('./DBConnection');

nodeImport= function (file){
	eval(fs.readFileSync(file).toString());
}

debug=false;


ip= "10.0.0.18";
port = 80;

mongoUtil.connectToServer( function( err ) {
    console.log("connected to db!");

		nodeImport("Util.js");
		nodeImport("DBManager.js");
		nodeImport("TinyServer.js");
		nodeImport("UserManager.js");
		nodeImport("SpaceManager.js");
		nodeImport("SocketManager.js");
	});

//console.log(xssFilter("<br>"));

var date = new Date();

var output="";

sendData="";

var currentParams="";

var sessionData=[];







