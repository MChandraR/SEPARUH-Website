const View = require('../../utils/views').view;
const Compact = require('../../utils/views').compact;
const Response = require('../../utils/utils').sendResponse;
const url = require('url');


class viewController{
    index(req,res){
        return res.send(View('home'));
    }

    login(req,res){
        return res.send(View('login'));
    }

    // desain login versi figma
    login2(req,res){
        // Jika user sudah login redirect ke home
        if (req.session && req.session.user)
            return res.redirect('/');

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
        res.set('Content-Type', 'text/html');
        return res.send(View('profile'));
    }

    register(req,res){
        return res.send(View('register'));
    }

    kontak(req,res){
        return res.send(View('kontak'));
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
        return res.send(View('not_found'));
    }
}

module.exports = new viewController();