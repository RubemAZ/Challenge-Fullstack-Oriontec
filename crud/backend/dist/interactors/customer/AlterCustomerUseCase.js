"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlterCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(id, data) {
        await this.customerRepository.update(id, data);
    }
}
exports.default = AlterCustomerUseCase;
