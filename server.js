const express = require('express');
const fs = require('fs');
const createServer = require('http').createServer
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
    const result = await sql`INSERT INTO users VALUES('`+data.user_id+`', '`+data.username+`', '`+data.password+`', '`+data.name+`', '`+data.role+`', '`+data.email+`')`;
    //const result = await sql`INSERT INTO users VALUES('${data.user_id}', '${data.username}','${data.passsword}','${data.name}', '${data.role}', '${data.email}')`;
    res.send(result.rows);
});

app.listen(3000, (e)=>{
    console.log("Server start on http://localhost:3000");
});