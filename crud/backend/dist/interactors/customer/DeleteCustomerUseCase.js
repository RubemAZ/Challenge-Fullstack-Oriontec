"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(id) {
        await this.customerRepository.delete(id);
    }
}
exports.default = DeleteCustomerUseCase;
