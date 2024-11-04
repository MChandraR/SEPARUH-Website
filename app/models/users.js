const getClient = require('./mongo');

class Users{
    async get(){
        let data = null;
        await getClient('users', async (db, client)=>{
            try{
                const query = { };
                const movie = await db.findOne(query);
                data = movie;
            } finally {
                await client.close();
            }
        });
           
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