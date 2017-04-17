MongoClient = require('mongodb').MongoClient;
url = 'mongodb://localhost/tinyspace';

MongoClient.connect(url, function(err, db) {
	//console.log("connected to db!");
	db.collection('spaces').remove();
	db.collection('users').remove();
	console.log("Adding db content...");
	for(var i=0;i<500;i++){
	    db.collection('spaces').insertOne({
	        username:"TestUser!",
	        rating:55,
	        catagory:"general",
	        type:"text",
	        title:"Content?",
	        content:"Yes hello, this is random content content! ("+Math.random()+")"
    });
	}

     db.collection('users').insertOne({
        username:"marc",
        password:"nohash",
        score:5348753,
        upVotes:[],
        downVotes:[],
    });

      db.collection('users').insertOne({
        username:"test",
        password:"test",
        score:4546543,
        upVotes:[],
        downVotes:[],
    });
      console.log("done!");
});

 dbSearch=function(search,dbDocument,callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).findOne(search,function(err, doc) {
            callback(doc,err);
        });
    });
}

 dbSearchRand=function(search,dbDocument,callback){

    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).aggregate({ $sample: { size: 1 } },function(err, doc) {
            callback(doc,err);
        });
    });

//  db.getCollection('users').aggregate({ $sample: { size: 1 } })
}