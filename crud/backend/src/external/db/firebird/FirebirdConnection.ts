import firebird from 'node-firebird';
 
class FirebirdConnection {
    private static options: firebird.Options = {
        host: process.env.DB_HOST,
        port: 3050,
        database: process.env.DATABASE_URL || `${process.cwd()}/src/domain/database/CLIENTDATA.FDB`,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
    };
    
    public static getConnection(): Promise<firebird.Database> {
        return new Promise((resolve, reject) => {
            firebird.attach(FirebirdConnection.options, (err, db) => {
                if (err) {
                    console.log('CONNECTION ERROR', err)
                    return reject(err);
                }
                resolve(db);
            });
        });
    }
}
export default FirebirdConnection;
