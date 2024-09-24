import { Request, Response } from 'express';
import AlterCustomerUseCase from '../../interactors/customer/AlterCustomerUseCase';

class AlterCustomerController {
    constructor(private AlterCustomerUseCase: AlterCustomerUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { name, email, document } = req.body;
        try {
            await this.AlterCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer Alterd successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default AlterCustomerController;