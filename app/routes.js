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

const akunController = require('./controllers/AkunController');
//Route untuk view
route.get('/', (req,res)=>viewController.index(req,res, true));
route.get('/login', (req,res)=>viewController.login2(req,res));
route.get('/register', (req,res)=>viewController.register(req,res));
route.get('/dashboard', validateSession, ValidateRole(viewController), (req,res)=>viewController.dashboard(req, res));
route.get('/home', validateSession, (req,res)=>viewController.beranda(req,res));
route.get('/peminjaman', validateSession,  (req,res)=>viewController.peminjaman2(req,res));
route.get('/peminjaman/asset', validateSession, (req,res)=>assetController.view(req,res));
route.get('/peminjaman/ruangan', validateSession, (req,res)=>ruanganController.view(req,res));
route.get('/profile', validateSession, (req,res)=>viewController.profile(req,res));
route.get('/kontak', (req,res)=>viewController.kontak(req,res));

//Route view cadangan
route.get('/home2', (req,res)=>viewController.beranda2(req,res));
route.get('/peminjaman2', validateSession, (req,res)=>viewController.peminjaman2(req,res));

//Route untuk user dengan role 'admin'
route.get('/api/users', authorizeAdmin, async(req,res)=> userController.index(req,res));
route.post('/api/users', authorizeAdmin, async(req,res)=> userController.insert(req,res));
route.put('/api/users', authorizeAdmin, async(req,res)=> userController.update(req,res));
route.delete('/api/users', authorizeAdmin, async(req, res)=> userController.delete(req,res));
route.post('/register', async(req,res)=> userController.insert(req,res));
route.get('/api/user/session-check', async(req,res)=> userController.isUserLoggedIn(req,res));

//Route untuk user/profile
route.get('/api/profile', validateSession, async(req,res)=> userController.getUserProfile(req,res));
route.post('/api/profile', validateSession, async(req,res)=> userController.updateUserProfile(req,res));

//Route untuk session
route.get('/api/session', async(req,res)=> sessionController.index(req,res));
route.post('/login', async(req,res)=> sessionController.login(req,res));
route.get('/logout', async(req,res)=> sessionController.logout(req,res));

//Route untuk ruangan
route.get('/api/room', validateSession,async(req,res)=> ruanganController.index(req,res));
route.post('/api/room', authorizeAdmin, async(req,res)=> ruanganController.addRuangan(req,res));
route.put('/api/room', authorizeAdmin,  async(req,res)=> ruanganController.updateRuangan(req,res));
route.delete('/api/room', authorizeAdmin, async(req,res)=> ruanganController.deleteRuangan(req,res));

//Route untuk asset
route.get('/api/asset', validateSession,async(req,res)=> assetController.index(req,res));
route.post('/api/asset', authorizeAdmin, async(req,res)=> assetController.create(req,res));
route.put('/api/asset', authorizeAdmin,  async(req,res)=> assetController.update(req,res));
route.delete('/api/asset', authorizeAdmin, async(req,res)=> assetController.delete(req,res));

//Route untuk peminjaman
route.get('/peminjaman/detail', validateSession, async(req,res)=>viewController.pinjam(req,res));
route.get('/api/request', validateSession, async(req,res)=> peminjamanController.index(req,res));
route.post('/api/request', validateSession, async(req,res)=> peminjamanController.create(req,res));
route.put('/api/request', authorizeAdmin, async(req,res)=> peminjamanController.update(req,res));
route.delete('/api/request', authorizeAdmin, async(req,res)=> peminjamanController.delete(req,res));
//Peminjaman untuk user
route.get('/api/user/request', validateSession, async(req,res)=> peminjamanController.getUserRequest(req,res));
route.post('/api/user/return', validateSession, async(req,res)=> peminjamanController.return(req,res));

//Route untuk resources
route.get('/api/all',validateSession, async(req,res)=> resourceController.all(req,res));
route.get('/api/stat', async(req,res)=> resourceController.index(req,res));
route.get('/uploads', async(req,res)=> resourceController.getImage(req,res));
route.post('/uploads', async(req,res)=> resourceController.uploadFile(req,res));

//Route untuk verifikasi & keamanan akun
route.get('/api/user/verify', async(req,res)=> accController.index(req,res) );
route.get('/recovery', async(req,res)=> accController.recoverAccount(req,res));
route.post('/recovery', async(req,res)=> accController.resetPassword(req,res));
route.get('/api/password/reset', async(req,res)=> accController.changePass(req,res));
route.post('/api/password/reset', async(req,res)=> accController.updateAccount(req,res));

route.get('/api/pengguna', async (req, res)=> akunController.index(req, res));



route.get('*', (req,res)=>viewController.not_found(req,res));


module.exports = route;