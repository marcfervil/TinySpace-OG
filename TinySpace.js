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

/*
			transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'tinyspace.co@gmail.com',
					pass: 'Phylum123'
				}
			});

			
			------------------
			mailOptions = {
					from: 'TinySpace! 😉 <tinyspace.co@gmail.com>', // sender address
					to: params.email, // list of receivers
					subject: 'Verify your account!', // Subject line
					text: 'click here to verify my account-> ', // plain text body
					html: 'click here to verify my account-> <a href="'+urls+'/validateAccount?c='+code+'">here</a>' // html body
				};
			--------------------

				mailOptions = {
					from: 'TinySpace! 😉 <tinyspace.co@gmail.com>', // sender address
					to: "mfervil@stu.naperville203.org", // list of receivers
					subject: 'Activate your TinySpace account!', // Subject line
					text: 'Click here to activate your account ', // plain text body
					html: 'Click here to activate your account <br> <a href="http://localhost:8090/validateAccount?c=fenwjifiuew8f998h32fh9823hf983h29f8h329">here</a>' // html body
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					console.log('Message %s sent: %s', info.messageId, info.response);
				});
				*/


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







