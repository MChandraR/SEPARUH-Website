const Response = require('../../../utils/utils').sendResponse;

const ValidateRole = function(func) {
    return function(req, res, next) {
        // Validate if user is not logged in or session not found
        if (!req.session || !req.session.user) {
            return Response(res, 401, "Unauthorized: Please log in!", null); 
        }

        // Validate if user has 'admin' role
        if (req.session.user.role === 'admin') {
            return next();
        }
        
        return func?.not_found(req,res);
    }
}

module.exports = ValidateRole;