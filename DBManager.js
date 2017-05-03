//MongoClient = require('mongodb').MongoClient;
//url = 'mongodb://localhost/tinyspace';







 db = mongoUtil.getDb();
 //console.log("DB"+db);
//console.log(db);
//if(debug){

/*
      db.collection('users').insertOne({
            username:"marc",
            password:sha1("nohash"),
            email:"a@a.com",
            score:5348753,
            status:"active",
            upVotes:[],
            downVotes:[],
        });*/
    /*
    MongoClient.connect(url, function(err, db) {

        LIKE SEARCH
        //db.users.find({name: /a/}) 
        

        
        //console.log("connected to db!");
        //db.collection('spaces').remove();
        //dbc=db;
        db.collection('users').remove();
        db.collection('spacelist').remove();
        db.collection('sessions').remove();
    //	console.log("Adding db content...");


        db.collection('users').ensureIndex( { "username": 1 }, { unique: true } );
        db.collection('users').ensureIndex( { "email": 1 }, { unique: true } );

        db.users.ensureIndex( { "username": 1 }, { unique: true } );
        db.users.ensureIndex( { "email": 1 }, { unique: true } );

        db.collection('users').insertOne({
            username:"marc",
            password:sha1("nohash"),
            email:"a@a.com",
            score:5348753,
            status:"active",
            upVotes:[],
            downVotes:[],
        });

        

        db.collection('users').insertOne({
            username:"test",
            password:sha1("test"),
            email:"b@b.com",
            score:4546543,
            status:"active",
            upVotes:[],
            downVotes:[],
        });



        db.spacelist.insert([
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
        db.close();
        //console.log("done!");
        
    });
    
//}
*/

dbAdd=function(doc,value,cb){
   // MongoClient.connect(url, function(err, db) {
        
        db.collection(doc).insertOne(value,function(er,result){
            cb(er,result);
           // db.close();
        });
        
    //});
}

 dbSearch=function(search,dbDocument,callback){
    try{
       // MongoClient.connect(url, function(err, db) {
            db.collection(dbDocument).findOne(search,function(err, doc) {
                callback(doc,err);
                //db.close();
            });
        //});
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
}

 dbSearchGroup=function(search,dbDocument,callback){
   // MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).find(search).toArray(function(err, doc) {
            callback(doc);
           // db.close();
        });
   // });
}

//db.getCollection('spaces').aggregate([{$match : {catagory:"general"}},{ $sample: { size: 1 } }])


 dbSearchRand=function(search,dbDocument,callback){

   // MongoClient.connect(url, function(err, db) {
        
        db.collection(dbDocument).aggregate([{$match : search},{ $sample: { size: 1 } }],function(err, doc){
            
             callback(doc,err);
            // db.close();
        });
   // });

}

/*
 dbSearchRand=function(search,dbDocument,callback){

    MongoClient.connect(url, function(err, db) {
        db.collection(dbDocument).aggregate({ $sample: { size: 1 } },function(err, doc) {
            callback(doc,err);
        });
    });

}*/