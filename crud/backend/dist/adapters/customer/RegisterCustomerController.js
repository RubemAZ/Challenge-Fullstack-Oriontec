"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterCustomerController {
    constructor(registerCustomerUseCase) {
        this.registerCustomerUseCase = registerCustomerUseCase;
    }
    async handle(req, res) {
        const { name, email, document } = req.body;
        try {
            await this.registerCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer registered successfully' });
        }
        catch (error) {
            const err = error;
            res.status(400).send({ error: err.message });
        }
    }
}
exports.default = RegisterCustomerController;
