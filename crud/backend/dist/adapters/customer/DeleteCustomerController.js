"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCustomerController {
    constructor(DeleteCustomerUseCase) {
        this.DeleteCustomerUseCase = DeleteCustomerUseCase;
    }
    async handle(req, res) {
        const { name, email, document } = req.body;
        try {
            await this.DeleteCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer Deleted successfully' });
        }
        catch (error) {
            const err = error;
            res.status(400).send({ error: err.message });
        }
    }
}
exports.default = DeleteCustomerController;
