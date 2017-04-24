MongoClient = require('mongodb').MongoClient;
url = 'mongodb://localhost/tinyspace';

MongoClient.connect(url, function(err, db) {
	//console.log("connected to db!");
	//db.collection('spaces').remove();
	db.collection('users').remove();
    db.collection('spacelist').remove();
//	console.log("Adding db content...");

/*
	for(var i=0;i<10;i++){
	    db.collection('spaces').insertOne({
	        username:"TestUser!",
	        rating:55,
	        catagory:"general",
	        type:"text",
	        title:"Content: "+(Math.random()),
	        content:"Yes hello, this is random content content! ("+i+")"
        });
	}*/

     db.collection('users').insertOne({
        username:"marc",
        password:sha1("nohash"),
        email:"a@a.com",
        score:5348753,
        upVotes:[],
        downVotes:[],
    });

      db.collection('users').insertOne({
        username:"test",
        password:sha1("test"),
        email:"b@b.com",
        score:4546543,
        upVotes:[],
        downVotes:[],
    });

    db.collection('spacelist').insert([
        {
            name:"general",
            description:"Just some general content to brighten up your day!",
            posts:0,
        },

        {
            name:"funny",
            description:"The funniest content you are probably ever going to see.",
            posts:0
        },

         {
            name:"tech",
            description:"You probably aren't even smart enough to read this.",
            posts:0
        },

         {
            name:"sports",
            description:"Haha. We know what these are.",
            posts:0
        },

         {
            name:"facts",
            description:"Wow, these facts are probably more interesting than you.",
            posts:0
        },
    
    ]);
    //console.log("done!");
});



dbAdd=function(doc,value){
    MongoClient.connect(url, function(err, db) {
        db.collection(doc).insertOne(value);
    });
}

 dbSearch=function(search,dbDocument,callback){
    try{
        MongoClient.connect(url, function(err, db) {
            db.collection(dbDocument).findOne(search,function(err, doc) {
                callback(doc,err);
            });
        });
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
}

 dbSearchGroup=function(search,dbDocument,callback){
    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).find(search).toArray(function(err, doc) {
            callback(doc);
        });
    });
}

//db.getCollection('spaces').aggregate([{$match : {catagory:"general"}},{ $sample: { size: 1 } }])


 dbSearchRand=function(search,dbDocument,callback){

    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).aggregate([{$match : search},{ $sample: { size: 1 } }],function(err, doc){
             callback(doc,err);
        });
    });

}

/*
 dbSearchRand=function(search,dbDocument,callback){

    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).aggregate({ $sample: { size: 1 } },function(err, doc) {
            callback(doc,err);
        });
    });

}*/