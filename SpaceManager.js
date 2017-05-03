mongo = require('mongodb')
onGetPage("/vote",function(params,res){
	dbSearch({name:params.p},"spacelist",function(data){ 
		if(data){
			sendPageWithValidation("/vote.html",res,data);
			return;
		}
		res.writeHead(302, {
			'Location': "/spaces",
		});
		res.end();
	});
});
//for db search groupthing your searching for, document, callback (delete this comment, it belongds in dbmanager
onGetPage("/fetchPost", function(params,res){

	pid=new mongo.ObjectId(params.id);
	dbSearch({_id:pid},"spaces",function(data){
		//if(data) {
            sendPageWithValidation("/fetchPost.html", res, data);
        //}
	});
});


onGetPage("/spaces",function(params,res){
	dbSearchGroup({},"spacelist",function(data){
		sendPageWithValidation("/spaces.html",res,data);
		//sendPage("/spaces.html",res,data);
	});
});

if(alpha){
	onGetPage("/signup.html",function(params,res){
		sendPage("/nocode.html",res);
	});
}

onGetPage("/signup",function(params,res){
	//console.log("alpha: "+alpha);
	if(alpha){
		dbSearch({code:params.c},"codes",function(data){ 
			//console.log("data: "+if(data));
			if(data){
				//db.collection("codes").dropIndex({code : params.c });
				db.collection("codes").deleteMany({code:params.c});
				sendPage("/SignUp.html",res,data);	
			}else{
				sendPage("/nocode.html",res,data);
			}
		});
	}else{
    	sendPage("/SignUp.html",res);
	}
});

onGetPage("/post",function(params,res){
	sendPageWithValidation("/post.html",res);
});

onGetPage("/account",function(params,res){
    sendPageWithValidation("/account.html",res);
});

