import { Router, Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import CustomerController from '../controllers/customerController';

const router = Router();

// Esquema de validação
const customerSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  document: z.string().min(1, { message: "O documento é obrigatório" }),
});

// Middleware de validação
const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    customerSchema.parse(req.body); // Valida o corpo da requisição
    next(); // Se a validação passar, segue para o controlador
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors,
      });
    } else {
      next(error); // Caso seja um erro desconhecido, passa para o próximo middleware
    }
  }
};

// Rota para adicionar um novo cliente
router.post('/customers', validateCustomer, (req: Request, res: Response) => CustomerController.add(req, res));

// Rota para listar todos os clientes
router.get('/customers', (req: Request, res: Response) => CustomerController.getAll(req, res));

// Rota para atualizar um cliente pelo ID
router.put('/customers/:id', validateCustomer, (req: Request, res: Response) => CustomerController.update(req, res));

// Rota para deletar um cliente pelo ID
router.delete('/customers/:id', (req: Request, res: Response) => CustomerController.delete(req, res));

export default router;
