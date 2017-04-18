onGetPage("/viewspace",function(params,res){
	sendPage("/viewspace.html",res);
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