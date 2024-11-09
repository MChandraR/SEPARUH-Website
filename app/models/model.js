const getClient = require('./mongo');

class Model{

    table = "";
    state = {};
    fillable = [];
    orderState = {};
    filtered = false;


    async get(){
        let result = null;
        await getClient(this.table, async (db, client)=>{
            try{
                console.log(this.state);
                if(this.filtered)result = await db.find(this.state).sort(this.orderState).toArray();
                else result = await db.find().sort(this.orderState).toArray();
            } finally {
                if(client!=null)await client.close();
                this.filtered = false;
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
            this.filtered = false;

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
        this.filtered = true;
        return this;
    };

    orderBy(field, mode){
        this.orderState[field] = mode=="ASC" ? 1 : -1;
        return this;
    }
}

module.exports =  Model;