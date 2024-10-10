"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebirdConnection_1 = __importDefault(require("../firebird/FirebirdConnection"));
class CustomerRepository {
    // Adicionar novo cliente
    async add(data) {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'INSERT INTO customers (name, email, document) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Listar todos os clientes
    async getAll() {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'SELECT * FROM customers';
        return new Promise((resolve, reject) => {
            db.query(query, [], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    // Atualizar cliente existente
    async update(id, data) {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'UPDATE customers SET name = ?, email = ?, document = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document, id], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Deletar cliente pelo ID
    async delete(id) {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'DELETE FROM customers WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    // Buscar cliente por ID
    async getById(id) {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'SELECT * FROM customers WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result[0]);
                }
            });
        });
    }
    // Buscar clientes por nome
    async searchByName(name) {
        const db = await FirebirdConnection_1.default.getConnection();
        const query = 'SELECT * FROM customers WHERE name LIKE ?';
        return new Promise((resolve, reject) => {
            db.query(query, [`%${name}%`], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.default = CustomerRepository;
