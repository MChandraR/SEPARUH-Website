require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mydb.rvfulzg.mongodb.net/?retryWrites=true&w=majority&appName=myDB`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
try {
    await client.connect();
    await client.db("pemweb").command({ ping: 1 });
    console.log("Berhasil");
} finally {
    await client.close();
}
}
run().catch(console.dir);

async function getClient(collection, callback){
  let client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
    try {
        await client.connect();
        const database = client.db('pemweb');
        const col = database.collection(collection);
        return callback(col, client);
      } finally {
      }
}

module.exports = getClient;