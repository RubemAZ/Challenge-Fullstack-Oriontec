"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(data) {
        // Validações e lógica de negócio
        if (!data.name || !data.email || !data.document) {
            throw new Error('Invalid data');
        }
        await this.customerRepository.add(data); // Adiciona cliente no repositório
    }
}
exports.default = RegisterCustomerUseCase;
