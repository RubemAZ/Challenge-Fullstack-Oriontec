import CustomerRepository from '../../external/db/customer/CustomerRepository';

class RegisterCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(data: any): Promise<void> {
        await this.customerRepository.add(data);
    }
}

export default RegisterCustomerUseCase;