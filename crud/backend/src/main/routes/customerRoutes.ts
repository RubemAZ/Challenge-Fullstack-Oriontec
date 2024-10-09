import { Router, Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import CustomerController from '../controllers/customerController';
import validateCustomerMiddleware from '../../external/web/middleware/validateCustomerMiddleware';

const router = Router();

// Rota para adicionar um novo cliente
router.post('/customers', validateCustomerMiddleware, (req: Request, res: Response) => CustomerController.add(req, res));

// Rota para listar todos os clientes
router.get('/customers', (req: Request, res: Response) => CustomerController.getAll(req, res));

// Rota para atualizar um cliente pelo ID
router.put('/customers/:id', validateCustomerMiddleware, (req: Request, res: Response) => CustomerController.update(req, res));

// Rota para deletar um cliente pelo ID
router.delete('/customers/:id', (req: Request, res: Response) => CustomerController.delete(req, res));

export default router;
