const Response = require('../../../utils/utils').sendResponse;

// Autentikasi terhadap hak akses user, untuk API endpoint khusus admin
const authorizeAdmin = function (req, res, next) {
    // Cek apakah user ada sesi, atau apakah user memiliki akun
    if (!req.session || !req.session.user) {
        return Response(res, 401, "Unauthorized: Please log in !", null);
    }
    
    // Cek apakah user memiliki role 'admin'
    if (req.session.user.role !== 'admin') {
        return Response(res, 403, "Forbidden: You do not have access to this resource", null);
    }

    // Lanjutkan ke middleware/route handler jika user adalah 'admin'
    next();
}

module.exports = authorizeAdmin;