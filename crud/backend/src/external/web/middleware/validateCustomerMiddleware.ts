import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { isCNPJ, isCPF } from 'validator-brasil';

// Esquema de validação com Zod
const customerSchema = z.object({
    name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
    email: z.string().email({ message: "E-mail inválido." }),
    document: z.string()
        .min(11, { message: "Documento deve ter no mínimo 11 números" })
        .max(14, { message: 'Documento deve ter no máximo 14 números' })
});

// Middleware de validação
const validateCustomerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        // Faz a validação dos dados com Zod
        customerSchema.parse(data);

        if (data.document.length === 11 && !isCPF(data.document)) {
            throw new Error('CPF inválido')
        }

        if (data.document.length === 14 && !isCNPJ(data.document)) {
            throw new Error('CNPJ inválido')
        }

        next(); // Se os dados são válidos, passa para o próximo middleware ou controlador
    } catch (error: any) {
        // Retorna erros de validação
        return res.status(400).json({
            message: 'Erro de validação',
            error: error.errors && error.errors.length 
                ? error.errors.map((err: any) => err.message)
                : [error.message]
        });
    }
};

export default validateCustomerMiddleware;