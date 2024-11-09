const db = require('../models/mongo');
const Response = require('../../utils/utils').sendResponse;
const Users = require('../models/users');

class userController{
    async index(req,res){
        Response(res, 200, "Berhasil mengambil data !", await Users.orderBy('user_id', "DESC").get());
    }

    async insert(req,res){
        const data = req.body;
        console.log(data);

        Response(res, 200, "Berhasil menambahkan data !",await Users.create({
            user_id : data.user_id,
            username: data.username,
            password : data.password,
            role : data.role,
            email : data.email
        }));
    }

    async update(req,res){
        const data = req.body;
        Response(res, 200, "Berhasil mengupdate !", await Users.where({user_id:data.user_id}).update(
            {
                password : data.password
            }
        ));
    }

    async delete(req,res){
        const data = req.body;
        Response(res,200, "Berhasil menghapus data !", await Users.where({user_id : data.user_id}).delete());
    }

}

module.exports = new userController();