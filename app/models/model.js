const getClient = require('./mongo');

class Model{
    table = "";
    state = {};
    fillable = [];

    async get(){
        let result = null;
        await getClient(this.table, async (db, client)=>{
            try{
                result = await db.find(this.state).toArray();
            } finally {
                if(client!=null)await client.close();
            }
        });
        return result;
        
    }

    async first(){
        let result = null;
        await getClient(this.table, async (db, client)=>{
            try{
                result = await db.findOne(this.state);
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

    where(state){
        this.state = state;
        return this;
    };
}

module.exports =  Model;