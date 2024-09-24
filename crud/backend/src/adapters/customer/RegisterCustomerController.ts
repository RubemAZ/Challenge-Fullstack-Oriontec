import { Request, Response } from 'express';
import RegisterCustomerUseCase from '../../interactors/customer/RegisterCustomerUseCase';

class RegisterCustomerController {
    constructor(private registerCustomerUseCase: RegisterCustomerUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { name, email, document } = req.body;
        try {
            await this.registerCustomerUseCase.execute({ name, email, document });
            res.status(201).send({ message: 'Customer registered successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export default RegisterCustomerController;