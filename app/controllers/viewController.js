const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;

class viewController{
    index(req,res){
        return res.send(View('home'));
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

    peminjaman(req,res){
        return res.send(View('peminjaman'));
    }

    register(req,res){
        return res.send(View('register'));
    }
}

module.exports = new viewController();