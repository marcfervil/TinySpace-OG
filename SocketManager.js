var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('getSpace', function(msg){
		sendPost(socket,msg);
	});
});
 

function sendPost(socket,catagory){
	dbSearchRand({catagory:catagory},"spaces",function(data,e){
		socket.emit("post",data[0]);
	});
}