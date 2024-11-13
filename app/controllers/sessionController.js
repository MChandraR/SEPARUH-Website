const sessions = require('../models/sessions');
const Users = require('../models/users');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;
const Encrypt = require('../../utils/encryptor');
const Validate = require('../../utils/validator');

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
        const body = req.body;
        if(!Validate(body.username) || !Validate(body.password)){
            Response(res,401, "Username atau password salah !", null);
            return;
        }
        let data = await Users.where({username:body.username, password:Encrypt.sha256(body.password)}).first();
        if(data && data.verified_at){
            req.session.regenerate(function (err) {
                if (err) next(err)
                req.session.user = {
                    user_id : data.user_id,
                    username : data.username,
                    role : data.role
                };
                var hour = 3600000
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
                console.log(req.session.user);
                req.session.save((err) => Response(res,200, err ? "Err : Session not saved  !" : "Berhasil login !", null));
            })
        }else Response(res,401, data && !data.verified_at ? "Harap verifikasi terlebih dahulu akun anda !" : "Username atau password salah !", null);

    }

    async logout(req,res){
        req.session.destroy((e)=>{
            Response(res,200, e ? "Err : Session cannot be destroyed !":"Berhasil keluar !", null);
        });
    };
}

module.exports = new sessionController();