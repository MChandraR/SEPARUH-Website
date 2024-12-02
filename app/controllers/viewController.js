const View = require('../../utils/views').view;
const Compact = require('../../utils/views').compact;
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
        return res.send(Compact('ruangan', {
            room_name : "Ruangan 1"
        }));
    }

    profile(req,res){
        return res.send(View('profile'));
    }

    register(req,res){
        return res.send(View('register'));
    }

    pinjam(req,res){
        
    }


    // Admin view
    dashboard(req,res){
        return res.send(View('dashboard'));
    }

    not_found(req,res){
        return res.send(View('not_found'));
    }
}

module.exports = new viewController();