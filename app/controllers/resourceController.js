const Ruangan = require('../models/ruangan');
const Asset = require('../models/asset');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class resourceController {
    async index(req,res){
        Response(res, 200, "Berhasil mengambil data !", {
            ruanganCount : await Ruangan.count(),
            assetCount : await Asset.count(),
            userLogin : req.session.user != null
        });
    }
}

module.exports = new resourceController();