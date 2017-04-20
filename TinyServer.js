cookies=[];


port = 8090;
ip= "localhost";

var display="";
blocked = false;

 getSessionVal=function(val){
	id=cookies["tinySession"];
	for(var i=0;i<sessionData.length;i++){
		if(sessionData[i].id==id){
			//console.log(sessionData[i]);
			return sessionData[i][val];
		}
	}
	//return "could not find session value '"+val+"'";
	return undefined;
}

function getPage(page){
	return TinyCompile(readFile("WebContent"+page))
}
function log(val){
	output+=val;
	return "";
}



websiteReturns={};



function block(){
	console.log("server blocked!");
	blocked=true;
	while(getBlocked()){
		var a = 0;
	}
}

function unblock(){
	console.log("server unblocked!");
	blocked=false;
}


TinyCompile=function(str){
	display="";
	while(str.indexOf("<tiny>")!=-1){
		compVal=str.substring(str.indexOf("<tiny>")+6,str.indexOf("</tiny>"));
		compValFul=str.substring(str.indexOf("<tiny>"),str.indexOf("</tiny>")+7);		
		try{
			eval(compVal);
		}catch(err){
			console.error(err);
			output+=err;
		}
		str=str.replace(compValFul,output);
		output="";
	}
	return str;
}

TinyCompile=function(str,...param){
	display="";
	while(str.indexOf("<tiny>")!=-1){
		compVal=str.substring(str.indexOf("<tiny>")+6,str.indexOf("</tiny>"));
		compValFul=str.substring(str.indexOf("<tiny>"),str.indexOf("</tiny>")+7);		
		try{
			eval(compVal);
		}catch(err){
			console.error(err);
			output+=err;
		}
		str=str.replace(compValFul,output);
		output="";
	}
	return str;
}

onGetPage=function(url,callback){
	websiteReturns[url]=callback; 
}


sendPage= function (page,res){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(TinyCompile(readFile("WebContent"+page)));
	res.end();
}

sendPage= function (page,res,param){
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(TinyCompile(readFile("WebContent"+page),param));
	res.end();
}

server = http.createServer(function(req, res) {

	//console.log("connection");

	output="";
	display="";

	cookies=parseCookies(req);
    URL=urlLib.parse(req.url).pathname;
	URLparams=urlLib.parse(req.url, true).query;
	
	sendData=res;
	currentParams=URLparams;
	
	

	if(typeof websiteReturns[URL] === "function"){
		response=websiteReturns[URL](URLparams,res);
	}else{
		sendPage(URL,res);
	}

//	display="";
	//output="";

});
 



server.listen(port,ip, function() {
    console.log('server listening on port ' + port);
});
