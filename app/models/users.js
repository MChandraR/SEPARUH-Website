const getClient = require('./mongo');

class Users{
    async get(){
        let data = null;
        await getClient('users', async (db, client)=>{
            try{
                data = await db.find().toArray();
            } finally {
                await client.close();
            }
        });
        console.log(data);
        return data;
    }

    async create(data){
        let result = null;
        await getClient('users', async (db, client)=>{
            try{
                result = await db.insertOne(data);
            } finally {
                await client.close();
            }
        });
        return result;
    }
}

module.exports = new Users();