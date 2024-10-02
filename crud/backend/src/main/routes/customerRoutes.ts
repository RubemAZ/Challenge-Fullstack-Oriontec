import { Router } from 'express';
import CustomerController from '../controllers/customerController';

const router = Router();

// Rota para adicionar um novo cliente
router.post('/customers', (req, res) => CustomerController.add(req, res));

// Rota para listar todos os clientes
router.get('/customers', (req, res) => CustomerController.getAll(req, res));

// Rota para atualizar um cliente pelo ID
router.put('/customers/:id', (req, res) => CustomerController.update(req, res));

// Rota para deletar um cliente pelo ID
router.delete('/customers/:id', (req, res) => CustomerController.delete(req, res));

export default router;
