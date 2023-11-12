import sqlite3 from 'sqlite3';
import dbConfig from '../config/dbConfig.mjs'

const db = new sqlite3.Database(dbConfig.databaseFile, dbConfig.options);

export class funcionarioModel {
    static findUserByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM funcionario WHERE username=?', [username], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            });
        });
    }
    
    static createUser(username, password) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO funcionario (username, password) VALUES (? , ?)', [username, password], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lsdtID })
                }
            });
        });
    }
}