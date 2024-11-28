const Ruangan = require('../models/ruangan');
const Asset = require('../models/asset');
const User = require('../models/users');
const View = require('../../utils/views').view;
const axios = require('axios');
require('dotenv').config();
const util = require('util');
const Response = require('../../utils/utils').sendResponse;
const {
    S3, GetObjectCommand
} = require('@aws-sdk/client-s3');



class resourceController {
    multer = require('multer');
    multerS3 = require('multer-s3');
    axios = require('axios');
    filename = "";

    s3 = new S3(
        {
            credentials:{
                accessKeyId : process.env.ACCESS_KEY,
                secretAccessKey : process.env.SECRET_KEY
            },
            region : process.env.REGION
        }
    );

    upload = this.multer({
        storage : this.multerS3({
            s3 : this.s3,
            bucket : process.env.BUCKET,
            metadata : (_, file, cb)=>{
                cb(null, {"fieldName" : file.fieldname});
                this.filename = "";
            },
            key : (req, file, cb)=>{
                cb(null, file.originalname);
            }
        })
    });

    roomUpload = this.multer({
        storage : this.multerS3({
            s3 : this.s3,
            bucket : process.env.BUCKET,
            metadata : (_, file, cb)=>{
                cb(null, {"fieldName" : file.fieldname});
                this.filename = "";
            },
            key : (req, file, cb)=>{
                const fileExtension = file.originalname.split('.').pop();
                file.originalname = `${Date.now()}.${fileExtension}`;
                cb(null, file.originalname );
            }
        })
    });


    rename = (oldFile, newFile )=>{
        this.s3.copyObject(
            {
                Bucket : process.env.BUCKET,
                CopySource: `${process.env.BUCKET}/${oldFile}`, // Sumber file lama
                Key: newFile, 

            }, function (err, data) {
                this.deleteFile(oldFile);
                if (err) {
                    console.error('Error copying file:', err);
                } else {
                    console.log('File copied successfully to new name:', newFileName);
                
                    
                
                }
          });
    }

    deleteFile = (oldFile)=>{
        const deleteParams = {
            Bucket: process.env.BUCKET,
            Key: oldFile,
        };

        console.log(oldFile);
    
        this.s3.deleteObject(deleteParams, function (err, data) {
            if (err) {
            console.error('Error deleting old file:', err);
            } else {
            console.log('Old file deleted successfully');
            }
        });
    }
   
    
    getObjectAsync = util.promisify(this.s3.send).bind(this.s3);
    getSignedUrl = require('@aws-sdk/s3-request-presigner').getSignedUrl;


    setFileName(name){
        this.filename = name;
        console.log("Nama file" , this.filename);
        return this;
    }

    async index(req,res){
        Response(res, 200, "Berhasil mengambil data !", {
            ruanganCount : await Ruangan.count(),
            assetCount : await Asset.count(),
            userCount : await User.where({role : "user"}).count(),
            userLogin : req.session.user != null
        });
    }


    async getImage(req,res){
        var key = req.url.split("/")[4];

        const params = {
            Bucket: process.env.BUCKET,
            Key: "base.png",
        };

        const command = new GetObjectCommand(params);
        const fileUrl = await this.getSignedUrl(this.s3,command,{expiresIn:3600});

        // res.send({
        //     "key" : key,
        //     "profile_url" : fileUrl
        // });

        // return;

         try {
            const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
            console.log(fileUrl);
            // Set appropriate headers
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Length', response.headers['content-length']);        
            // Pipe the file stream from the response to the HTTP response
            res.send(Buffer.from(await response.data));
          } catch (error) {
            console.error('Error downloading file:', error);
            res.status(500).send('Error downloading file');
          }

    }


    async uploadFile(req,res){
        this.upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "File upload error", details: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
    
            let file = req.file;
    
            console.log("Profile Picture Update\nFile info :");
            console.log({
                "filename": file.originalname,
                "tmp_path": file.filename,
                "size": (file.size / 1000).toString() + " kb"
            });
    
            res.status(200).json({ message: "File uploaded successfully", file });
        });
    }
}

module.exports = new resourceController();