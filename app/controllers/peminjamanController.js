const Peminjaman = require('../models/peminjaman');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;
const Validator = require('../../utils/validator');
const Ruangan = require('../models/ruangan');
const Asset = require('../models/asset');
const moment = require('moment-timezone');

class peminjamanController {

    //Fungsi untuk mengambil data peminjaman dari database
    async index(req,res){
        let data = await Peminjaman.get();
        return Response(res, 200, "Berhasil mengambil data !", data);
    }   

    //Fungsi untuk melakukan peminjaman
    //Req type 0 untuk ruangan dan 1 untuk asset
    //ID akan dibuat secara otomatis oleh controller
    //Payload yang dibutuhkan [asset_id || room_id, request_type, req_start, req_end ]
    async create(req,res){

        let waktuSekarang = moment().tz('Asia/Jakarta');

        // Membuat string dengan format yang diinginkan
        const waktuFormatted = waktuSekarang.format('YYYY-MM-DD HH:mm:ss');
    
        const data = req.body;
        if((Validator(data.asset_id) || Validator(data.room_id))){
            let newID = await Peminjaman.orderBy('request_id', "DESC").first();
            newID = newID == null ? "P000000001" : "P"+("000000000" + (parseInt(newID.request_id.slice(-9))+1)).slice(-9);
            if(Validator(data.req_type) && Validator(data.req_start) && Validator(data.req_end)){
                let datas = data.req_type ? await Asset.where({asset_id : data.asset_id}).count() : await Ruangan.where({room_id : data.room_id}).count();
                if(!datas) return Response(res, 200, "Gagal melakukan peminjaman : ruangan atau asset tidak ditemukan !");
                let start = new Date(data.req_start);
                let end = new Date(data.req_end);

                return Response(res, 200, "Berhasil melakukan peminjaman !", await Peminjaman.create({
                    request_id : newID,
                    user_id : req.session.user.user_id,
                    req_type : data.req_type,
                    item_id : data.req_type ? data.asset_id : data.room_id,
                    status : "pending",
                    note : "-", 
                    created_at : waktuFormatted,
                    req_start : `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`,
                    req_end : `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`

                }));
            }
            return Response(res, 400, "Gagal melakukan peminjaman : Field tidak lengkap !");
        }
        return Response(res, 400, "Gagal melakukan peminjaman : id asset atau ruangan tidak ditemukan !");
    }


    //Fungsi untuk mengupdate data peminjaman oleh admin
    //Payload yang dibutuhkan : [ request_id ]
    //Payload opsional : [ status ]
    async update(req,res){
        res.send("Hallo");

    }

    //Fungsi untuk menghapus data peminjaman oleh admin
    //Payload yang dibutuhkan : request_id
    async delete(req,res){
        let result = await Peminjaman.delete();
        return Response(res, 200, "Berhasil menghapus data peminjaman !");
    }
}

module.exports = new peminjamanController();