const getClient = require('./mongo');

class Model{
    table = "";

    async get(){
        let data = null;
        let client = await getClient();
        try{
            await client.connect();
            const database = await client.db('pemweb');
            const db = await database.collection(this.table);
            data = await db.find().toArray();
            return data;
        } finally {
            await client.close();
        }
        
    }

    async create(data){
        let result = null;
        await getClient(this.table, async (db, client)=>{
            try{
                result = await db.insertOne(data);
            } finally {
                if(client!=null)await client.close();
            }
        });
        return result;
    }

    async update(state,data){
        let result = null;
        await getClient(this.table, async(db,client)=>{
            try{
                result = await db.updateOne(state, 
                    {
                        $set:data
                    }
                );
            } finally {
                if(client!=null)await client.close();
            }
        });
    }

    async delete(state,data){
        let result = null;
        await getClient(this.table, async(db,client)=>{
            try{
                result = await db.deleteOne(state);
            } finally {
                if(client!=null)await client.close();
            }
        });
    }
}

module.exports =  Model;