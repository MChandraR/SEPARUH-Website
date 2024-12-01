const db = require('../models/mongo');
const Response = require('../../utils/utils').sendResponse;
const Users = require('../models/users');
const Verify = require('../models/acc_verify');
const sendEmail = require('../../utils/mailer');
const Validate = require('../../utils/validator');
const Encrypt = require('../../utils/encryptor');
const randToken = require('rand-token').generate;

class userController{
    async index(req,res){
        Response(res, 200, "Berhasil mengambil data !", await Users.orderBy('user_id', "DESC").get());
    }

    async insert(req,res){
        const data = req.body;
        console.log(data);

        
        if( !Validate(data.username) || !Validate(data.password) || !Validate(data.email)){
            Response(res, 401, "Data tidak valid, lengkapi data anda !",null);
            return;
        }

        let verifyToken = randToken(40);
        let newID = await Users.orderBy("user_id", "DESC").first();
        let html = `<h1>Terima kasih sudah mendaftar</h1>
                    <p>Berikut adalah tautan untuk memverifikasi akun anda , username : ${data.username}!</p>
                    <a href="https://separuh.site/api/user/verify?id=${verifyToken}"> 
                        <button style="background-color: yellow; border:none; color:black; border-radius:.5rem 1rem; font-weight:bold; padding : .5rem 1rem">Verifikasi</button>
                    </a>`;
        
        try{
            await sendEmail(data.email, "Verifikasi Registrasi Kamu", "Berikut adalah link verifikasi registrasi kamu !", html);
        }catch(e){
            console.log(e);
        }

        await Verify.create({
            user_id : newID.user_id + 1,
            token : verifyToken
        });

        Response(res, 200, "Berhasil : silahkan periksa Email anda untuk melanjutkan registrasi !",await Users.create({
            user_id : newID.user_id+1,
            username: data.username,
            password : Encrypt.sha256(data.password),
            role : "user",
            email : data.email,
            verified_at : null,
            profile : {

            }
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

    //Fungsi untuk mengupdate profile user 
    //Payload nama, no-hp , nim , jurusan, jenis_kelamin
    async updateUserProfile(req,res){
        let body = req.body;
        if(Validate([body.name, body.nim, body.phone, body.major, body.gender])){
            let data = await Users.where({user_id : req.session.user.user_id}).update({
                profile : {
                    name : body.name,
                    nim : body.nim,
                    phone : body.phone,
                    major : body.major,
                    gender : body.gender
                }
            });
            return Response(
                res,
                200,
                "Successfully update user data !"
            );
        }
        return Response(
            res,
            400,
            "Failed to update user data : payload sent not valid !"
        );
        
    }

    async getUserProfile(req,res){
        let data = await Users.where({user_id : req.session.user.user_id}).first();
        return Response(res, 200 , "Berhasil mengambil data user !",{
            username : data.username,
            role : data.role,
            email : data.email,
            profile : data.profile
        } );
    }

    async delete(req,res){
        const data = req.body;
        Response(res,200, "Berhasil menghapus data !", await Users.where({user_id : data.user_id}).delete());
    }

}

module.exports = new userController();