const express = require('express');
const fs = require('fs');
const createServer = require('http').createServer
const utils = require('./utils/utils');
//Inisialisasi Server
const app = express()
const server = createServer(app, {});
const viewDir = "./app/views/";
const path = require('path');
const {sql} = require('@vercel/postgres');
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

app.get('/api/users', async(req,res)=>{
    const result = await sql`SELECT*FROM users ;`;
    res.send(result.rows);
});

app.post('/api/users', async(req,res)=>{
    const data = req.body;
    console.log(data);
    //const result = await sql`INSERT INTO users VALUES('`+data.user_id+`', '`+data.username+`', '`+data.password+`', '`+data.name+`', '`+data.role+`', '`+data.email+`') ;`;
    const result = await sql`INSERT INTO users VALUES(${data.user_id}, ${data.username},${data.password},${data.name}, ${data.role}, ${data.email}) ;`;
    utils.sendResponse(res, 200, "Berhasil menambah data ", result);
});

app.put('/api/users', async(req,res)=>{
    const data = req.body;
    const result = await sql`UPDATE users SET email = ${data.email} WHERE user_id = ${data.user_id};`;
    utils.sendResponse(res, 200,  `Berhasil mengupdate data user (${data.user_id}) !`, result);
});

app.delete('/api/users', async(req, res)=>{
    const data = req.body;
    const result = await sql`DELETE FROM users WHERE user_id = ${data.user_id};`;
    utils.sendResponse(res,200, "Berhasil mengupdate data !", result);
});

app.post('/api/users/login', async(req,res)=> {
    const data = req.body;
    const query = await sql`SELECT * FROM users WHERE user_id = ${data.user_id} AND password = ${data.password}`;
    const result = {
        "data": data,
        "query": query
    }
    console.log(data);
    if (query.rows.length > 1) {
        utils.sendResponse(res, 200, `Berhasil login ke user, ${data.user_id} !`, result);
    } else {
        utils.sendResponse(res, 401, `Gagal login email atau password salah ! `, result);
    }
});

app.get('/api', async(req,res)=>{
    utils.sendResponse(res,200, "Berhasil mengupdate data !", null);
});

app.listen(3000, (e)=>{
    console.log("Server start on http://localhost:3000");
});