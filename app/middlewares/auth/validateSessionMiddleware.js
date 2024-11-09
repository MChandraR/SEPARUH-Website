// Validasi sesi user, redirect jika sesi user tidak ada
const validateSession = function (req, res, next){
    if (req.session && req.session.user){
        return next();
    } else return res.redirect('/login');
}

module.exports = validateSession;