cookies=[];




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

addSessionVal=function(val,key){
	id=cookies["tinySession"];
	for(var i=0;i<sessionData.length;i++){
		if(sessionData[i].id==id){
			sessionData[i][val]=key;
		}
	}
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

sendPageWithValidation= function (page,res,param){
	
	if(getSessionVal("username")==undefined){
		res.writeHead(302, {
			'Location': "/login?invalid=a"
		});
		res.end();
	}else{
		sendPage(page,res,param);
	}
}


redirect = function(page,res){
	res.writeHead(302, {
		'Location': page
	});
	res.end();
}

sendPage= function (page,res,param){

	if(page.endsWith(".png")){
		try{ 
			res.writeHead(200, {'Content-Type': 'image/png' });
			f=fs.readFileSync("WebContent"+page);
			res.end(f,"binary");
		}catch(err){
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(TinyCompile(readFile("error"+page),param));
			res.end();
		}
		return;
	}

	res.writeHead(200, {"Content-Type": "text/html"});
	var v=TinyCompile(readFile("WebContent"+page),param);
	if(debug)v=v.replace("<center>",'<center>\n  <div class="tinyBox" style="padding:10;background-color:rgb(0, 216, 90);color:black;font-size:20">Debug Mode</div>');
	res.write(v);
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
		websiteReturns[URL](URLparams,res);
		return;
	}else{
		//sendPage(URL,res);
	//	console.log("=================");
		dbSearch({name:URL.substring(1,URL.length)},"spacelist",function(data,err){ 
			if(data){
				//manually set url param when swending thing works

				//console.log("YUPPPP"); 
				currentParams.p=URL.substring(1,URL.length);
				sendPageWithValidation("/vote.html",res,data); 

				
				
			}else{

				//can't use URL variable here????
				sendPage(urlLib.parse(req.url).pathname,res);
				
			}
		});
	}
	

});
 

/*
server.listen(port,ip, function() {
	console.log('server listening on port ' + port);
});
*/


function startServer(ip1,port1){
	server.listen(port1,ip1, function(error) {
		//if(!error){
			console.log('server attemping to listen on ' + ip1+":"+port1);
		//}
	});
}

server.on('error', function (e) {
	console.log("Could not bind to "+ip+":"+port);
	console.log("Debug mode initiated!");
	debug=true;
	startServer("localhost",8090);
});

startServer(ip,port);