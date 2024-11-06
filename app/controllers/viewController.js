const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class loginController{
    index(req,res){
        return res.send(View('index'));
    }

    login(req,res){
        return res.send(View('login'));
    }

    // desain login versi figma
    login2(req,res){
        return res.send(View('login2'));
    }
}

module.exports = new loginController();