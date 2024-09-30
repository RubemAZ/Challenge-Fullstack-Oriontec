"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebirdConnection_1 = __importDefault(require("../firebird/FirebirdConnection")); // Ajuste o caminho se necessário
class CustomerRepository {
    // Adicionar novo cliente
    async add(data) {
        const db = await FirebirdConnection_1.default.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'INSERT INTO customers (name, email, document) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                }
                else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }
    // Atualizar cliente existente
    async update(id, data) {
        const db = await FirebirdConnection_1.default.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'UPDATE customers SET name = ?, email = ?, document = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document, id], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                }
                else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }
    // Deletar cliente pelo ID
    async delete(id) {
        const db = await FirebirdConnection_1.default.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'DELETE FROM customers WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                }
                else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }
}
exports.default = CustomerRepository;
