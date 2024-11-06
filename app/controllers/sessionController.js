const sessions = require('../models/sessions');
const Users = require('../models/users');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class sessionController {
    async index(req,res){
        Response(res,200, "Berhasil mendapat data !", await sessions.get());
    }

    async login(req,res){
        const body = req.body;
        let data = await Users.where({username:body.username, password:body.password}).first();
        if(data){
            req.session.regenerate(function (err) {
                if (err) next(err)
                req.session.user = {
                    user_id : data.user_id,
                    username : data.username
                };
                var hour = 3600000
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
                req.session.save((err) => Response(res,200, err ? "Err : Session not saved  !" : "Berhasil login !", null));
            })
        }else Response(res,200, "Username atau password salah !", null);

    }

    async logout(req,res){
        req.session.destroy((e)=>{
            Response(res,200, e ? "Err : Session cannot be destroyed !":"Berhasil keluar !", null);
        });
    };
}

module.exports = new sessionController();