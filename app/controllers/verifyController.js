const Verify = require('../models/acc_verify');
const User = require('../models/users');
const moment = require('moment-timezone');
const View = require('../../utils/views').view;
const url = require('url');
const Response = require('../../utils/utils').sendResponse;

class verifyController {
    async index(req,res){
        const param = url.parse(req.url, true).query;
        let data = await Verify.where({token : param.id}).first();
        if(data){
            let waktuSekarang = moment().tz('Asia/Jakarta');
            const waktuFormatted = waktuSekarang.format('YYYY-MM-DD HH:mm:ss');
            let query = await User.where({user_id : data.user_id}).update({verified_at : waktuFormatted});
            Response(res, 200, "Akun berhasil di verifikasi ", query);
            return;
        }
        Response(res,401,"Not Found", null);
    }


}

module.exports = new verifyController();