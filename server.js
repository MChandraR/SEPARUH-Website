require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const utils = require('./utils/utils');
const app = express()
const path = require('path');
const router = require('./app/routes');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/",router);




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

app.post('/api/login', [
    body('user_id').trim().isLength({ min: 1 }).withMessage('Username is required!'),
    body('password').trim().isLength({ min: 1 }).withMessage('Password is required!')
], async(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        utils.sendResponse(res, 400, "Validation Error", errors.array());
    }
    else {
        const data = req.body;
        const result = { data, query: await sql`SELECT * FROM users WHERE user_id = ${data.user_id} AND password = ${data.password}` }

        if (result.query.rowCount >= 1) 
            utils.sendResponse(res, 200, "Berhasil login!", result);
        else
            utils.sendResponse(res, 401, "Gagal login!", result);
        res.send(result);
    }
});

app.get('/api', async(req,res)=>{
    utils.sendResponse(res,200, "Berhasil mengupdate data !", null);
});

app.listen(3000,"0.0.0.0", (e)=>{
    console.log("Server start on http://localhost:3000");
});