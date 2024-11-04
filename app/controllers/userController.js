const db = require('../models/mongo');
const Response = require('../../utils/utils').sendResponse;
const Users = require('../models/users');

class userController{
    async get(req,res){
        Response(res, 200, "Berhasil mengambil data !", await Users.get());
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