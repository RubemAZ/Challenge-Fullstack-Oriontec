import CustomerRepository from '../../external/db/customer/CustomerRepository';

class DeleteCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(id: string): Promise<void> {
        // Certifique-se de que o ID existe e é válido antes de tentar deletar
        await this.customerRepository.delete(id); // Deleta cliente do repositório
    }
}

export default DeleteCustomerUseCase;
