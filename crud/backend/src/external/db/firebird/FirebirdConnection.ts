import firebird from 'node-firebird';

class FirebirdConnection {
    private static options: firebird.Options = {
        host: 'localhost', // ou o endereço do seu servidor Firebird
        database: 'path/to/your/database.fdb', // caminho do seu banco de dados
        user: 'sysdba', // usuário do banco de dados
        password: 'masterkey', // senha do banco de dados
        role: undefined, // ou deixe como undefined
    };

    public static getConnection(): Promise<firebird.Database> {
        return new Promise((resolve, reject) => {
            firebird.attach(FirebirdConnection.options, (err, db) => {
                if (err) {
                    return reject(err);
                }
                resolve(db);
            });
        });
    }
}

export default FirebirdConnection;
