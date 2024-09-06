const mysql = require('mysql');

class SingletonDB {
    constructor() {
        if (!SingletonDB.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'clientes'
            });
            this.connection.connect();
            SingletonDB.instance = this;
        }
        return SingletonDB.instance;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = SingletonDB;
