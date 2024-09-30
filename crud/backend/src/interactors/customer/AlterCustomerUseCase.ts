import CustomerRepository from '../../external/db/customer/CustomerRepository';

class AlterCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(id: string, data: any): Promise<void> {
        // Validação dos dados pode ser feita aqui, se necessário
        await this.customerRepository.update(id, data); // Atualiza cliente no repositório
    }
}

export default AlterCustomerUseCase;