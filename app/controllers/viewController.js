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

    beranda(req,res){
        return res.send(View('home'));
    }
}

module.exports = new loginController();