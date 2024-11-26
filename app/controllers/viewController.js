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

    // Beranda 2.0
    beranda2(req,res){
        return res.send(View('home2'));
    }

    peminjaman(req,res){
        return res.send(View('peminjaman'));
    }

    // Peminjaman 2.0
    peminjaman2(req,res){
        return res.send(View('peminjaman2'));
    }

    ruangan(req,res){
        return res.send(View('ruangan'));
    }

    register(req,res){
        return res.send(View('register'));
    }
}

module.exports = new viewController();