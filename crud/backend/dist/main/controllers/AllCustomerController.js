"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simulando um banco de dados com um array
const customers = [
    { id: 1, name: 'Cliente A' },
    { id: 2, name: 'Cliente B' },
    { id: 3, name: 'Cliente C' },
];
// Controller para listar todos os clientes
class AllCustomerController {
    handle(req, res) {
        res.json(customers);
    }
}
exports.default = new AllCustomerController();
