MongoClient = require('mongodb').MongoClient;
url = 'mongodb://localhost/tinyspace';

MongoClient.connect(url, function(err, db) {
	//console.log("connected to db!");
	db.collection('spaces').remove();
	db.collection('users').remove();
    db.collection('spacelist').remove();
//	console.log("Adding db content...");
	for(var i=0;i<10;i++){
	    db.collection('spaces').insertOne({
	        username:"TestUser!",
	        rating:55,
	        catagory:"general",
	        type:"text",
	        title:"Content: "+(Math.random()),
	        content:"Yes hello, this is random content content! ("+i+")"
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

    db.collection('spacelist').insert([
        {
            name:"general",
            posts:0
        },

        {
            name:"funny",
            posts:0
        },

         {
            name:"tech",
            posts:0
        },

         {
            name:"sports",
            posts:0
        },

         {
            name:"facts",
            posts:0
        },
    
    ]);
    //console.log("done!");
});

 dbSearch=function(search,dbDocument,callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).findOne(search,function(err, doc) {
            callback(doc,err);
        });
    });
}

 dbSearchGroup=function(search,dbDocument,callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).find(search).toArray(function(err, doc) {
            callback(doc);
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