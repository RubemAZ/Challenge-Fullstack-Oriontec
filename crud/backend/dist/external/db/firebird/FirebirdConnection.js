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
                    return reject(err);
                }
                resolve(db);
            });
        });
    }
}
FirebirdConnection.options = {
    host: 'localhost', // ou o endereço do seu servidor Firebird
    database: 'path/to/your/database.fdb', // caminho do seu banco de dados
    user: 'sysdba', // usuário do banco de dados
    password: 'masterkey', // senha do banco de dados
    role: undefined, // ou deixe como undefined
};
exports.default = FirebirdConnection;
