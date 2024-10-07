import firebird from 'node-firebird';
 
class FirebirdConnection {
    private static options: firebird.Options = {
        host: 'localhost',
        port: 3050,
        database: `${process.cwd()}/src/domain/database/CLIENTDATA.FDB`,
        user: 'SYSDBA', 
        password: '1234',
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
