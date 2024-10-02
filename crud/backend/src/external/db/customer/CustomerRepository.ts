import FirebirdConnection from '../firebird/FirebirdConnection';
import firebird from 'node-firebird';

const options = {
    host: 'localhost',
    port: 3050,
    database: 'D:\\Projects\\database\\CLIENTDATA.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
};

class CustomerRepository {
    // Adicionar novo cliente
    async add(data: any): Promise<void> {
        const db = await FirebirdConnection.getConnection();
        const query = 'INSERT INTO customers (name, email, document) VALUES (?, ?, ?)';
        
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    
    

    // Listar todos os clientes
    async getAll(): Promise<any[]> {
        const db = await FirebirdConnection.getConnection();
        const query = 'SELECT * FROM customers';

        return new Promise((resolve, reject) => {
            db.query(query, [], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Atualizar cliente existente
    async update(id: string, data: any): Promise<void> {
        const db = await FirebirdConnection.getConnection();
        const query = 'UPDATE customers SET name = ?, email = ?, document = ? WHERE id = ?';
        
        return new Promise((resolve, reject) => {
            db.query(query, [data.name, data.email, data.document, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Deletar cliente pelo ID
    async delete(id: string): Promise<void> {
        const db = await FirebirdConnection.getConnection();
        const query = 'DELETE FROM customers WHERE id = ?';
        
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Buscar cliente por ID
    async getById(id: string): Promise<any> {
        const db = await FirebirdConnection.getConnection();
        const query = 'SELECT * FROM customers WHERE id = ?';

        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]); // Retorna o cliente encontrado
                }
            });
        });
    }

    // Buscar clientes por nome
    async searchByName(name: string): Promise<any[]> {
        const db = await FirebirdConnection.getConnection();
        const query = 'SELECT * FROM customers WHERE name LIKE ?';

        return new Promise((resolve, reject) => {
            db.query(query, [`%${name}%`], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result); // Retorna a lista de clientes que correspondem ao nome
                }
            });
        });
    }

    // Conexão com o banco de dados Firebird
    static async getConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebird.attach(options, (err: Error | null, db: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
    }
}

export default CustomerRepository;
