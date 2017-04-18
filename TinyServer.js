cookies=[];


port = 8090;
ip= "localhost";

function getSessionVal(val){
	id=cookies["tinySession"];
	for(var i=0;i<sessionData.length;i++){
		if(sessionData[i].id==id){
			//console.log(sessionData[i]);
			return sessionData[i][val];
		}
	}
	return "could not find session value '"+val+"'";
}

function getPage(page){
	return TinyCompile(readFile("WebContent"+page))
}

function log(val){
	output+=val;
	return "";
}



websiteReturns={};

TinyCompile=function(str){
	while(str.indexOf("<tiny>")!=-1){
		compVal=str.substring(str.indexOf("<tiny>")+6,str.indexOf("</tiny>"));
		compValFul=str.substring(str.indexOf("<tiny>"),str.indexOf("</tiny>")+7);
		
		try{
			eval(compVal);
		}catch(err){
			console.error(err);
			output+=err;
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
	}else{
		sendPage(URL,res);
	}
});
 



server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});
