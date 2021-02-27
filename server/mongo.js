async function main() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = 'mongodb://cluster0-shard-00-01.aplfp.mongodb.net:27017,cluster0-shard-00-00.aplfp.mongodb.net:27017,cluster0-shard-00-02.aplfp.mongodb.net:27017/WerkItDB?authSource=admin&compressors=snappy&gssapiServiceName=mongodb&replicaSet=atlas-lcmezp-shard-0&ssl=true'
 
    //const uri =
    //  'mongodb+srv://cluser0.aplfp.mongodb.net/WerkItDB';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });
  
    // Connect to the client and query
    await client.connect();
    console.log("database connected"); 
    client.close();
  }
  
main().catch(console.error);
