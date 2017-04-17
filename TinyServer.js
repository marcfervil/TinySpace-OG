cookies=[];



websiteReturns={

/*
	"/":function(params,res){
		return getPage("/hello.html");
	},

	"/login":function(params,res){
		return getPage("/login.html");
	},

	"/message":function(params,res){
		//this for testing
		return params.m;
	},

	"/spaces":function(params,res){
		return getPage("/spaces.html");
	},

	"/viewspace":function(params,res){
		return getPage("/viewspace.html");
	},

	"/post":function(params,res){
		return getPage("/post.html");
	}*/
};

TinyCompile=function(str){
	while(str.indexOf("<tiny>")!=-1){
		compVal=str.substring(str.indexOf("<tiny>")+6,str.indexOf("</tiny>"));
		compValFul=str.substring(str.indexOf("<tiny>"),str.indexOf("</tiny>")+7);
		
		try{
			eval(compVal);
		}catch(err){
			output=err;
		}

		display=output;
		str=str.replace(compValFul,display);
		output="";
	}
	
	return str;
}


onGetPage=function(url,callback){
	websiteReturns[url]=callback;
}

sendPage=function(page,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(TinyCompile(readFile("WebContent"+page)));
	res.end();
}

server = http.createServer(function(req, res) {
	cookies=parseCookies(req);
    URL=urlLib.parse(req.url).pathname;
	URLparams=urlLib.parse(req.url, true).query;
	response="";
	sendData=res;
	currentParams=URLparams;
	if(typeof websiteReturns[URL] === "function"){
		response=websiteReturns[URL](URLparams,res);
	}else if(typeof redirections[URL] === "function"){
		redirections[URL](URLparams,res);
		return;
	}else{
		//response=getPage(URL);
		sendPage(URL,res);
	}
});
 



server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});
