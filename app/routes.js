const route = require('express').Router();
const View = require('./../utils/views').view;
const viewController = require('./controllers/viewController');
const userController = require('./controllers/userController');
const accController = require('./controllers/accController');
const sessionController = require('./controllers/sessionController');
const ruanganController = require('./controllers/ruanganController');
const resourceController = require('./controllers/resourceController.js');
const { validateSession, authorizeAdmin, ValidateRole} = require('./middlewares/index.js');
const validator = require('./middlewares/validator.js');
const assetController = require('./controllers/assetController.js');
const peminjamanController = require('./controllers/peminjamanController.js');

//Route untuk view
route.get('/', ValidateRole(viewController), (req,res)=>viewController.index(req,res, true));
route.get('/login', (req,res)=>viewController.login2(req,res));
route.get('/register', (req,res)=>viewController.register(req,res));
route.get('/dashboard', validateSession, authorizeAdmin, (req, res) => viewController.dashboard(req, res));
route.get('/home', validateSession, (req,res)=>viewController.beranda(req,res));
route.get('/peminjaman', validateSession, ValidateRole(viewController), viewController.peminjaman2);
route.get('/peminjaman/ruangan', validateSession, (req,res)=>ruanganController.view(req,res));
route.get('/profile', validateSession, (req,res)=>viewController.profile(req,res));

//Route view cadangan
route.get('/home2', (req,res)=>viewController.beranda2(req,res));
route.get('/peminjaman2', validateSession, (req,res)=>viewController.peminjaman2(req,res));

//Route untuk user dengan role 'admin'
route.get('/api/users', authorizeAdmin, async(req,res)=>await userController.index(req,res));
route.post('/api/users', authorizeAdmin, async(req,res)=>await userController.insert(req,res));
route.put('/api/users', authorizeAdmin, async(req,res)=>await userController.update(req,res));
route.delete('/api/users', authorizeAdmin, async(req, res)=>await userController.delete(req,res));
route.post('/register', async(req,res)=>await userController.insert(req,res));

//Route untuk user/profile
route.get('/api/profile', validateSession, async(req,res)=>await userController.getUserProfile(req,res));
route.post('/api/profile', validateSession, async(req,res)=>await userController.updateUserProfile(req,res));

//Route untuk session
route.get('/api/session', async(req,res)=>await sessionController.index(req,res));
route.post('/login', async(req,res)=>await sessionController.login(req,res));
route.get('/logout', async(req,res)=>await sessionController.logout(req,res));

//Route untuk ruangan
route.get('/api/room', validateSession,async(req,res)=>await ruanganController.index(req,res));
route.post('/api/room', authorizeAdmin, async(req,res)=>await ruanganController.addRuangan(req,res));
route.put('/api/room', authorizeAdmin,  async(req,res)=>await ruanganController.updateRuangan(req,res));
route.delete('/api/room', authorizeAdmin, async(req,res)=>await ruanganController.deleteRuangan(req,res));

//Route untuk asset
route.get('/api/asset', validateSession,async(req,res)=>await assetController.index(req,res));
route.post('/api/asset', authorizeAdmin, async(req,res)=>await assetController.create(req,res));
route.put('/api/asset', authorizeAdmin,  async(req,res)=>await assetController.update(req,res));
route.delete('/api/asset', authorizeAdmin, async(req,res)=>await assetController.delete(req,res));

//Route untuk peminjaman
route.get('/peminjaman/detail', validateSession, async(req,res)=>viewController.pinjam(req,res));
route.get('/api/request', validateSession, async(req,res)=>await peminjamanController.index(req,res));
route.post('/api/request', validateSession, async(req,res)=>await peminjamanController.create(req,res));
route.put('/api/request', authorizeAdmin, async(req,res)=>await peminjamanController.update(req,res));
route.delete('/api/request', authorizeAdmin, async(req,res)=>await peminjamanController.delete(req,res));
//Peminjaman untuk user
route.get('/api/user/request', validateSession, async(req,res)=>await peminjamanController.getUserRequest(req,res));

//Route untuk resources
route.get('/api/stat', async(req,res)=>await resourceController.index(req,res));
route.get('/uploads', async(req,res)=>await resourceController.getImage(req,res));
route.post('/uploads', async(req,res)=>await resourceController.uploadFile(req,res));

//Route untuk verifikasi & keamanan akun
route.get('/api/user/verify', async(req,res)=>await accController.index(req,res) );
route.get('/recovery', async(req,res)=>await accController.recoverAccount(req,res));
route.post('/recovery', async(req,res)=>await accController.resetPassword(req,res));
route.get('/api/password/reset', async(req,res)=>await accController.changePass(req,res));
route.post('/api/password/reset', async(req,res)=>await accController.updateAccount(req,res));

route.get('*', (req,res)=>viewController.not_found(req,res));

module.exports = route;