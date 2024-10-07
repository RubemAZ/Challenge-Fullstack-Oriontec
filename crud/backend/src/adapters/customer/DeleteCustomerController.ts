import DeleteCustomerUseCase from '../../interactors/customer/DeleteCustomerUseCase';

class DeleteCustomerController {
    constructor(private DeleteCustomerUseCase: DeleteCustomerUseCase) {}

    async handle(req: any, res: any): Promise<void> {
        const { id } = req.params;

        try {
            await this.DeleteCustomerUseCase.execute(id);
            res.status(200).send({ message: "Cliente deletado com sucesso" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else {
                res.status(400).send({ error: "Erro desconhecido" });
            }
        }
    }
}

export default DeleteCustomerController;