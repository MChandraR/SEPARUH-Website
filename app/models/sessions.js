const model = require("./model");

class sessions extends model{
    constructor(){ 
        super();
        this.table = 'sessions';
    }
}

module.exports = new sessions();