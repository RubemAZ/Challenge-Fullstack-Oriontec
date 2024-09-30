import { Request, Response } from 'express';
import AlterCustomerUseCase from '../../interactors/customer/AlterCustomerUseCase';

class AlterCustomerController {
    constructor(private AlterCustomerUseCase: AlterCustomerUseCase) {}

    async handle(req: any, res: any): Promise<void> {
        const { id } = req.params; // Pegando o ID dos parâmetros da URL
        const { name, email, document } = req.body; // Pegando os dados do corpo da requisição

        try {
            await this.AlterCustomerUseCase.execute(id, { name, email, document }); // Passando o ID e os dados
            res.status(200).send({ message: "Cliente atualizado com sucesso" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message }); // Tratando erro como instância de Error
            } else {
                res.status(400).send({ error: "Erro desconhecido" });
            }
        }
    }
}

export default AlterCustomerController;