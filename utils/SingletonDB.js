// utils/SingletonDB.js
const mysql = require('mysql2');

class SingletonDB {
    constructor() {
        if (!SingletonDB.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'clientes'
            });

            this.connection.connect(err => {
                if (err) {
                    console.error('Error al conectar con la base de datos:', err.stack);
                    return;
                }
                console.log('Conexión a la base de datos establecida como id ' + this.connection.threadId);
            });

            SingletonDB.instance = this;
        }
        return SingletonDB.instance;
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

const instance = new SingletonDB();
Object.freeze(instance);

module.exports = instance;
