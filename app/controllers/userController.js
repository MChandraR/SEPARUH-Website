const db = require('../models/mongo');
const Users = require('../models/users');

class userController{
    async get(req,res){
        let data = await Users.get();
        res.send(data);
    }

    async post(req,res){
        const data = req.body;
        console.log(data);

        res.send(await Users.create({
            user_id : data.user_id,
            username: data.username,
            password : data.password,
            role : data.role,
            email : data.email
        }));
    }
}

module.exports = new userController();