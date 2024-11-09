const Ruangan = require('../models/ruangan');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class ruanganController {
    validate(req,res){
        if(req.session.user) return true;
        else {
            Response(res, 201, "Anda tidak memiliki hak akses !", null);
            return false;
        }
    }

    validateAdmin(req,res){
        if(req.session.user && req.session.user.role == "admin") return true;
        else {
            Response(res, 201, "Anda tidak memiliki hak akses !", null);
            return false;
        }
    }

    async index(req,res){
        if(this.validate(req,res)){
            Response(res,200, "Berhasil mengambil data ruangan !", await Ruangan.get());
        }
    };

    async addRuangan(req,res){
        const data = req.body;
        if(this.validateAdmin(req,res)){
            Response(res, 200, "Berhasil menambahkan data ruangan !", await Ruangan.create({
                room_id : data.room_id,
                room_name : data.room_name,
                description : data.description,
                capacity : data.capacity
            }));
        }
    }

    async updateRuangan(req,res){
        const data = req.body;
        if(this.validateAdmin(req,res)){
            Response(res, 200, "Berhasil mengupdate data ruangan !", await Ruangan.where({room_id : data.room_id}).create({
                room_name : data.room_name
            }));
        }   
    }   


    async deleteRuangan(req,res){
        const data = req.body;
        if(this.validateAdmin(req,res)){
            Response(res, 200, "Berhasil menghapus data ruangan !", await Ruangan.where({room_id : data.room_id}).delete());
        }
    }
}

module.exports = new ruanganController();