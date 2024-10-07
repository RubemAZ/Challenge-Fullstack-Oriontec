import CustomerRepository from '../../external/db/customer/CustomerRepository';

class AlterCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(id: string, data: any): Promise<void> {
        await this.customerRepository.update(id, data);
    }
}

export default AlterCustomerUseCase;