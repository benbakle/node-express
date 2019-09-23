
const UUID = require('../../uuid');
const data = require('../data/db.json');

class Account {
    constructor() {
        this.uuid = new UUID();
        this.data = data;
    }

    async get() {
        return this.data.accounts;
    }

    async add(item) {
        this.data.accounts.push({ id: this.uuid.new(), ...item });
        this.write();
    }

    write() {
        const fs = require('fs');
        fs.writeFile('./public/data/db.json', `\n` + JSON.stringify(this.data), 'ascii', (err) => {
            if (err) throw err;
            console.log('data written!');
        });
    }
}

module.exports = Account;