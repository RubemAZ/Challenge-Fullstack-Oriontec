"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(data) {
        // Validação dos dados pode ser feita aqui, se necessário
        await this.customerRepository.add(data); // Adiciona cliente no repositório
    }
}
exports.default = RegisterCustomerUseCase;
