import FirebirdConnection from '../firebird/FirebirdConnection'; // Ajuste o caminho se necessário

class CustomerRepository {
    // Adicionar novo cliente
    async add(data: any): Promise<void> {
        const db = await FirebirdConnection.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'INSERT INTO customers (name, email, document) VALUES (?, ?, ?)';
        
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                } else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }

    // Atualizar cliente existente
    async update(id: string, data: any): Promise<void> {
        const db = await FirebirdConnection.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'UPDATE customers SET name = ?, email = ?, document = ? WHERE id = ?';
        
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document, id], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                } else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }

    // Deletar cliente pelo ID
    async delete(id: string): Promise<void> {
        const db = await FirebirdConnection.getConnection(); // Obtem a conexão com o banco de dados
        const query = 'DELETE FROM customers WHERE id = ?';
        
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err) => {
                if (err) {
                    reject(err); // Se ocorrer um erro, rejeita a promise
                } else {
                    resolve(); // Se tudo ocorrer bem, resolve a promise
                }
            });
        });
    }
}

export default CustomerRepository;
