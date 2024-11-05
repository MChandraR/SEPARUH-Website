const getClient = require('./mongo');

class Model{
    table = "";

    async get(){
        let result = null;
        await getClient(this.table, async (db, client)=>{
            try{
                result = await db.find().toArray();
            } finally {
                if(client!=null)await client.close();
            }
        });
        return result;
        
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