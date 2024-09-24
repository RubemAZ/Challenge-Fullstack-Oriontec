import { Request, Response } from 'express';
import DeleteCustomerUseCase from '../../interactors/customer/DeleteCustomerUseCase';

class DeleteCustomerController {
    constructor(private DeleteCustomerUseCase: DeleteCustomerUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { name, email, document } = req.body;
        try {
            await this.DeleteCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer Deleted successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default DeleteCustomerController;