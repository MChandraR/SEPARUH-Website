const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class loginController{
    index(req,res){
        return res.send(View('login'));
    }
}

module.exports = new loginController();