"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(data) {
        await this.customerRepository.add(data);
    }
}
exports.default = RegisterCustomerUseCase;
