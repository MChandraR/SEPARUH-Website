const route = require('express').Router();
const View = require('./../utils/views').view;
const viewController = require('./controllers/viewController');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const ruanganController = require('./controllers/ruanganController');

//Route untuk view
route.get('/', (req,res)=>viewController.index(req,res));
route.get('/login',(req,res)=>viewController.login(req,res));
route.get('/login2',(req,res)=>viewController.login2(req,res));
route.get('/home',(req,res)=>viewController.beranda(req,res));
route.get('/peminjaman', (req,res)=>viewController.peminjaman(req,res));

//Route untuk user
route.get('/api/users', async(req,res)=>await userController.index(req,res));
route.post('/api/users', async(req,res)=>await userController.insert(req,res));
route.put('/api/users', async(req,res)=>await userController.update(req,res));
route.delete('/api/users', async(req, res)=>await userController.delete(req,res));

//Route untuk session
route.get('/api/session', async(req,res)=>await sessionController.index(req,res));
route.post('/login', async(req,res)=>await sessionController.login(req,res));
route.get('/logout', async(req,res)=>await sessionController.logout(req,res));

//Route untuk ruangan
route.get('/api/ruangan', async(req,res)=>await ruanganController.index(req,res));
route.post('/api/ruangan', async(req,res)=>await ruanganController.addRuangan(req,res));
route.put('/api/ruangan', async(req,res)=>await ruanganController.updateRuangan(req,res));
route.delete('/api/ruangan', async(req,res)=>await ruanganController.deleteRuangan(req,res));


module.exports = route;