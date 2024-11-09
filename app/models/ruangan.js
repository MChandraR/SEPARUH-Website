const model = require("./model");

class ruangan extends model{
    constructor(){ 
        super();
        this.table = 'ruangan';
    }
}

module.exports = new ruangan();