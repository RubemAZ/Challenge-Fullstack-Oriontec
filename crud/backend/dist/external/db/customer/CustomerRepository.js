"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_firebird_1 = require("node-firebird"); // Importa o pool do node-firebird
class CustomerRepository {
    constructor() {
        // Configuração do pool de conexões
        this.connectionPool = (0, node_firebird_1.pool)(5, { /* opções de configuração */});
    }
    // Exemplo de método para listar clientes
    async getAllCustomers() {
        return new Promise((resolve, reject) => {
            this.connectionPool.get((err, client) => {
                if (err)
                    return reject(err);
                client.query('SELECT * FROM customers', (err, result) => {
                    client.release(); // Libera a conexão
                    if (err)
                        return reject(err);
                    resolve(result);
                });
            });
        });
    }
}
exports.default = CustomerRepository;
