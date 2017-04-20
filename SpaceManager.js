onGetPage("/vote",function(params,res){
	dbSearch({name:params.p},"spacelist",function(data){ 
		if(data){
			sendPage("/vote.html",res,data);
			return;
		}
		res.writeHead(302, {
			'Location': "/error",
		});
		res.end();
	});
});

onGetPage("/spaces",function(params,res){
	dbSearchGroup({},"spacelist",function(data){ 
		sendPage("/spaces.html",res,data);
	});
});

onGetPage("/signup",function(params,res){
    sendPage("/SignUp.html",res);
});

onGetPage("/post",function(params,res){
	sendPage("/post.html",res);
});

onGetPage("/account",function(params,res){
    sendPage("/account.html",res);
});

