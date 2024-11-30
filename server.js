require('dotenv').config();
const express = require('express');
const session = require('express-session')
const { body, validationResult } = require('express-validator');
const utils = require('./utils/utils');
const app = express()
const path = require('path');
const router = require('./app/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
app.use(express.urlencoded({extended:true}));
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",router);

app.listen(3000,"0.0.0.0", (e)=>{
    console.log("Server start on http://localhost:3000");
});