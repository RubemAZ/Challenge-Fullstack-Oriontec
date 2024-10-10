"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_firebird_1 = __importDefault(require("node-firebird"));
class FirebirdConnection {
    static getConnection() {
        return new Promise((resolve, reject) => {
            node_firebird_1.default.attach(FirebirdConnection.options, (err, db) => {
                if (err) {
                    console.log('CONNECTION ERROR', err);
                    return reject(err);
                }
                resolve(db);
            });
        });
    }
}
FirebirdConnection.options = {
    host: process.env.DB_HOST,
    port: 3050,
    database: process.env.DATABASE_URL || `${process.cwd()}/src/domain/database/CLIENTDATA.FDB`,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};
exports.default = FirebirdConnection;
