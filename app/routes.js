const route = require('express').Router();
const View = require('./../utils/views').view;
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

route.get('/', (req,res)=>res.send(View('index')));
route.get('/login',(req,res)=>loginController.index(req,res));

//Route untuk user
route.get('/api/users', async(req,res)=>userController.get(req,res));
route.post('/api/users', async(req,res)=>userController.post(req,res));

module.exports = route;