const createHash = require('crypto').createHash;

class Encryptor{
    sha256(text){
        return createHash('sha256').update(text).digest('hex');
    }
}

module.exports = new Encryptor();