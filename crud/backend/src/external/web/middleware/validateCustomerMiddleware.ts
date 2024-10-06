import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Esquema de validação com Zod
const customerSchema = z.object({
    name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
    email: z.string().email({ message: "E-mail inválido." }),
    document: z.string().min(11, { message: "Documento deve ter no mínimo 11 caracteres." })
});

// Middleware de validação
const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Faz a validação dos dados com Zod
        customerSchema.parse(req.body);
        next(); // Se os dados são válidos, passa para o próximo middleware ou controlador
    } catch (error: any) {
        // Retorna erros de validação
        return res.status(400).json({
            message: 'Erro de validação',
            error: error.errors.map((err: any) => err.message)
        });
    }
};

export default validateCustomer;