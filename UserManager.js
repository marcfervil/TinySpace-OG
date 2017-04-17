


onGetPage("/login",function(params,res){
	sendPage("/login.html",res);
});

onGetPage("/",function(params,res){
	sendPage("/hello.html",res);
});


onGetPage("/loginValidate",function(params,res){
	dbSearch({username:params.username},"users",function(e,err){	
		if(e){
			if(params.password===e.password){
				sessionId=sha1(Math.random());
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
});

