"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCustomerController {
    constructor(DeleteCustomerUseCase) {
        this.DeleteCustomerUseCase = DeleteCustomerUseCase;
    }
    async handle(req, res) {
        const { id } = req.params; // Pegando o ID dos parâmetros da URL
        try {
            await this.DeleteCustomerUseCase.execute(id); // Passando apenas o ID
            res.status(200).send({ message: "Cliente deletado com sucesso" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ error: error.message }); // Tratando erro como instância de Error
            }
            else {
                res.status(400).send({ error: "Erro desconhecido" });
            }
        }
    }
}
exports.default = DeleteCustomerController;
