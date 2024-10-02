import firebird from 'node-firebird';

class FirebirdConnection {
    private static options: firebird.Options = {
        host: 'localhost',
        database: 'D:\\Projects\\database\\DATABASE.FDB', 
        user: 'sysdba',
        password: 'masterkey', 
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
