require('dotenv').config();
const express = require('express');
const session = require('express-session')
const { body, validationResult } = require('express-validator');
const utils = require('./utils/utils');
const app = express()
const path = require('path');
const router = require('./app/routes');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mydb.rvfulzg.mongodb.net/pemweb?retryWrites=true&w=majority&appName=myDB`;


var sess = {
    secret: 'keyboard cat',
    resave : false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: uri, 
        collectionName: 'sessions'                      
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
    }
}

app.use(express.json());
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",router);

app.get('/test', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>total: ' + req.session.user['user_id'] + '</p>')
      res.write('<p>views: ' + req.sessionID + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

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

app.listen(3000,"0.0.0.0", (e)=>{
    console.log("Server start on http://localhost:3000");
});