const View = require('../../utils/views').view;

class loginController{
    index(req,res){
        return res.send(View('login'));
    }
}

module.exports = new loginController();