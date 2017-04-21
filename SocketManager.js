var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('getSpace', function(msg){
		sendPost(socket,msg);
	});
	socket.on('sendSpace', function(msg){
		try{
			MongoClient.connect(url, function(err, db) {

				dbSearch({name:msg.catagory},"spacelist",function(data){ 
					if(data){	
						db.collection('spaces').insertOne({
							username:getSessionVal("username"),
							rating:0,
							catagory:msg.catagory,
							type:"text",
							title:msg.title,
							content:msg.text
						});
						socket.emit("postSent","good!");
					}else{
						socket.emit("postError",{errorMessage:"'"+msg.catagory+"' is not a catagory!"});
						return;
					}
				});
			});
		}catch(err){
	
			socket.emit("postError",{errorMessage:err.toString()});
			return;
		}
	});

    




	socket.on('sendSpaceImg', function(msg){
		imgName=sha1(Math.random()+Math.random()+"veryverytiny")+".png";
		try{
			MongoClient.connect(url, function(err, db) {
				dbSearch({name:msg.catagory},"spacelist",function(data){ 
					if(data){	
						//console.log(data.photo);
						fs.writeFile("WebContent/images/"+imgName, msg.photo, function(err) {
							
							if(err){
								console.error(err);
								socket.emit("postError","file could not be saved! ("+err.toString+")");
       							return;
    						}
							
							db.collection('spaces').insertOne({
								username:getSessionVal("username"),
								rating:0,
								catagory:msg.catagory,
								type:"image",
								title:msg.title,
								content:"images/"+imgName,
							});
						
						
							socket.emit("postSent","good!");
						}); 

					}else{
						socket.emit("postError",{errorMessage:"'"+msg.catagory+"' is not a catagory!"});
						return;
					}
				
				});
			});
		}catch(err){
			console.error(err);
			socket.emit("postError",{errorMessage:err.toString()});
			return;
		}
	});	
	
});
 

function sendPost(socket,catagory){
	dbSearchRand({catagory:catagory},"spaces",function(data,e){
		socket.emit("post",data[0]);
	});
}