require('dotenv').config();
const express = require('express');
const session = require('express-session')
const { body, validationResult } = require('express-validator');
const utils = require('./utils/utils');
const app = express()
const path = require('path');
const router = require('./app/routes');
var sess = {
    secret: 'keyboard cat',
    cookie: {

    }
}

app.use(express.json());
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",router);

app.get('/destroy', (req,res)=>{
    req.session.destroy((e)=>{
        res.send("Berhasil dihapus !");
    });
});

app.get('/session', (req,res)=>{
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session, typically a user id
        req.session.user = {
            nama : "chandra"
        }
        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
    
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
            if (err) return next(err)
            else res.send("berhasil" + req.session.user);
        })
      })
    
});

app.get('/test', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>total: ' + req.session.user['nama'] + '</p>')
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