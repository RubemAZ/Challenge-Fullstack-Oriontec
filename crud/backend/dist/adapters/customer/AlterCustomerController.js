"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlterCustomerController {
    constructor(AlterCustomerUseCase) {
        this.AlterCustomerUseCase = AlterCustomerUseCase;
    }
    async handle(req, res) {
        const { name, email, document } = req.body;
        try {
            await this.AlterCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer Alterd successfully' });
        }
        catch (error) {
            const err = error;
            res.status(400).send({ error: err.message });
        }
    }
}
exports.default = AlterCustomerController;
