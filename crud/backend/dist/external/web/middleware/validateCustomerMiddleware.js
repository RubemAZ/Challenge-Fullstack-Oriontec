"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validator_brasil_1 = require("validator-brasil");
// Esquema de validação com Zod
const customerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
    email: zod_1.z.string().email({ message: "E-mail inválido." }),
    document: zod_1.z.string()
        .min(11, { message: "Documento deve ter no mínimo 11 números" })
        .max(14, { message: 'Documento deve ter no máximo 14 números' })
});
// Middleware de validação
const validateCustomerMiddleware = (req, res, next) => {
    try {
        const data = req.body;
        // Faz a validação dos dados com Zod
        customerSchema.parse(data);
        if (data.document.length === 11 && !(0, validator_brasil_1.isCPF)(data.document)) {
            throw new Error('CPF inválido');
        }
        if (data.document.length === 14 && !(0, validator_brasil_1.isCNPJ)(data.document)) {
            throw new Error('CNPJ inválido');
        }
        next(); // Se os dados são válidos, passa para o próximo middleware ou controlador
    }
    catch (error) {
        // Retorna erros de validação
        return res.status(400).json({
            message: 'Erro de validação',
            error: error.errors && error.errors.length
                ? error.errors.map((err) => err.message)
                : [error.message]
        });
    }
};
exports.default = validateCustomerMiddleware;
