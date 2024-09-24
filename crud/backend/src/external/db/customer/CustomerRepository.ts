import { Pool } from 'node-firebird'; // Biblioteca para conectar ao Firebird

class CustomerRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async add(customer: { name: string; email: string; document: string }): Promise<void> {
        // Query para adicionar o cliente ao Firebird
        const query = `INSERT INTO customers (name, email, document) VALUES (?, ?, ?)`;
        await this.pool.query(query, [customer.name, customer.email, customer.document]);
    }

    // Métodos para editar, deletar e listar clientes
}

export default CustomerRepository;
