"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlterCustomerController {
    constructor(AlterCustomerUseCase) {
        this.AlterCustomerUseCase = AlterCustomerUseCase;
    }
    async handle(req, res) {
        const { id } = req.params; // Pegando o ID dos parâmetros da URL
        const { name, email, document } = req.body; // Pegando os dados do corpo da requisição
        try {
            await this.AlterCustomerUseCase.execute(id, { name, email, document }); // Passando o ID e os dados
            res.status(200).send({ message: "Cliente atualizado com sucesso" });
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
exports.default = AlterCustomerController;
