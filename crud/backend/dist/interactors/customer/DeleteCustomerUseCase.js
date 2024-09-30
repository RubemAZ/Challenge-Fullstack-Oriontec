"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(id) {
        // Certifique-se de que o ID existe e é válido antes de tentar deletar
        await this.customerRepository.delete(id); // Deleta cliente do repositório
    }
}
exports.default = DeleteCustomerUseCase;
