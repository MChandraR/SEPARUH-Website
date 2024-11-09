const path = require('path');
const fs = require('fs');

class Views {
    view(dir) {
        let usersPath = path.join(process.cwd(), `./app/views/${dir}.html`);
        const file = fs.readFileSync(usersPath, 'utf-8');
        return file;
    }
}

module.exports = new Views();