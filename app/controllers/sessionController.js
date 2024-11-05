const sessions = require('../models/sessions');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class sessionController {
    async index(req,res){
        Response(res,200, "Berhasil mendapat data !", await sessions.get());
    }
}

module.exports = new sessionController();