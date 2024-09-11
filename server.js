const express = require('express');
const fs = require('fs');
const createServer = require('http').createServer
//Inisialisasi Server
const app = express()
const server = createServer(app, {});
const viewDir = "./app/views/";
const path = require('path');
//Routing
//Get untuk mengambil data dari server
//Post biasany untuk mengirim data ke server
//Put biasanya untuk update data
//Delete delete data
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res)=>{
    let usersPath = path.join(process.cwd(),viewDir + "index.html");
    const file = fs.readFileSync(usersPath, 'utf-8');
    
    res.send(file);
});

app.get ('/data/arya', (req, res)=>{
    res.send({
        "status" : 200,
        "message" : "berhasil mengambil data",
        "data" : {
            "nama" : "Arya",
            "nim" : "2201020001"
        }
    })
})

app.get('/data/adit', (req, res) => {
    res.send({
        "status" : 200, 
        "message" : "berhasil mengambil data",
        "data" : {
            "nama" : "Aditya Firmansyah", 
            "nim" : "2201020018",
            "Hobi": "Biliar lawan orang hoki",
        }
    });
});

app.get('/data/melah', (req, res) => {
    res.send({
        "status" : 200, 
        "message" : "berhasil mengambil data",
        "data" : {
            "nama" : "melahhhh", 
            "nim" : "10000",
            "Hobi": "reading",
        }
    });
});

app.get('/data/syawal', (req, res) => {
    res.send({
        "status" : 200,
        "message" : "berhasil mengambil data",
        "data" : {
            "nama" : "Syawal",
            "nim": "099"
        }
    });

});

app.listen(3000, (e)=>{
    console.log("Server start on http://localhost:3000");
});