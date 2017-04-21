


onGetPage("/login",function(params,res){
	sendPage("/login.html",res);
});

onGetPage("/",function(params,res){
	sendPage("/hello.html",res);
});


onGetPage("/SignUpValidate",function(params,res){
	dbSearch({username:params.username,email:params.email},"users",function(result,err){
		if(result){
            res.writeHead(302, {
                'Location': "/SignUp?invalid=y"
            });
            res.end();
            return;
		}
		//sucsess
		dbAdd('users',{
			username:params.username,
			password:sha1(params.password),
			email:params.email,
            score:0,
            upVotes:[],
            downVotes:[],
        });
        sessionId=sha1(Math.random());
        res.writeHead(302, {
            'Location': "/spaces",
            'Set-Cookie': 'tinySession='+sessionId+'; expires='+new Date(new Date().getTime()+(40 * 60 * 1000)).toUTCString(),
        });
        res.end();
        sessionData.push( {id:sessionId,username:params.username} );
	});

});

onGetPage("/loginValidate",function(params,res){
	dbSearch({username:params.username},"users",function(e,err){	
		if(e){
			if(sha1(params.password)===e.password){
				sessionId=sha1(Math.random());

				sessionData.push( {id:sessionId,username:params.username} );

				res.writeHead(302, {
					'Location': "/spaces",
					'Set-Cookie': 'tinySession='+sessionId+'; expires='+new Date(new Date().getTime()+(40 * 60 * 1000)).toUTCString(),
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

