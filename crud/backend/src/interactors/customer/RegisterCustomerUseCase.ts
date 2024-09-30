import CustomerRepository from '../../external/db/customer/CustomerRepository';

class RegisterCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(data: any): Promise<void> {
        // Validação dos dados pode ser feita aqui, se necessário
        await this.customerRepository.add(data); // Adiciona cliente no repositório
    }
}

export default RegisterCustomerUseCase;