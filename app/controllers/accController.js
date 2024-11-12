const Verify = require('../models/acc_verify');
const User = require('../models/users');
const moment = require('moment-timezone');
const View = require('../../utils/views').view;
const url = require('url');
const Response = require('../../utils/utils').sendResponse;
const GenerateToken = require('rand-token').generate;
const PassReset = require('../models/password_reset');
const sendEmail = require('../../utils/mailer');
const validator = require('../../utils/validator');

class accController {
    //Aktivasi email
    async index(req,res){
        const param = url.parse(req.url, true).query;
        let data = await Verify.where({token : param.id}).first();
        if(data){
            let waktuSekarang = moment().tz('Asia/Jakarta');
            const waktuFormatted = waktuSekarang.format('YYYY-MM-DD HH:mm:ss');
            let query = await User.where({user_id : data.user_id}).update({verified_at : waktuFormatted});
            Response(res, 200, "Akun berhasil di verifikasi ", query);
            await Verify.where({user_id : data.user_id}).delete();
            return;
        }
        Response(res,401,"Not Found", null);
    }

    async changePass(req,res){
        const param = url.parse(req.url, true).query;
        let data = await PassReset.where({token : param.token}).first();
        if(data){
            let waktuSekarang = moment().tz('Asia/Jakarta');
            const waktuFormatted = waktuSekarang.format('YYYY-MM-DD HH:mm:ss');
            let query = await User.where({user_id : data.user_id}).update({verified_at : waktuFormatted});
            Response(res, 200, "Akun berhasil di verifikasi ", query);
            return;
        }
        Response(res,401,"Not Found", null);
    }

    async recoverAccount(req,res){
        res.send(View('reset_password'));
    }

    //Reset password
    async resetPassword(req,res){
        let data = req.body;
        const token = GenerateToken(50);
        const href = `https://separuh.site/api/password/reset?token=${token}`;
        console.log(data);
        let dataUser = await User.where({email:data.email}).first();
        console.log(dataUser);
        if(!validator(data.email) || dataUser == null) {
            Response(res, 401, "Email tidak ditemukan !", null);
            return;
        }

        await PassReset.create({
            user_id : dataUser.user_id,
            token  : token
        });
        const html = `<b> Berikut adalah tautan untuk mengatur ulang kata sandi anda: </b>
                      <a href="https://separuh.site/api/password/reset?token=${token}"> <button>Reset Password</button></a>`;
        sendEmail(data.email, "Konfirmasi Mengatur Ulang Kata Sandi", "", html);
        Response(res, 200, "Silahkan cek email anda untuk melanjutkan pemulihan akun !", null);
    }

}

module.exports = new accController();