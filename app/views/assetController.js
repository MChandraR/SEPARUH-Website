const Asset = require('../models/asset');
const View = require('../../utils/views').view;
const Compact = require('../../utils/views').compact;
const Response = require('../../utils/utils').sendResponse;
const resourceController = require('./resourceController');
const Validator = require('../../utils/validator');
const url = require('url');


class assetController {

  //Fungsi untuk mengembalikan informasi ruangan 
    //ID ruangan didapat dari url parameter
    async view(req,res){
        const param = url.parse(req.url, true).query;
        let data = await Asset.where({asset_id : param.id}).first();
        if(!data){
            return res.send(Compact('ruangan'));
        }
        
        data["req_state"] = "Buat Reservasi";
        if(data.status){
            data["req_style"] = `style="background-color : grey;"`;
            data["req_state"] = "Dipinjam";
            data["state"] = "disabled";
        }
        return res.send(Compact('assetView', data));
    }


    async index(req,res){
        let data = await Asset.get();

        return Response(res, 200, "Berhasil mengambil data !", data);
    }

    async create(req,res){
        await resourceController.roomUpload.single('file')(req,res, async(err)=>{
            if (err) return Response(res, 400, "File Upload Error !", err.message);
            if (!req.file) return Response(res, 400, "No file uploaded !",null);

            const data = req.body;
            const file = req.file;
            let asset = await Asset.orderBy('asset_id', "DESC").first();
            asset = asset ?  asset.asset_id.slice(-5) : "00000" ;
            console.log(asset);
            asset = ("A" + ("00000" + (parseInt(asset)  +  1)).slice(-5));

            if(Validator(asset) && Validator(data.asset_name) && Validator(data.description)){
                resourceController.rename(file.originalname, asset+ ".png");
                return Response(res, 200, "Berhasil menambahkan data asset !", await Asset.create({
                    asset_id : asset,
                    asset_name : data.asset_name,
                    description : data.description,
                    status : 0
                }));
            }
            resourceController.deleteFile(file.originalname);
            return Response(res, 400, "Gagal menambahkan data asset : asset_id tidak ditemukan !");
        });
    }

    async update(req,res){
        await resourceController.roomUpload.single('file')(req,res, async(err)=>{
            const data = req.body;
            let update = {};
            if(!err && req.file){
                const file = req.file;
                resourceController.rename(file.originalname, data.asset_id + ".png");
            }
             
            if(Validator(data.asset_id)){
                if(Validator(data.asset_name)) update["asset_name"] = data.asset_name;
                if(Validator(data.description)) update["description"] = data.description;
                return Response(res, 200, "Berhasil menambahkan data asset !", await Asset.where({asset_id : data.asset_id}).update(update));
            }
            return Response(res, 400, "Gagal menambahkan data asset : asset_id tidak ditemukan !");
        });
    }

    async delete(req, res){
        await resourceController.roomUpload.single('file')(req,res, async(err)=>{
            const data = req.body;
            resourceController.deleteFile(data.asset_id + ".png");
            return Response(res, 200, "Berhasil menghapus data asset !", await Asset.where({asset_id : data.asset_id}).delete());
        });
    }
}

module.exports = new assetController();