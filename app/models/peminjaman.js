const model = require("./model");

class peminjaman extends model{
    constructor(){ 
        super();
        this.table = 'request';
    }
}

module.exports = new peminjaman();