import { Request, Response } from 'express';
import CustomerRepository from '../../external/db/customer/CustomerRepository';

class CustomerController {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    // Adicionar um novo cliente
    async add(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        try {
            const data = req.body;
            await this.customerRepository.add(data);
            res.status(201).send({ message: 'Cliente adicionado com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: 'Erro ao adicionar cliente', error });
        }
    }

    // Listar todos os clientes
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const customers = await this.customerRepository.getAll();
            res.status(200).send(customers);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao listar clientes', error });
        }
    }

    // Atualizar um cliente
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;
            await this.customerRepository.update(id, data);
            res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Erro ao atualizar cliente', error });
        }
    }

    // Deletar um cliente
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await this.customerRepository.delete(id);
            res.status(200).send({ message: 'Cliente deletado com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Erro ao deletar cliente', error });
        }
    }

    // Obter cliente por ID
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const customer = await this.customerRepository.getById(id);
            if (customer) {
                res.status(200).send(customer);
            } else {
                res.status(404).send({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao obter cliente', error });
        }
    }

    // Buscar clientes por nome
    async searchByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.query.name as string;
            const customers = await this.customerRepository.searchByName(name);
            if (customers.length > 0) {
                res.status(200).send(customers);
            } else {
                res.status(404).send({ message: 'Nenhum cliente encontrado com o nome informado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar clientes', error });
        }
    }
}

export default new CustomerController();
