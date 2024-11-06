const route = require('express').Router();
const View = require('./../utils/views').view;
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');

route.get('/', (req,res)=>res.send(View('index')));
route.get('/login',(req,res)=>loginController.index(req,res));

//Route untuk user
route.get('/api/users', async(req,res)=>await userController.index(req,res));
route.post('/api/users', async(req,res)=>await userController.insert(req,res));
route.put('/api/users', async(req,res)=>await userController.update(req,res));
route.delete('/api/users', async(req, res)=>await userController.delete(req,res));

//Route untuk session
route.get('/api/session', async(req,res)=>await sessionController.index(req,res));
route.post('/login', async(req,res)=>await sessionController.login(req,res));
route.get('/logout', async(req,res)=>await sessionController.logout(req,res));
module.exports = route;