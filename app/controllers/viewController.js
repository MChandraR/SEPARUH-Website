const View = require('../../utils/views').view;
const Views = require('../../utils/views').view2;
const Compact = require('../../utils/views').compact;
const Response = require('../../utils/utils').sendResponse;
const url = require('url');


class viewController{
    index(req,res){
        return Views(res, 'home2');
    }

    login(req,res){
        return  Views(res, 'login');
    }

    // desain login versi figma
    login2(req,res){
        // Jika user sudah login redirect ke home
        if (req.session && req.session.user)
            return res.redirect('/');

        return  Views(res, 'login2');
    }

    beranda(req,res){
        return  Views(res, 'home');
    }

    // Beranda 2.0
    beranda2(req,res){
        return  Views(res, 'home2');
    }

    peminjaman(req,res){
        return  Views(res, 'peminjaman');
    }

    // Peminjaman 2.0
    peminjaman2(req,res){
        return  Views(res, 'peminjaman2');
    }

    ruangan(req,res){
        return res.send(Compact('ruangan', {
            room_name : "Ruangan 1"
        }));
    }

    profile(req,res){
        res.set('Content-Type', 'text/html');
        return  Views(res, 'profile');
    }

    register(req,res){
        return  Views(res, 'register');
    }

    kontak(req,res){
        return  Views(res, 'kontak');
    }

    pinjam(req,res){
        
    }
    // Admin view
    dashboard(req,res){
        const param = url.parse(req.url, true).query;
        if(param.page == "peminjaman") return res.send(Compact('request', {username : req.session.user.username}));
        if(param.page == "pengembalian") return res.send(Compact('returning', {username : req.session.user.username}));
        if(param.page == "ruangan") return res.send(Compact('room', {username : req.session.user.username}));
        if(param.page == "asset") return res.send(Compact('asset', {username : req.session.user.username}));
        return res.send(Compact('dashboard', {username : req.session.user.username}));
    }

    not_found(req,res){
        return  Views(res, 'not_found');
    }
}

module.exports = new viewController();