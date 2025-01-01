const path = require('path');
const fs = require('fs');

class Views {
    view(dir) {
        let usersPath = path.join(process.cwd(), `./app/views/${dir}.html`);
        let file = fs.readFileSync(usersPath, 'utf-8');
        return file;
    }

    view2(res,dir) {
        let usersPath = path.join(process.cwd(), `./app/views/${dir}.html`);
        res.sendFile(usersPath);
    }

    compact(dir,data={}) {
        let usersPath = path.join(process.cwd(), `./app/views/${dir}.html`);
        let file = fs.readFileSync(usersPath, 'utf-8');
        for(let param in data){
            file = file.replace('$'+param, data[param]);
        }
        return file;
    }
}

module.exports = new Views();