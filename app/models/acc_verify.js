const model = require("./model");

class acc_verify extends model{
    constructor(){ 
        super();
        this.table = 'acc_verify';
    }
}

module.exports = new acc_verify();