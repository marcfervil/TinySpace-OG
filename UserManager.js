


onGetPage("/login",function(params,res){
	sendPage("/login.html",res);
});

onGetPage("/",function(params,res){
	sendPage("/hello.html",res);
});

deleteCookie = function() {
    document.cookie = "tinySession";
}

login=function(user,res){
	sessionId=sha1(Math.random());
	sessionData.push( {id:sessionId,username:user} );

	mins=40;

	res.writeHead(302, {
		'Location': "/spaces",
		'Set-Cookie': 'tinySession='+sessionId+'; expires='+new Date(new Date().getTime()+(mins * 60 * 1000)).toUTCString(),
	});
	res.end();
}


onGetPage("/validateAccount",function(params,res){
	dbSearch({status:params.c},"users",function(result,err){
		if(result){
			MongoClient.connect(url, function(err, db) {
				db.collection('users').update(
 					{status:params.c},
 					{$set : {"status" : "active"}}
				);

				login(result.username,res);
			});
		}else{
			redirect("error.html",res);
		}
	});
});

onGetPage("/SignUpValidate",function(params,res){
//	dbSearch({username:params.username,email:params.email},"users",function(result,err){
		code=sha1(Math.random());
		//sucsess
	
			dbAdd('users',{
				username:xssFilter(params.username),
				password:sha1(params.password),
				email:xssFilter(params.email),
				score:0,
				status:code,
				upVotes:[],
				downVotes:[],
			},function(er, result){
				if(er){
					res.writeHead(302, {
						'Location': "/signup?invalid=y"
					});
					res.end();
				}

				transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'tinyspace.co@gmail.com',
						pass: 'Phylum123'
					}
				});

				urls="http://tinyspace.co";
				if(debug){
					urls="http://localhost:8090";
				}

				mailOptions = {
					from: 'TinySpace! 😉 <tinyspace.co@gmail.com>', // sender address
					to: params.email, // list of receivers
					subject: 'Verify your account!', // Subject line
					text: 'click here to verify my account-> ', // plain text body
					html: 'click here to verify my account-> <a href="'+urls+'/validateAccount?c='+code+'">here</a>' // html body
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					//console.log('Message %s sent: %s', info.messageId, info.response);
				});

				res.writeHead(302, {
					'Location': "/val.html"
				});
				res.end();
			});
		

	
//	});

});




onGetPage("/loginValidate",function(params,res){
	dbSearch({username:params.username},"users",function(e,err){	
		if(e){
			if(sha1(params.password)===e.password){

				if(e.status!="active"){
					res.writeHead(302, {
						'Location': "/login?invalid=i"
					});
					res.end();
					return;
				}

				sessionId=sha1(Math.random());

				sessionData.push( {id:sessionId,username:params.username} );

				mins=40;

				if(params.logged=="true"){
					
				}

				res.writeHead(302, {
					'Location': "/spaces",
					'Set-Cookie': 'tinySession='+sessionId+'; expires='+new Date(new Date().getTime()+(mins * 60 * 1000)).toUTCString(),
				});
				res.end();
				
				return;
			}
		}
		res.writeHead(302, {
			'Location': "/login?invalid=y"
		});
		res.end();
	});
});

