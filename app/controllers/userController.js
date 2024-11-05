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

        Response(res, 200, "Berhasil menambahkan data !",await Users.create({
            user_id : data.user_id,
            username: data.username,
            password : data.password,
            role : data.role,
            email : data.email
        }));
    }

    async put(req,res){
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
        // const result = await sql`DELETE FROM users WHERE user_id = ${data.user_id};`;
        Response(res,200, "Berhasil menghapus data !", await Users.delete(
            {user_id : data.user_id}
        ));
    }



}

module.exports = new userController();