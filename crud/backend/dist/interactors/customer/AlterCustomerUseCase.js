"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlterCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(id, data) {
        // Validação dos dados pode ser feita aqui, se necessário
        await this.customerRepository.update(id, data); // Atualiza cliente no repositório
    }
}
exports.default = AlterCustomerUseCase;
