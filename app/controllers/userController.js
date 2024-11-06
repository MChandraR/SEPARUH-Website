const db = require('../models/mongo');
const Response = require('../../utils/utils').sendResponse;
const Users = require('../models/users');

class userController{
    async index(req,res){
        if(req.session.user)Response(res, 200, "Berhasil mengambil data !", await Users.orderBy('user_id', "ASC").get());
        else Response(res, 201, "Anda tidak memiliki hak akses !", null);
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
        Response(res, 200, "Berhasil mengupdate !", await Users.update(
            {user_id:data.user_id},
            {
                password : data.password
            }
        ));
    }

    async delete(req,res){
        const data = req.body;
        Response(res,200, "Berhasil menghapus data !", await Users.delete(
            {user_id : data.user_id}
        ));
    }

}

module.exports = new userController();