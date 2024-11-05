const getClient = require('./mongo');
const model = require('./model');

class Users extends model{
    constructor(){
        super();
        this.table = "users";
    }

    
}

module.exports = new Users();