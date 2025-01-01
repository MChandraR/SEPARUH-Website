const users = require('../models/users');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class AkunController {
    async index(req, res){
        let data = await users.get();

        for(let i =0; i < data.length ; i++){
            console.log(data[i]);
        }

        if(data.length > 0){
            return Response(res, 200, "Berhasil mengambail data user ", data);
        }

        return Response(res, 200, "Data kosong");
    }
}

module.exports = new AkunController();