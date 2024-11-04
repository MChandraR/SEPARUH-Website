const express = require('express');
const fs = require('fs');
const createServer = require('http').createServer
const utils = require('./utils/utils');
const View = require('./utils/views').view;
const app = express()
const server = createServer(app, {});
const viewDir = "./app/views/";
const path = require('path');
const {sql} = require('@vercel/postgres');

app.use(express.json());
app.use(express.static('./public'));

app.get('/', async(req, res)=>{
    res.send(View('landing'));
});

app.get('/landing', async(req, res)=>{
    res.send(View('landing'));
});

app.get('/api/users', async(req,res)=>{
    const result = await sql`SELECT*FROM users ;`;
    res.send(result.rows);
});

app.get('/login', async(req,res)=> {
    res.send(View('login'));
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
        data,
        "query": query
    }
    console.log(data);
    if (query.rowCount >= 1) {
        utils.sendResponse(res, 200, `Berhasil login !   USER_ID: ${data.user_id}, EMAIL: ${query.rows[0].email} !`, result);
    } else {
        utils.sendResponse(res, 401, `Gagal login email atau password salah ! `, result);
    }
});

app.get('/api', async(req,res)=>{
    utils.sendResponse(res,200, "Berhasil mengupdate data !", null);
});

app.listen(80,"0.0.0.0", (e)=>{
    console.log("Server start on http://localhost:3000");
});