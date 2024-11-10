const model = require("./model");

class asset extends model{
    constructor(){ 
        super();
        this.table = 'asset';
    }
}

module.exports = new asset();