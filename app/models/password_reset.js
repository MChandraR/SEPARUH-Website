const model = require("./model");

class password_reset extends model{
    constructor(){ 
        super();
        this.table = 'password_reset';
    }
}

module.exports = new password_reset();