import AlterCustomerUseCase from '../../interactors/customer/AlterCustomerUseCase';

class AlterCustomerController {
    constructor(private AlterCustomerUseCase: AlterCustomerUseCase) {}

    async handle(req: any, res: any): Promise<void> {
        const { id } = req.params;
        const { name, email, document } = req.body;

        try {
            await this.AlterCustomerUseCase.execute(id, { name, email, document });
            res.status(200).send({ message: "Cliente atualizado com sucesso" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: "Erro desconhecido" });
            }
        }
    }
}

export default AlterCustomerController;