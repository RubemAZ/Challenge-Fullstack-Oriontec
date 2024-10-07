import CustomerRepository from '../../external/db/customer/CustomerRepository';

class DeleteCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(id: string): Promise<void> {
        await this.customerRepository.delete(id);
    }
}

export default DeleteCustomerUseCase;
