"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerRepository_1 = __importDefault(require("../../external/db/customer/CustomerRepository"));
class CustomerController {
    constructor() {
        this.customerRepository = new CustomerRepository_1.default();
    }
    // Adicionar um novo cliente
    async add(req, res) {
        console.log(req.body);
        try {
            const data = req.body;
            await this.customerRepository.add(data);
            res.status(201).send({ message: 'Cliente adicionado com sucesso!' });
        }
        catch (error) {
            res.status(400).send({ message: 'Erro ao adicionar cliente.', error });
        }
    }
    // Listar todos os clientes
    async getAll(req, res) {
        try {
            const customers = await this.customerRepository.getAll();
            res.status(200).send(customers);
        }
        catch (error) {
            res.status(500).send({ message: 'Erro ao listar clientes.', error });
        }
    }
    // Atualizar um cliente
    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            await this.customerRepository.update(id, data);
            res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
        }
        catch (error) {
            res.status(500).send({ message: 'Erro ao atualizar cliente.', error });
        }
    }
    // Deletar um cliente
    async delete(req, res) {
        try {
            const id = req.params.id;
            await this.customerRepository.delete(id);
            res.status(200).send({ message: 'Cliente deletado com sucesso!' });
        }
        catch (error) {
            res.status(500).send({ message: 'Erro ao deletar cliente.', error });
        }
    }
    // Obter cliente por ID
    async getById(req, res) {
        try {
            const id = req.params.id;
            const customer = await this.customerRepository.getById(id);
            if (customer) {
                res.status(200).send(customer);
            }
            else {
                res.status(404).send({ message: 'Cliente não encontrado.' });
            }
        }
        catch (error) {
            res.status(500).send({ message: 'Erro ao obter cliente.', error });
        }
    }
    // Buscar clientes por nome
    async searchByName(req, res) {
        try {
            const name = req.query.name;
            const customers = await this.customerRepository.searchByName(name);
            if (customers.length > 0) {
                res.status(200).send(customers);
            }
            else {
                res.status(404).send({ message: 'Nenhum cliente encontrado com o nome informado.' });
            }
        }
        catch (error) {
            res.status(500).send({ message: 'Erro ao buscar clientes.', error });
        }
    }
}
exports.default = new CustomerController();
