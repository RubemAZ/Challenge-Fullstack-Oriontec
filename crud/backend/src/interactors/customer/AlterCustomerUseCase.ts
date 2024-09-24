import CustomerRepository from '../../external/db/customer/CustomerRepository';

class AlterCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(data: { name: string; email: string; document: string }): Promise<void> {
        // Validações e lógica de negócio
        if (!data.name || !data.email || !data.document) {
            throw new Error('Invalid data');
        }

        await this.customerRepository.add(data);  // Adiciona cliente no repositório
    }
}

export default RegisterCustomerUseCase;
