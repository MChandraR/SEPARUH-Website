const sessions = require('../models/sessions');
const Users = require('../models/users');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;
const Encrypt = require('../../utils/encryptor');
const Validate = require('../../utils/validator');
const { response } = require('express');

class sessionController {
    async index(req,res){
        Response(res,200, "Berhasil mendapat data !", await sessions.get());
    }

    // Middleware untuk validasi sesi, redirect user ke login jika sesi tidak ada
    validateSession(req,res,next){
        if(req.session && req.session.user){
            return next();
        } else return res.redirect('/login');
    }

    async login(req,res){
        let body = req.body;
        if(Validate([body.username, body.password])){

            let user = await Users.where({username : body.username, password : Encrypt.sha256(body.password)}).first();
            if(user){
                let state = false;
                req.session.regenerate((err)=>{
                    if(err)console.log(err);

                    req.session.user = {
                        user_id : user.user_id,
                        username : user.username
                    }

                    let hours = 3600 * 1000;
                    req.session.cookie.expires = new Date(Date.now() + hours);
                    req.session.cookie.maxAge = hours;

                    req.session.save((err)=>{
                        state = err;
                    });
                });
                

                return Response(res, 200, state ? "Gagal menyimpan cookie " : "Berhasil login ", body);

            }
            return Response(res, 200, "Login gagal : username atau password salah !");
        }

        return Response(res, 200, "Login gagal : username atau password kosong !");
    }
}

module.exports = new sessionController();