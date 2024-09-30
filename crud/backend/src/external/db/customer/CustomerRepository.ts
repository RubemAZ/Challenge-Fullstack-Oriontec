import { pool } from 'node-firebird'; // Importa o pool do node-firebird

class CustomerRepository {
    private connectionPool: any;

    constructor() {
        // Configuração do pool de conexões
        this.connectionPool = pool(5, { /* opções de configuração */ });
    }

    // Exemplo de método para listar clientes
    public async getAllCustomers(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connectionPool.get((err: any, client: any) => {
                if (err) return reject(err);

                client.query('SELECT * FROM customers', (err: any, result: any) => {
                    client.release(); // Libera a conexão
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    }

    // Outros métodos para manipular clientes...
}

export default CustomerRepository;